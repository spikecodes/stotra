import { LedgerContext } from "./App";
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  HStack,
} from "@chakra-ui/react";
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

  useEffect(() => {
    console.log(action);
  }, [action]);

  return (
    <form className="Transaction" onSubmit={(e) => e.preventDefault()}>
      <FormControl className="Transaction__action">
        <FormLabel as="legend">Action</FormLabel>
        <RadioGroup value={action} onChange={setAction}>
          <HStack spacing="24px">
            <Radio value="buy">Buy</Radio>
            <Radio value="sell">Sell</Radio>
          </HStack>
        </RadioGroup>
      </FormControl>
      <FormControl className="Transaction__ticker">
        <FormLabel>
          Ticker:
          <Input
            width="auto"
            type="text"
            value={stock.ticker}
            onChange={(e) => setStock({ ...stock, ticker: e.target.value })}
          />
        </FormLabel>
      </FormControl>
      <FormControl className="Transaction__count">
        <FormLabel>
          Count:
          <Input
            width="auto"
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </FormLabel>
      </FormControl>
      <FormControl className="Transaction__price">
        <FormLabel>
          Price:
          <Input
            width="auto"
            type="text"
            value={stock.price}
            onChange={(e) => setStock({ ...stock, price: e.target.value })}
            readOnly
          />
        </FormLabel>
      </FormControl>
      <FormControl className="Transaction__total">
        Total: {count * stock.price}
      </FormControl>
      <FormControl className="Transaction__submit">
        <Button
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
        </Button>
      </FormControl>
    </form>
  );
}
