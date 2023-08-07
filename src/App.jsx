import { useEffect, useRef, useState, createContext } from "react";
import Navbar from "./Navbar";
import Transaction from "./Transaction";
import Ledger from "./Ledger";
import StockFinder from "./StockFinder";

export const LedgerContext = createContext([]);

function App() {
  const [ledger, setLedger] = useState([]);

  // Stock format: {ticker, count, price}
  const [selectedAction, setSelectedAction] = useState("buy");
  const [selelectedStock, setSelectedStock] = useState({
    ticker: "",
    price: 0,
  });

  const [selectedPrice, setSelectedPrice] = useState(0);

  return (
    <>
      <Navbar />

      <h1>Stock Trading Simulator</h1>

      <h2>Find stocks</h2>
      <StockFinder
        onSelectAction={setSelectedAction}
        onSelectStock={setSelectedStock}
      />

      <h2>Make a transaction</h2>
      <LedgerContext.Provider value={{ ledger, setLedger }}>
        <Transaction
          action={selectedAction}
          stock={selelectedStock}
          count={1}
        />
      </LedgerContext.Provider>

      <h2>View your ledger</h2>
      <LedgerContext.Provider value={{ ledger, setLedger }}>
        <Ledger />
      </LedgerContext.Provider>
    </>
  );
}

export default App;
