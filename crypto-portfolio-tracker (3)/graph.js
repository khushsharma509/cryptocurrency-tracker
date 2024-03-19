function fetchData() {
  fetch(
    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7"
  )
    .then((response) => response.json())
    .then((data) => {
      //timestamps and prices
      var timestamps = data.prices.map((entry) => new Date(entry[0]));
      var prices = data.prices.map((entry) => entry[1]);

      var colors = [];

      //  colors based on price changes
      for (var i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
        } else {
          colors.push("red"); // Price is falling
        }
      }

      // Plot the graph
      Plotly.newPlot(
        "cryptoChart",
        [
          {
            x: timestamps,
            y: prices,
            type: "scatter",
            mode: "lines",
            line: { color: colors },
          },
        ],
        {
          xaxis: {
            title: "Date",
          },
          yaxis: {
            title: "Price (USD)",
          },
          title: "Bitcoin Price (USD) over 7 days",
        }
      );
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Fetch data initially
fetchData();

// Fetch data every 60 seconds (adjust as needed)
setInterval(fetchData, 60000);
