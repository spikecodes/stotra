import React, { useEffect, useReducer } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Stat, StatArrow, Heading, Spacer, Flex, Box } from "@chakra-ui/react";
import axios from "axios";
import StockChart from "../components/StockChart";
import TransactionPane from "../components/TransactionPane";
import accounts from "../accounts";

const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

function StockView() {
	const { symbol } = useParams();
	const location = useLocation();

	const [stock, setStock] = useReducer(
		(state: any, newState: any) => ({ ...state, ...newState }),
		{
			symbol,
			longName: "",
			regularMarketPrice: 0,
			regularMarketChangePercent: 0,
		},
	);

	useEffect(() => {
		axios
			.get(`http://localhost:3010/api/stocks/${symbol}/info`)
			.then((res) => {
				setStock({ ...res.data });
			})
			.catch((err) => {
				console.log(err);
			});
	}, [location]);

	return (
		<>
			{stock.regularMarketPrice > 0 && (
				<Flex direction={{ base: "column-reverse", md: "row" }} gap={5}>
					<Box flex={accounts.isAuthenticated() ? "0.75" : "1"}>
						<Stat>
							<Heading size="md" fontWeight="md">
								{stock.longName}
							</Heading>
							<Heading size="xl">
								{formatter.format(stock.regularMarketPrice)}
							</Heading>
							<Heading size="md">
								<StatArrow
									type={
										stock.regularMarketChangePercent > 0
											? "increase"
											: "decrease"
									}
								/>
								{stock.regularMarketChangePercent.toFixed(2)}%
							</Heading>
						</Stat>

						<Spacer height={5} />

						<StockChart symbol={symbol as string} />
					</Box>
					{accounts.isAuthenticated() && (
						<Box flex="0.25" borderWidth="1px" borderRadius="md" p={5}>
							<TransactionPane
								symbol={symbol as string}
								price={stock.regularMarketPrice}
							/>
						</Box>
					)}
				</Flex>
			)}
		</>
	);
}

export default StockView;
