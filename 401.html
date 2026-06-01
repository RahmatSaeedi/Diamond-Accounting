/* ============================================================
   Diamond Tax — Interactive Calculators
   Requires tax-data.js (window.TaxData)
   ============================================================ */
(function () {
  "use strict";
  var T = window.TaxData, money = T.money, pct = T.pct;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  function parseNum(v) { return Math.max(0, parseInt(String(v).replace(/[^0-9]/g, ""), 10) || 0); }
  function fmtInput(el) { el.value = parseNum(el.value).toLocaleString("en-CA"); }

  /* ---------- TAB SWITCHING ---------- */
  function initTabs() {
    var tabs = document.querySelectorAll(".calc-tab");
    var panels = document.querySelectorAll(".calc-panel");
    tabs.forEach(function (t) {
      t.addEventListener("click", function () {
        tabs.forEach(function (x) { x.classList.remove("active"); x.setAttribute("aria-selected", "false"); });
        panels.forEach(function (p) { p.hidden = true; });
        t.classList.add("active"); t.setAttribute("aria-selected", "true");
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = false;
        if (location.hash !== "#" + t.dataset.tab) history.replaceState(null, "", "#" + t.dataset.tab);
      });
    });
    // open from hash
    if (location.hash) {
      var match = [].find.call(tabs, function (t) { return "#" + t.dataset.tab === location.hash; });
      if (match) match.click();
    }
  }

  /* ---------- 1. INCOME TAX & TAKE-HOME ---------- */
  function initIncome() {
    var root = $("#calc-income"); if (!root) return;
    var income = $("#it-income", root), range = $("#it-range", root),
        year = $("#it-year", root), rrsp = $("#it-rrsp", root),
        ded = $("#it-ded", root), self = $("#it-self", root);

    function run() {
      var r = T.estimate({
        income: parseNum(income.value), year: +year.value,
        rrsp: parseNum(rrsp.value), deductions: parseNum(ded.value),
        selfEmployed: self.checked
      });
      $("#it-net", root).textContent = money(r.net);
      $("#it-net-mo", root).textContent = money(r.net / 12) + " / month";
      $("#it-fed", root).textContent = money(r.fedTax);
      $("#it-ab", root).textContent = money(r.abTax);
      $("#it-cpp", root).textContent = money(r.cpp);
      $("#it-ei", root).textContent = money(r.ei);
      $("#it-totaltax", root).textContent = money(r.totalDeductions);
      $("#it-avg", root).textContent = pct(r.avgRate);
      $("#it-marg", root).textContent = pct(r.marginalCombined);
      $("#it-taxable", root).textContent = money(r.taxable);
      self.checked ? self.closest(".calc-field").classList.add("on") : self.closest(".calc-field").classList.remove("on");
      $("#it-ei-row", root).style.opacity = self.checked ? ".4" : "1";
      // stacked bar
      var segs = [["Net pay", r.net, "var(--teal-600)"], ["Federal tax", r.fedTax, "var(--gold-500)"], ["Alberta tax", r.abTax, "var(--gold-400)"], ["CPP", r.cpp, "var(--teal-800)"], ["EI", r.ei, "var(--teal-400, #7fb5af)"]];
      var total = r.income || 1;
      $("#it-bar", root).innerHTML = segs.filter(function (s) { return s[1] > 0; }).map(function (s) {
        return '<span title="' + s[0] + ' ' + money(s[1]) + '" style="flex:' + (s[1] / total * 100) + ';background:' + s[2] + '"></span>';
      }).join("");
    }
    income.addEventListener("input", function () { var v = parseNum(income.value); range.value = Math.min(+range.max, Math.max(+range.min, v)); run(); });
    income.addEventListener("blur", function () { fmtInput(income); });
    range.addEventListener("input", function () { income.value = parseNum(range.value).toLocaleString("en-CA"); run(); });
    [year, rrsp, ded, self].forEach(function (el) {
      el.addEventListener("input", run); el.addEventListener("change", run);
    });
    [rrsp, ded].forEach(function (el) { el.addEventListener("blur", function () { fmtInput(el); }); });
    run();
  }

  /* ---------- 2. RRSP SAVINGS ---------- */
  function initRrsp() {
    var root = $("#calc-rrsp"); if (!root) return;
    var income = $("#rr-income", root), contrib = $("#rr-contrib", root),
        crange = $("#rr-range", root), year = $("#rr-year", root);
    function run() {
      var inc = parseNum(income.value), c = parseNum(contrib.value), y = +year.value;
      var before = T.estimate({ income: inc, year: y });
      var after = T.estimate({ income: inc, rrsp: c, year: y });
      var saved = before.incomeTax - after.incomeTax;
      var room = Math.round(Math.min(inc * 0.18, T.LIMITS[y].rrspDollar));
      $("#rr-saved", root).textContent = money(saved);
      $("#rr-marg", root).textContent = pct(before.marginalCombined);
      $("#rr-net-cost", root).textContent = money(c - saved);
      $("#rr-room", root).textContent = money(room);
      $("#rr-eff", root).textContent = c > 0 ? pct(saved / c) : "0%";
      var over = c > room;
      $("#rr-warn", root).style.display = over ? "flex" : "none";
    }
    [income, contrib, year].forEach(function (el) { el.addEventListener("input", run); el.addEventListener("change", run); });
    contrib.addEventListener("input", function () { crange.value = Math.min(+crange.max, parseNum(contrib.value)); run(); });
    crange.addEventListener("input", function () { contrib.value = parseNum(crange.value).toLocaleString("en-CA"); run(); });
    [income, contrib].forEach(function (el) { el.addEventListener("blur", function () { fmtInput(el); }); });
    run();
  }

  /* ---------- 3. SELF-EMPLOYED ---------- */
  function initSelf() {
    var root = $("#calc-self"); if (!root) return;
    var rev = $("#se-rev", root), exp = $("#se-exp", root), year = $("#se-year", root);
    function run() {
      var revenue = parseNum(rev.value), expenses = parseNum(exp.value), y = +year.value;
      var net = Math.max(0, revenue - expenses);
      var r = T.estimate({ income: net, year: y, selfEmployed: true });
      $("#se-net-income", root).textContent = money(net);
      $("#se-incometax", root).textContent = money(r.incomeTax);
      $("#se-cpp", root).textContent = money(r.cpp);
      $("#se-total", root).textContent = money(r.incomeTax + r.cpp);
      $("#se-aftertax", root).textContent = money(net - r.incomeTax - r.cpp);
      $("#se-setaside", root).textContent = pct((r.incomeTax + r.cpp) / (net || 1));
      var gstReq = revenue > 30000;
      $("#se-gst", root).innerHTML = gstReq
        ? '<strong style="color:var(--warn)">Yes — you must register.</strong> Revenue over $30,000 means GST/HST registration is required. We can set this up for you.'
        : 'Not required yet. Registration becomes mandatory once revenue passes <strong>$30,000</strong> in four consecutive quarters.';
    }
    [rev, exp, year].forEach(function (el) { el.addEventListener("input", run); el.addEventListener("change", run); });
    [rev, exp].forEach(function (el) { el.addEventListener("blur", function () { fmtInput(el); }); });
    run();
  }

  /* ---------- 4. GST CALCULATOR ---------- */
  function initGst() {
    var root = $("#calc-gst"); if (!root) return;
    var amt = $("#gst-amt", root), mode = root.querySelectorAll("input[name=gst-mode]");
    function run() {
      var a = parseFloat(String(amt.value).replace(/[^0-9.]/g, "")) || 0;
      var adding = root.querySelector("input[name=gst-mode]:checked").value === "add";
      var base, gst, total;
      if (adding) { base = a; gst = a * 0.05; total = a * 1.05; }
      else { total = a; base = a / 1.05; gst = total - base; }
      $("#gst-base", root).textContent = money(base, 2);
      $("#gst-gst", root).textContent = money(gst, 2);
      $("#gst-total", root).textContent = money(total, 2);
    }
    amt.addEventListener("input", run);
    mode.forEach(function (m) { m.addEventListener("change", run); });
    run();
  }

  /* ---------- 5. MARGINAL RATE LOOKUP ---------- */
  function initMarginal() {
    var root = $("#calc-marginal"); if (!root) return;
    var income = $("#mr-income", root), year = $("#mr-year", root);
    function run() {
      var inc = parseNum(income.value), y = +year.value;
      var fed = T.FED[y], ab = T.AB[y];
      // combined marginal at this income
      var r = T.estimate({ income: inc, year: y });
      $("#mr-marg", root).textContent = pct(r.marginalCombined);
      $("#mr-avg", root).textContent = pct(r.avgTaxRate);
      $("#mr-tax", root).textContent = money(r.incomeTax);
      // build combined bracket table — merge thresholds
      var pts = new Set([0]);
      fed.brackets.forEach(function (b) { if (b[0] !== Infinity) pts.add(b[0]); });
      ab.brackets.forEach(function (b) { if (b[0] !== Infinity) pts.add(b[0]); });
      var arr = Array.from(pts).sort(function (a, b) { return a - b; });
      var rows = "";
      for (var i = 0; i < arr.length; i++) {
        var lo = arr[i], hi = arr[i + 1] || Infinity;
        var mid = lo + 1;
        var fr = T.marginalRate(mid, fed.brackets), ar = T.marginalRate(mid, ab.brackets);
        var here = inc > lo && inc <= hi;
        rows += '<tr' + (here ? ' class="here"' : '') + '><td>' + money(lo) + (hi === Infinity ? ' +' : ' – ' + money(hi)) + '</td>' +
          '<td class="num">' + pct(fr, 1) + '</td><td class="num">' + pct(ar, 1) + '</td>' +
          '<td class="num"><span class="rate-pill">' + pct(fr + ar, 1) + '</span></td>' +
          '<td>' + (here ? '<span class="badge new">You are here</span>' : '') + '</td></tr>';
      }
      $("#mr-tbody", root).innerHTML = rows;
    }
    [income, year].forEach(function (el) { el.addEventListener("input", run); el.addEventListener("change", run); });
    income.addEventListener("blur", function () { fmtInput(income); });
    run();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTabs(); initIncome(); initRrsp(); initSelf(); initGst(); initMarginal();
  });
})();
