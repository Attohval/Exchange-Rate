// const currencies = ["USD", "EUR", "NGN", "GBP", "JPY", "CAD", "AUD"];

const currencies = ["USD","AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND","BOB","BRL","BSD","BTN","BWP","BYN","BZD","CAD","CDF","CHF","CLP","CNY","COP","CRC","CUP","CVE","CZK","DJF","DKK","DOP","DZD","EGP","ERN","ETB","EUR","FJD","FKP","FOK","GBP","GEL","GGP","GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS","IMP","INR","IQD","IRR","ISK","JEP","JMD","JOD","JPY","KES","KGS","KHR","KID","KMF","KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRU","MUR","MVR","MWK","MXN","MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLE","SLL","SOS","SRD","SSP","STN","SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD","TVD","TWD","TZS","UAH","UGX","UYU","UZS","VES","VND","VUV","WST","XAF","XCD","XCG","XDR","XOF","XPF","YER","ZAR","ZMW","ZWL"];

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
    document.getElementById("result").innerText = "Enter a valid amount.";
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
