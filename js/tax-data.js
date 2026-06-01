/* ============================================================
   Diamond Tax — Canadian/Alberta Tax Data & Calculation Engine
   Sources: Alberta.ca, Canada.ca (CRA), TaxTips.ca (2025/2026 confirmed)
   All figures are for ESTIMATION. Verify with CRA / a professional.
   ============================================================ */
(function (global) {
  "use strict";

  /* ---- Federal brackets by year ---- [threshold up to, rate] ---- */
  const FED = {
    2021: { brackets: [[49020,.15],[98040,.205],[151978,.26],[216511,.29],[Infinity,.33]], bpa: 13808, bpaMin: 12421, lowRate: .15 },
    2022: { brackets: [[50197,.15],[100392,.205],[155625,.26],[221708,.29],[Infinity,.33]], bpa: 14398, bpaMin: 12719, lowRate: .15 },
    2023: { brackets: [[53359,.15],[106717,.205],[165430,.26],[235675,.29],[Infinity,.33]], bpa: 15000, bpaMin: 13521, lowRate: .15 },
    2024: { brackets: [[55867,.15],[111733,.205],[173205,.26],[246752,.29],[Infinity,.33]], bpa: 15705, bpaMin: 14156, lowRate: .15 },
    2025: { brackets: [[57375,.145],[114750,.205],[177882,.26],[253414,.29],[Infinity,.33]], bpa: 16129, bpaMin: 14538, lowRate: .145 },
    2026: { brackets: [[58523,.14],[117045,.205],[181440,.26],[258482,.29],[Infinity,.33]], bpa: 16452, bpaMin: 14829, lowRate: .14 }
  };

  /* ---- Alberta brackets by year ---- */
  const AB = {
    2021: { brackets: [[131220,.10],[157464,.12],[209952,.13],[314928,.14],[Infinity,.15]], bpa: 19369, lowRate: .10 },
    2022: { brackets: [[131220,.10],[157464,.12],[209952,.13],[314928,.14],[Infinity,.15]], bpa: 19814, lowRate: .10 },
    2023: { brackets: [[142292,.10],[170751,.12],[227668,.13],[341502,.14],[Infinity,.15]], bpa: 21003, lowRate: .10 },
    2024: { brackets: [[148269,.10],[177922,.12],[237230,.13],[355845,.14],[Infinity,.15]], bpa: 21885, lowRate: .10 },
    2025: { brackets: [[60000,.08],[151234,.10],[181481,.12],[241974,.13],[362961,.14],[Infinity,.15]], bpa: 22323, lowRate: .08 },
    2026: { brackets: [[61200,.08],[154259,.10],[185111,.12],[246813,.13],[370220,.14],[Infinity,.15]], bpa: 22769, lowRate: .08 }
  };

  /* ---- CPP / EI by year ---- */
  const PAYROLL = {
    2025: {
      cppRate: .0595, cppExempt: 3500, ympe: 71300, cppMax: 4034.10,
      cpp2Rate: .04, yampe: 81200, cpp2Max: 396.00,
      eiRate: .0164, mie: 65700, eiMax: 1077.48
    },
    2026: {
      cppRate: .0595, cppExempt: 3500, ympe: 74600, cppMax: 4230.45,
      cpp2Rate: .04, yampe: 85000, cpp2Max: 416.00,
      eiRate: .0164, mie: 68500, eiMax: 1123.40
    }
  };

  /* ---- Registered plan limits ---- */
  const LIMITS = {
    2025: { tfsa: 7000, rrspDollar: 32490, rrspPct: .18 },
    2026: { tfsa: 7000, rrspDollar: 33810, rrspPct: .18 }
  };

  /* ---- core: progressive tax on taxable income ---- */
  function bracketTax(income, brackets) {
    let tax = 0, last = 0;
    for (const [cap, rate] of brackets) {
      if (income > last) {
        const slice = Math.min(income, cap) - last;
        tax += slice * rate;
        last = cap;
      } else break;
    }
    return tax;
  }

  function marginalRate(income, brackets) {
    for (const [cap, rate] of brackets) { if (income <= cap) return rate; }
    return brackets[brackets.length - 1][1];
  }

  /* ---- CPP (employee) ---- */
  function cpp(income, year) {
    const p = PAYROLL[year] || PAYROLL[2026];
    const base = Math.max(0, Math.min(income, p.ympe) - p.cppExempt) * p.cppRate;
    const base2 = Math.max(0, Math.min(income, p.yampe) - p.ympe) * p.cpp2Rate;
    return Math.min(base, p.cppMax) + Math.min(base2, p.cpp2Max);
  }
  /* ---- EI (employee) ---- */
  function ei(income, year) {
    const p = PAYROLL[year] || PAYROLL[2026];
    return Math.min(income * p.eiRate, p.eiMax);
  }

  /* ---- Full personal tax estimate (employment income) ---- */
  function estimate(opts) {
    const year = opts.year || 2026;
    const income = Math.max(0, +opts.income || 0);
    const rrsp = Math.max(0, +opts.rrsp || 0);
    const otherDeductions = Math.max(0, +opts.deductions || 0);
    const selfEmployed = !!opts.selfEmployed;

    const taxable = Math.max(0, income - rrsp - otherDeductions);
    const fed = FED[year], ab = AB[year];

    // Tax before credits
    let fedTax = bracketTax(taxable, fed.brackets);
    let abTax = bracketTax(taxable, ab.brackets);

    // Basic personal amount credits (non-refundable)
    const fedBpaCredit = Math.min(fed.bpa, taxable) * fed.lowRate;
    const abBpaCredit = Math.min(ab.bpa, taxable) * ab.lowRate;
    fedTax = Math.max(0, fedTax - fedBpaCredit);
    abTax = Math.max(0, abTax - abBpaCredit);

    // Payroll
    let cppAmt = cpp(income, year);
    let eiAmt = selfEmployed ? 0 : ei(income, year);
    if (selfEmployed) cppAmt *= 2; // both portions

    const incomeTax = fedTax + abTax;
    const totalDeductions = incomeTax + cppAmt + eiAmt;
    const net = income - totalDeductions;

    return {
      year, income, taxable, rrsp,
      fedTax, abTax, incomeTax,
      cpp: cppAmt, ei: eiAmt,
      totalTax: incomeTax,
      totalDeductions, net,
      avgRate: income > 0 ? totalDeductions / income : 0,
      avgTaxRate: income > 0 ? incomeTax / income : 0,
      marginalFed: marginalRate(taxable, fed.brackets),
      marginalAb: marginalRate(taxable, ab.brackets),
      marginalCombined: marginalRate(taxable, fed.brackets) + marginalRate(taxable, ab.brackets)
    };
  }

  /* ---- format helpers ---- */
  function money(n, dec) {
    if (n == null || isNaN(n)) return "$0";
    return "$" + Number(n).toLocaleString("en-CA", { minimumFractionDigits: dec || 0, maximumFractionDigits: dec || 0 });
  }
  function pct(n, dec) { return (n * 100).toFixed(dec == null ? 1 : dec) + "%"; }

  global.TaxData = { FED, AB, PAYROLL, LIMITS, bracketTax, marginalRate, cpp, ei, estimate, money, pct };
})(window);
