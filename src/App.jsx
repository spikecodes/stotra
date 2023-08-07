import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import './App.css';
import Navbar from "./Navbar";

function App() {
  // Available stocks dict with ticker and price
  const [availableStocks, setAvailableStocks] = useState({
    AAPL: 120,
    GOOG: 533,
    MSFT: 81,
    TSLA: 299,
  });

  // Stock format: {ticker, count, price}
  const [stocks, setStocks] = useState([]);

  const [search, setSearch] = useState("");

  return (
    <>
      <Navbar />
      {/* Search input field using the search state defined above */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* List available stocks where stock ticker equals the search value*/}
      <ul>
        {Object.keys(availableStocks).map((ticker) => {
          console.log(ticker + " " + search);
          if (ticker.toLowerCase().includes(search.toLowerCase())) {
            return (
              <div>
                <button
                  onClick={() => {
                    // Check if stock is already in portfolio
                    const stock = stocks.find(
                      (stock) => stock.ticker === ticker
                    );
                    if (stock) {
                      // If stock is in portfolio, update the count
                      setStocks(
                        stocks.map((stock) => {
                          if (stock.ticker === ticker) {
                            return {
                              ...stock,
                              count: stock.count + 1,
                            };
                          }
                          return stock;
                        })
                      );
                    } else {
                      // If stock is not in portfolio, add it
                      setStocks([
                        ...stocks,
                        {
                          ticker,
                          count: 1,
                          price: availableStocks[ticker],
                        },
                      ]);
                    }
                  }}
                >
                  {ticker} {availableStocks[ticker]}
                </button>
              </div>
            );
          }
        })}
      </ul>

      {/* List of stocks in portfolio */}
      <p className="Portfolio">Portfolio:</p>
      <ul>
        {stocks.map((stock) => (
          <li>
            {stock.ticker} {stock.count} {stock.price} - {"$"}
            {stock.count * stock.price}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
