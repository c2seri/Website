import re, json

with open("app.js", "r", encoding="utf-8") as f:
    code = f.read()

# 1. Update ENRICHED_TESTS for JAIIB-IEIFS-1
jaiib_test_replacement = """  {
    id: "JAIIB-IEIFS-1",
    exam: "JAIIB",
    title: "JAIIB Paper 1 (IE & IFS) Full-Length Mock Test 1 (100 MCQs)",
    minutes: 120,
    marks: 100,
    negativeMarking: 0,
    calculatorAllowed: true,
    qs: (typeof window !== "undefined" && window.JAIIB_PAPER1_QUESTIONS && window.JAIIB_PAPER1_QUESTIONS.length === 100)
      ? window.JAIIB_PAPER1_QUESTIONS
      : [
          ["Which body formulates and implements Monetary Policy in India?", ["Ministry of Finance", "Reserve Bank of India (RBI)", "SEBI", "NITI Aayog"], 1, "Under Section 45ZB of the amended RBI Act 1934, the Monetary Policy Committee (MPC) of the Reserve Bank of India is mandated to fix the benchmark policy rate required to maintain price stability with growth.", "Indian Economy & Financial System"],
          ["In national income accounting, what is Net Domestic Product (NDP)?", ["GDP minus Depreciation", "GDP plus Net Foreign Income", "GNP minus Indirect Taxes", "NNP plus Subsidies"], 0, "Net Domestic Product (NDP) = Gross Domestic Product (GDP) minus Depreciation (Consumption of Fixed Capital).", "Indian Economy & Financial System"]
        ],"""

# Find JAIIB-IEIFS-1 definition in ENRICHED_TESTS
pattern = r'\{\s*id:\s*"JAIIB-IEIFS-1",\s*exam:\s*"JAIIB",\s*title:\s*"JAIIB: Indian Economy & Financial System \(Paper 1 Full Mock\)",\s*minutes:\s*15,\s*calculatorAllowed:\s*true,\s*qs:\s*\[.*?\]\s*\},'
if re.search(pattern, code, re.DOTALL):
    code = re.sub(pattern, jaiib_test_replacement, code, count=1, flags=re.DOTALL)
    print("Updated JAIIB-IEIFS-1 in ENRICHED_TESTS")
else:
    print("Could not find JAIIB-IEIFS-1 exact pattern, searching looser...")
    looser = r'\{\s*id:\s*"JAIIB-IEIFS-1".*?qs:\s*\[.*?\]\s*\},'
    code = re.sub(looser, jaiib_test_replacement, code, count=1, flags=re.DOTALL)
    print("Updated JAIIB-IEIFS-1 looser pattern")

with open("app.js", "w", encoding="utf-8") as f:
    f.write(code)

print("Saved app.js step 1")

