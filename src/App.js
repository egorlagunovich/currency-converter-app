import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import CurrencyRow from "./components/CurrencyRow";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [currentDate, setCurrentDate] = useState("Time");
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }
  const handleFromAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  };
  const handleToAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  };
  const myHeaders = new Headers();
  myHeaders.append("apikey", "UQ1pMFSPWw4PRBYpVacLVt8EBz1B99aT");
  const requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };
  useEffect(() => {
    fetch(
      "https://api.apilayer.com/exchangerates_data/latest?symbols=JPY%2C%20GBP%2C%20USD%2C%20BYN%2C%20PLN%2C%20EUR&base=EUR",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const currency = Object.keys(result.rates)[2];
        setCurrencyOptions([...Object.keys(result.rates)]);
        setCurrentDate(result.date);
        setFromCurrency(result.base);
        setToCurrency(currency);
        setExchangeRate(result.rates[currency]);
      })
      .catch((error) => console.log("error", error));
  }, []);
  useEffect(() => {
    fetch(
      `https://api.apilayer.com/exchangerates_data/latest?symbols=JPY%2C%20GBP%2C%20USD%2C%20BYN%2C%20PLN%2C%20EUR&base=${fromCurrency}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setExchangeRate(result.rates[toCurrency]);
      })
      .catch((error) => console.log("error", error));
  }, [fromCurrency, toCurrency]);
  return (
    <div className=" p-10 bg-gray-200 min-h-screen">
      <div className="container max-w-md mx-auto">
        <div className="flex flex-col items-center justify-center">
          <h1 className="md:text-5xl text-4xl text-gray-700 mb-10">
            Currency Converter
          </h1>
          <h2 className="md:text-xl text-3xl text-gray-700">
            1 usd is 0.9 euro
          </h2>
          <p className=" text-gray-700 mb-5">{currentDate}</p>
          <CurrencyRow
            currencyOptions={currencyOptions}
            selectedCurrency={fromCurrency}
            onChangeCurrency={(e) => setFromCurrency(e.target.value)}
            onChangeAmount={handleFromAmountChange}
            amount={fromAmount}
          />
          <CurrencyRow
            currencyOptions={currencyOptions}
            selectedCurrency={toCurrency}
            onChangeCurrency={(e) => setToCurrency(e.target.value)}
            onChangeAmount={handleToAmountChange}
            amount={toAmount}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
