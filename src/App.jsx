import { useEffect, useRef, useState, createContext } from "react";
import Navbar from "./Navbar";
import Transaction from "./Transaction";
import Ledger from "./Ledger";
import StockFinder from "./StockFinder";
import { Container, Heading, Box } from "@chakra-ui/react";

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
    <Container>
      <Navbar />

      <Heading as="h1" size="lg">
        Stock Trading Simulator
      </Heading>

      <Box borderWidth="1px" borderRadius="lg" p="5">
        <Heading as="h2" size="md">
          Find stocks
        </Heading>
        <StockFinder
          onSelectAction={setSelectedAction}
          onSelectStock={setSelectedStock}
        />
      </Box>

      <Box borderWidth="1px" borderRadius="lg" p="5">
        <Heading as="h2" size="md">
          Make a transaction
        </Heading>
        <LedgerContext.Provider value={{ ledger, setLedger }}>
          <Transaction
            action={selectedAction}
            stock={selelectedStock}
            count={1}
          />
        </LedgerContext.Provider>
      </Box>

      <Box borderWidth="1px" borderRadius="lg" p="5">
        <Heading as="h2" size="md">
          View your ledger
        </Heading>
        <LedgerContext.Provider value={{ ledger, setLedger }}>
          <Ledger />
        </LedgerContext.Provider>
      </Box>
    </Container>
  );
}

export default App;
