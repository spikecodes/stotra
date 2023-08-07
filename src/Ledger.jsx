import { LedgerContext } from "./App";
import { useContext, useEffect } from "react";

export default function Ledger() {
  const { ledger, setLedger } = useContext(LedgerContext);

  if (ledger.length === 0) return;

  return (
    <div className="Ledger">
      {/* List of stocks in ledger */}
      <p className="Ledger">Ledger:</p>
      <ul>
        {ledger.map((transaction) => {
          var count_abs = Math.abs(transaction.count);
          return (
            <li key={transaction.id}>
              {transaction.count > 0 ? "BOUGHT: " : "SOLD: "}
              {count_abs} share{count_abs > 1 ? "s" : ""} of{" "}
              {transaction.ticker} at ${transaction.price} for $
              {Math.abs(transaction.count) * transaction.price} total
            </li>
          );
        })}
      </ul>
    </div>
  );
}
