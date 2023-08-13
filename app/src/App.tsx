import React, { useState, createContext } from "react";
import Navbar from "./components/Navbar";
import Transaction from "./components/Transaction";
import { Container, Box, Spacer, Heading } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StockView from "./pages/StockView";

export type Transaction = {
	ticker: string;
	price: number;
	quantity: number;
	date: Date;
	type: "buy" | "sell";
};

function App() {
	// Stock format: {ticker, count, price}
	// const [selectedAction, setSelectedAction] = useState("buy");
	// const [selelectedStock, setSelectedStock] = useState({
	// 	ticker: "",
	// 	price: 0,
	// });

	// const [selectedPrice, setSelectedPrice] = useState(0);

	return (
		<>
			<Navbar />
			<Container maxW="container.xl">
				<Spacer h="10" />
				<Box>
					<Routes>
						<Route path="/" element={<Dashboard />}></Route>

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
            </LedgerContext.Provider>*/}
					</Routes>
				</Box>
			</Container>
		</>
	);
}

export default App;
