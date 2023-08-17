import React from "react";
import Navbar from "./components/Navbar";
import { Container, Box, Spacer, Text, Link } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StockView from "./pages/StockView";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";

export type Transaction = {
	symbol: string;
	purchasePrice: number;
	quantity: number;
	date: Date;
	type: "buy" | "sell";
};

export type Position = {
	symbol: string;
	longName: string;
	purchasePrice: number;
	purchaseDate: Date;
	quantity: number;
	regularMarketPrice: number;
	regularMarketPreviousClose: number;
	regularMarketChangePercent: number;
};

function App() {
	// Stock format: {symbol, count, price}
	// const [selectedAction, setSelectedAction] = useState("buy");
	// const [selelectedStock, setSelectedStock] = useState({
	// 	symbol: "",
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

						<Route path="/leaderboard" element={<Leaderboard />}></Route>

						<Route path="/stocks/:symbol" element={<StockView />}></Route>

						{/* Add 404*/}
						<Route path="*" element={<NotFound />}></Route>
					</Routes>
				</Box>
			</Container>
			<Box textAlign="center" py="10">
				<Text fontSize="sm" color="gray.500">
					Built by{" "}
					<Link href="https://spike.codes" fontWeight="bold">
						Spike
					</Link>{" "}
					on{" "}
					<Link href="https://github.com/spikecodes/stotra" fontWeight="bold">
						GitHub
					</Link>
				</Text>
			</Box>
		</>
	);
}

export default App;
