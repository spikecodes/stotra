import React, { useEffect, useReducer, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
	Text,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	Stat,
	StatArrow,
	Heading,
	Spacer,
	Flex,
	Box,
	Button,
	HStack,
	Stack,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	Divider,
	Center,
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import StockChart from "../components/StockChart";
import accounts from "../accounts";

const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

function StockView() {
	const { symbol } = useParams();
	const location = useLocation();

	const [shares, setShares] = useState(1);
	const [buyingPower, setBuyingPower] = useState(0);
	const [availableShares, setAvailableShares] = useState(0);

	const toast = useToast();

	const [stock, setStock] = useReducer(
		(state: any, newState: any) => ({ ...state, ...newState }),
		{ longName: "", symbol, price: 0, changePercent: 0 },
	);

	useEffect(() => {
		accounts.getBuyingPower().then((value) => {
			setBuyingPower(value);
		});

		accounts.getAvailableShares(symbol!).then((value) => {
			setAvailableShares(value);
		});

		axios
			.get(`http://localhost:3010/api/stocks/${symbol}/info`)
			.then((res) => {
				setStock({ ...res.data });
				console.log(stock);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [location]);

	return (
		<>
			{stock.price > 0 && (
				<Flex direction={{ base: "column-reverse", md: "row" }} gap={5}>
					<Box flex="0.75">
						<Stat>
							<Heading size="md" fontWeight="md">
								{stock.longName}
							</Heading>
							<Heading size="xl">{formatter.format(stock.price)}</Heading>
							<Heading size="md">
								<StatArrow
									type={stock.changePercent > 0 ? "increase" : "decrease"}
								/>
								{stock.changePercent.toFixed(2)}%
							</Heading>
						</Stat>

						<Spacer height={5} />

						<StockChart symbol={symbol as string} />
					</Box>
					<Box flex="0.25" borderWidth="1px" borderRadius="md" p={5}>
						<Tabs>
							<TabList>
								<Tab>Buy {symbol}</Tab>
								<Tab>Sell {symbol}</Tab>
							</TabList>

							<Stack p="5">
								<HStack>
									<Text>Shares</Text>
									<Spacer />
									<NumberInput
										defaultValue={1}
										min={1}
										width="20"
										onChange={(e) => setShares(parseInt(e))}
									>
										<NumberInputField />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</HStack>
								<HStack>
									<Text>Current Price</Text>
									<Spacer />
									<Text>{formatter.format(stock.price)}</Text>
								</HStack>
								<Spacer />
								<Divider />
								<Spacer />
								<HStack fontWeight="bold">
									<Text>Estimated Total</Text>
									<Spacer />
									<Text>{formatter.format(stock.price * shares)}</Text>
								</HStack>
							</Stack>

							<TabPanels>
								<TabPanel>
									<Button
										colorScheme="teal"
										size="lg"
										width="100%"
										onClick={() =>
											accounts
												.makeTransaction(symbol!, shares, "buy")
												.then(() => {
													toast({
														title: "Transaction submitted",
														description:
															"Bought " + shares + " shares of " + symbol,
														status: "success",
													});
													accounts.getBuyingPower().then((value) => {
														setBuyingPower(value);
													});
													accounts.getAvailableShares(symbol!).then((value) => {
														setAvailableShares(value);
													});
												})
												.catch((err) => {
													toast({
														title: "Error buying " + symbol,
														description: err.message,
														status: "error",
													});
												})
										}
									>
										Buy
									</Button>
									<Center mt={3}>
										<Text fontWeight="bold" fontSize="sm">
											{formatter.format(buyingPower)} Buying Power Available
										</Text>
									</Center>
								</TabPanel>
								<TabPanel>
									<Button
										colorScheme="teal"
										size="lg"
										width="100%"
										onClick={() =>
											accounts
												.makeTransaction(symbol!, shares, "sell")
												.then(() => {
													toast({
														title: "Transaction submitted",
														description:
															"Sold " + shares + " shares of " + symbol,
														status: "success",
													});
													accounts.getBuyingPower().then((value) => {
														setBuyingPower(value);
													});
													accounts.getAvailableShares(symbol!).then((value) => {
														setAvailableShares(value);
													});
												})
												.catch((err) => {
													toast({
														title: "Error selling " + symbol,
														description: err.message,
														status: "error",
													});
												})
										}
									>
										Sell
									</Button>
									<Center mt={3}>
										<Text fontWeight="bold" fontSize="sm">
											{availableShares} Shares Available
										</Text>
									</Center>
								</TabPanel>
							</TabPanels>
						</Tabs>
					</Box>
				</Flex>
			)}
		</>
	);
}

export default StockView;
