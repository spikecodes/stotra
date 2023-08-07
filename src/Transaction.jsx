import { LedgerContext } from "./App";
import { Input, FormControl, FormLabel } from "@chakra-ui/react";
import { useEffect, useContext, useState } from "react";

export default function Transaction(props) {
  const { ledger, setLedger } = useContext(LedgerContext);

  const [action, setAction] = useState(props.action || "buy");
  const [stock, setStock] = useState(
    props.stock || {
      ticker: "",
      price: 0,
    }
  );
  const [count, setCount] = useState(props.count || 1);
  const [price, setPrice] = useState(props.price || 0);

  useEffect(() => {
    setAction(props.action);
    setCount(props.count);
    setStock(props.stock);
  }, [props]);

  return (
    <FormControl className="Transaction" onSubmit={(e) => e.preventDefault()}>
      <div className="Transaction__action">
        <label>
          <Input
            width="auto"
            type="radio"
            name="action"
            value="buy"
            checked={action === "buy"}
            onChange={(e) => setAction(e.target.value)}
          />
          Buy
        </label>
        <label>
          <Input
            width="auto"
            type="radio"
            name="action"
            value="sell"
            checked={action === "sell"}
            onChange={(e) => setAction(e.target.value)}
          />
          Sell
        </label>
      </div>
      <div className="Transaction__ticker">
        <label>
          Ticker:
          <Input
            width="auto"
            type="text"
            value={stock.ticker}
            onChange={(e) => setStock({ ...stock, ticker: e.target.value })}
          />
        </label>
      </div>
      <div className="Transaction__count">
        <label>
          Count:
          <Input
            width="auto"
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </label>
      </div>
      <div className="Transaction__price">
        <label>
          Price:
          <Input
            width="auto"
            type="text"
            value={stock.price}
            onChange={(e) => setStock({ ...stock, price: e.target.value })}
            readOnly
          />
        </label>
      </div>
      <div className="Transaction__total">Total: {count * stock.price}</div>
      <div className="Transaction__submit">
        <button
          onClick={() => {
            setLedger([
              ...ledger,
              {
                id: (ledger[ledger.length - 1] || { id: 0 }).id + 1,
                ticker: stock.ticker,
                count: action === "buy" ? count : -count,
                price: stock.price,
              },
            ]);
          }}
        >
          Submit
        </button>
      </div>
    </FormControl>
  );
}
