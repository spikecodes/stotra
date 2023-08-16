import React, { useEffect, useReducer, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
	Stat,
	StatArrow,
	Heading,
	Spacer,
	Flex,
	Box,
	Button,
} from "@chakra-ui/react";
import axios from "axios";
import StockChart from "../components/StockChart";
import TransactionPane from "../components/TransactionPane";
import accounts from "../accounts";
import Newsfeed from "../components/Newsfeed";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

function StockView() {
	const { symbol } = useParams();
	const location = useLocation();

	const [onWatchlist, setOnWatchlist] = useState(false);

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
		// Check if stock is on watchlist
		accounts.getWatchlist(true).then((res: any[]) => {
			setOnWatchlist(res.some((stock) => stock.symbol === symbol));
		});

		axios
			.get(`/api/stocks/${symbol}/info`)
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
						<Flex justifyContent={"space-between"}>
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
							{accounts.isAuthenticated() &&
								(onWatchlist ? (
									<Button
										leftIcon={<MinusIcon />}
										variant={"outline"}
										onClick={() =>
											accounts
												.editWatchlist(symbol as string, "remove")
												.then(() => setOnWatchlist(false))
										}
									>
										Remove from Watchlist
									</Button>
								) : (
									<Button
										leftIcon={<AddIcon />}
										variant={"outline"}
										onClick={() =>
											accounts
												.editWatchlist(symbol as string, "add")
												.then(() => setOnWatchlist(true))
										}
									>
										Add to Watchlist
									</Button>
								))}
						</Flex>

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
			<Spacer height={5} />
			<Heading size="md">{symbol as string} News</Heading>
			<Spacer height={2} />
			<Newsfeed symbol={symbol as string} />
		</>
	);
}

export default StockView;
