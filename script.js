const currencies = ["USD", "EUR", "NGN", "GBP", "JPY", "CAD", "AUD"];

window.onload = () => {
  const from = document.getElementById("fromCurrency");
  const to = document.getElementById("toCurrency");
  currencies.forEach(curr => {
    from.innerHTML += `<option value="${curr}">${curr}</option>`;
    to.innerHTML += `<option value="${curr}">${curr}</option>`;
  });
  from.value = "USD";
  to.value = "NGN";
};

async function convert() {
  const from = document.getElementById("fromCurrency").value;
  const to = document.getElementById("toCurrency").value;
  const amount = document.getElementById("amount").value;

  if (!amount || amount <= 0) {
    document.getElementById("result").innerText = "Please enter a valid amount.";
    return;
  }

  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/0c31418b1785d3fd8883978b/latest/${from}`);
    const data = await response.json();
    const rate = data.conversion_rates[to];
    const result = (amount * rate).toFixed(2);
    document.getElementById("result").innerText = `${amount} ${from} = ${result} ${to}`;
  } catch (error) {
    document.getElementById("result").innerText = "Error fetching exchange rate.";
    console.error(error);
  }
}
