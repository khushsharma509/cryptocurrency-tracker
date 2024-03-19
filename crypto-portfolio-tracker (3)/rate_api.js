const coins = [
  "ETH",
  "BTC",
  "BNB",
  "USDT",
  "XRP",
  "ADA",
  "SOL",
  "DOGE",
  "USDC",
  "DOT",
  "UNI",
  "SHIB",
]; // Array of 12 coin codes

const getRates = async () => {
  try {
    const rates = [];
    for (const code of coins) {
      const response = await fetch(
        new Request("https://api.livecoinwatch.com/coins/single"),
        {
          method: "POST",
          headers: new Headers({
            "content-type": "application/json",
            "x-api-key": "cbf0effd-78c4-48d5-a5f7-6972d8ff5768", // Replace with your actual API key
          }),
          body: JSON.stringify({
            currency: "USD",
            code,
            meta: true,
          }),
        }
      );
      rates.push(await response.json());
    }
    return rates;
  } catch (error) {
    console.log(error);
  }
};

let rates = [];

const logic = () => {
  const overviewImg = document.getElementsByClassName("overview_img");
  const overviewImgArray = Array.from(overviewImg);
  overviewImgArray.forEach((e, i) => {
    e.src = rates[i].png32;
  });

  const overviewName = document.getElementsByClassName("coin-name-overview");
  const overviewNameArray = Array.from(overviewName);
  overviewNameArray.forEach((e, i) => {
    e.innerHTML = rates[i].name;
  });

  const overviewPrice = document.getElementsByClassName("value");
  const overviewPriceArray = Array.from(overviewPrice);
  overviewPriceArray.forEach((e, i) => {
    e.innerHTML = "$" + rates[i].rate.toFixed(4);
  });

  const liquidityName = document.getElementsByClassName("name");
  const liquidityNameArray = Array.from(liquidityName);
  liquidityNameArray.forEach((e, i) => {
    e.innerHTML = rates[i].name;
  });

  const liquidityImg = document.getElementsByClassName("liquidity_img");
  const liquidityImgArray = Array.from(liquidityImg);
  liquidityImgArray.forEach((e, i) => {
    e.src = rates[i].png32;
  });

  const liquidityToken = document.getElementsByClassName("token");
  const liquidityTokenArray = Array.from(liquidityToken);
  liquidityTokenArray.forEach((e, i) => {
    e.innerHTML = coins[i];
  });

  const liquidityValue = document.getElementsByClassName("liquidity_value");
  const liquidityValueArray = Array.from(liquidityValue);
  liquidityValueArray.forEach((e, i) => {
    e.innerHTML = "$" + rates[i].rate.toFixed(4);
  });

  const marketCapImg = document.getElementsByClassName("marketcap_img");
  const marketCapImgArray = Array.from(marketCapImg);
  marketCapImgArray.forEach((e, i) => {
    e.src = rates[i].png32;
  });

  const marketCapName = document.getElementsByClassName("coin-name");
  const marketCapNameArray = Array.from(marketCapName);
  marketCapNameArray.forEach((e, i) => {
    e.innerHTML = rates[i].name;
  });

  const marketCapToken = document.getElementsByClassName("marketcap_token");
  const marketCapTokenArray = Array.from(marketCapToken);
  marketCapTokenArray.forEach((e, i) => {
    e.innerHTML = coins[i];
  });

  const marketCapPrice = document.getElementsByClassName("price");
  const marketCapPriceArray = Array.from(marketCapPrice);
  marketCapPriceArray.forEach((e, i) => {
    e.innerHTML = "$" + rates[i].rate.toFixed(4);
  });

  const marketCapCap = document.getElementsByClassName("cap");
  const marketCapCapArray = Array.from(marketCapCap);
  marketCapCapArray.forEach((e, i) => {
    e.innerHTML = "$" + (rates[i].cap / 1000000).toFixed(2) + "M";
  });
};

getRates()
  .then((data) => {
    rates = data;
    // console.log(data);
    logic();
  })
  .catch((error) => {
    console.log(error);
  });

  setInterval(() => {
    getRates()
      .then((data) => {
        rates = data;
        // console.log(data);
        logic();
      })
      .catch((error) => {
        console.log(error);
      });
  }, 2000);