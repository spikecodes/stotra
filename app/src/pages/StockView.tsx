import React, { useEffect, useReducer, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
	Stat,
	Heading,
	Spacer,
	Flex,
	Box,
	Button,
	Spinner,
	HStack,
} from "@chakra-ui/react";
import axios from "axios";
import StockChart from "../components/StockChart";
import TransactionPane from "../components/TransactionPane";
import accounts from "../services/accounts.service";
import tokens from "../services/tokens.service";
import Newsfeed from "../components/Newsfeed";
import {
	AddIcon,
	ArrowDownIcon,
	ArrowUpIcon,
	MinusIcon,
} from "@chakra-ui/icons";

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
			regularMarketPrice: -1,
			regularMarketChangePercent: 0,
		},
	);

	useEffect(() => {
		// Check if stock is on watchlist
		if (tokens.isAuthenticated()) {
			accounts.getWatchlist(true).then((res: any[]) => {
				setOnWatchlist(res.some((stock) => stock.symbol === symbol));
			});
		}

		axios
			.get(`/api/stocks/${symbol}/info`)
			.then((res) => {
				setStock({ ...res.data });
			})
			.catch((err) => {
				console.log(err);
			});
	}, [location]);

	if (stock.regularMarketPrice < 0) {
		return (
			<Flex justifyContent="center">
				<Spinner size="xl" />
			</Flex>
		);
	}

	return (
		<>
			{stock.regularMarketPrice > 0 && (
				<Flex direction={{ base: "column", md: "row" }} gap={5}>
					<Box flex={tokens.isAuthenticated() ? "0.75" : "1"}>
						<Flex justifyContent={"space-between"}>
							<Stat>
								<Heading size="md" fontWeight="md">
									{stock.longName}
								</Heading>
								<Spacer h="1" />
								<Heading size="xl">
									{formatter.format(stock.regularMarketPrice)}
								</Heading>
								<HStack>
									<Heading
										size="md"
										color={
											stock.regularMarketChangePercent > 0
												? "green.500"
												: "red.500"
										}
									>
										{stock.regularMarketChangePercent > 0 ? (
											<ArrowUpIcon />
										) : (
											<ArrowDownIcon />
										)}
										{stock.regularMarketChangePercent.toFixed(2)}%
									</Heading>
									<Heading size="sm" color="gray.500">
										Today
									</Heading>
								</HStack>
							</Stat>
							{tokens.isAuthenticated() &&
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
					{tokens.isAuthenticated() && (
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
