import { useEffect, useRef, useState, createContext } from "react";
import Navbar from "./components/Navbar";
import Transaction from "./components/Transaction";
import Ledger from "./components/Ledger";
import StockFinder from "./components/StockFinder";
import { Container, Heading, Box, Spacer } from "@chakra-ui/react";
import Portfolio from "./pages/Portfolio";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StockView from "./components/StockView";

export const LedgerContext = createContext([]);

export function currentPortfolioValue(ledger) {
	// Send request to backend to get portfolio value
	return 100_000;
}

export function portfolioValueAtDate(ledger, date) {
	// Send request to backend to get portfolio value at date
	return 50_000;
}

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
			<Container maxW="container.xl">
				<Navbar />
				<Spacer h="10" />
				<Box>
					<Routes>
						<Route
							path="/"
							element={
								<LedgerContext.Provider value={{ ledger, setLedger }}>
									<Dashboard />
								</LedgerContext.Provider>
							}
						></Route>

						<Route path="/login" element={<Login />}></Route>

						<Route path="/signup" element={<Signup />}></Route>

						<Route path="/stocks/:ticker" element={<StockView />}></Route>

						{/* <Route path="/find-stocks">
              <Box borderWidth="1px" borderRadius="lg" p="5">
                <Heading as="h2" size="md">
                  Find stocks
                </Heading>
                <StockFinder
                  onSelectAction={setSelectedAction}
                  onSelectStock={setSelectedStock}
                />
              </Box>
            </Route>

            <Route path="/make-transaction">
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
            </Route>

            <LedgerContext.Provider value={{ ledger, setLedger }}>
              <Portfolio />
            </LedgerContext.Provider>

            <Route path="/view-ledger">
              <Box borderWidth="1px" borderRadius="lg" p="5">
                <Heading as="h2" size="md">
                  View your ledger
                </Heading>
                <LedgerContext.Provider value={{ ledger, setLedger }}>
                  <Ledger />
                </LedgerContext.Provider>
              </Box>
            </Route> */}
					</Routes>
				</Box>
			</Container>
		</>
	);
}

export default App;
