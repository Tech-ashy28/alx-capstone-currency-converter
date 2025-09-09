import React, { useState, useEffect, useCallback } from "react";
import "./Converter.css";

// === API CONFIG ===
const API_KEY = "d30f7118663d88cf8f16b061";
const API_URL = "https://v6.exchangerate-api.com/v6";

function Converter() {
  // === STATE ===
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("NGN");
  const [exchangeRates, setExchangeRates] = useState({});
  const [result, setResult] = useState("");
  const [rateLine, setRateLine] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // === FETCH EXCHANGE RATES ===
  const fetchRates = useCallback(async (baseCurrency) => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_URL}/${API_KEY}/latest/${baseCurrency}`);
      if (!res.ok) throw new Error("Failed to fetch exchange rates");

      const data = await res.json();
      setExchangeRates(data.conversion_rates);

      setLastUpdated(
        `Last updated: ${new Date(data.time_last_update_utc).toLocaleString()}`
      );

      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Failed to fetch exchange rates. Please try again later.");
      console.error(err);
    }
  }, []);

  // === CONVERT FUNCTION ===
  const convert = useCallback(() => {
    if (!exchangeRates[toCurrency]) return;

    const rate = exchangeRates[toCurrency];
    const converted = (amount * rate).toFixed(2);

    setResult(`${amount} ${fromCurrency} = ${converted} ${toCurrency}`);
    setRateLine(`1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`);
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  // === RE-FETCH RATES WHEN FROM-CURRENCY CHANGES ===
  useEffect(() => {
    fetchRates(fromCurrency);
  }, [fromCurrency, fetchRates]);

  // === RE-CALCULATE WHENEVER DEPENDENCIES CHANGE ===
  useEffect(() => {
    if (Object.keys(exchangeRates).length > 0) {
      convert();
    }
  }, [convert]);

  // === SWAP CURRENCIES ===
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // === UI ===
  return (
    <div className="converter">
      <h1>Currency Converter</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchRates(fromCurrency);
        }}
      >
        {/* AMOUNT INPUT */}
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* FROM / TO CURRENCIES */}
        <div className="currency-select">
          <label>From</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            <option value="USD">USD — United States Dollar</option>
            <option value="NGN">NGN — Nigerian Naira</option>
            <option value="GBP">GBP — British Pound</option>
            <option value="CAD">CAD — Canadian Dollar</option>
            <option value="EUR">EUR — Euro</option>
            {/* Add rest here */}
          </select>

          <button type="button" onClick={handleSwap}>
            ⇄
          </button>

          <label>To</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            <option value="USD">USD — United States Dollar</option>
            <option value="NGN">NGN — Nigerian Naira</option>
            <option value="GBP">GBP — British Pound</option>
            <option value="CAD">CAD — Canadian Dollar</option>
            <option value="EUR">EUR — Euro</option>
            {/* Add rest here */}
          </select>
        </div>

        <button type="submit">Convert</button>
      </form>

      {/* RESULTS */}
      {loading && <p>Loading rates...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <div className="result-box">
          <p>{result}</p>
          <p>{rateLine}</p>
          <small>{lastUpdated}</small>
        </div>
      )}
    </div>
  );
}

export default Converter;
