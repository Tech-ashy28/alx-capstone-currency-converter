
const API_KEY = "d30f7118663d88cf8f16b061";
const API_URL = "https://v6.exchangerate-api.com/v6";

const form = document.querySelector("[data-js='converter-form']");
const amountInput = document.querySelector("[data-js='amount']");
const fromCurrency = document.querySelector("[data-js='from-currency']");
const toCurrency = document.querySelector("[data-js='to-currency']");
const swapBtn = document.querySelector("[data-js='swap']");
const resultAmount = document.querySelector("[data-js='result-amount']");
const rateLine = document.querySelector("[data-js='rate-line']");
const lastUpdated = document.querySelector("[data-js='last-updated']");
const errorBox = document.querySelector("[data-js='error']");
const loadingBox = document.querySelector("[data-js='loading']");

let exchangeRates = {}; 

// === Fetch exchange rates ===
async function fetchRates(baseCurrency) {
  try {
    showLoading(true);
    errorBox.classList.add("hidden");

    const res = await fetch(`${API_URL}/${API_KEY}/latest/${baseCurrency}`);
    if (!res.ok) throw new Error("Failed to fetch exchange rates");

    const data = await res.json();
    exchangeRates = data.conversion_rates;

    // Update Exchange Rate Info
    lastUpdated.textContent = `Last updated: ${new Date(data.time_last_update_utc).toLocaleString()}`;
    showLoading(false);
  } catch (err) {
    showLoading(false);
    errorBox.textContent = "Failed to fetch exchange rates. Please try again later.";
    errorBox.classList.remove("hidden");
    console.error(err);
  }
}

// === Perform conversion ===
function convert() {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!exchangeRates[to]) {
    resultAmount.textContent = "…";
    return;
  }

  const rate = exchangeRates[to];
  const converted = (amount * rate).toFixed(2);

  // Update UI
  resultAmount.textContent = `${amount} ${from} = ${converted} ${to}`;
  rateLine.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
}

// === Swap currencies ===
swapBtn.addEventListener("click", () => {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
  fetchRates(fromCurrency.value).then(convert);
});

// === Handle form submit ===
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  await fetchRates(fromCurrency.value);
  convert();
});

function showLoading(show) {
  loadingBox.classList.toggle("hidden", !show);
}


fetchRates(fromCurrency.value).then(convert);
