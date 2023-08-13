import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
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
} from "@chakra-ui/react";
import axios from "axios";
import StockChart from "../components/StockChart";

const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

function StockView() {
	const { ticker } = useParams();

	const [shares, setShares] = useState(1);

	const [stock, setStock] = useReducer(
		(state: any, newState: any) => ({ ...state, ...newState }),
		{ longName: "", ticker, price: 0, changePercent: 0 },
	);

	const buyStock = () => {
		axios
			.post(`http://localhost:3010/api/stocks/${ticker}/buy`, {
				shares,
			})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		axios
			.get(`http://localhost:3010/api/stocks/${ticker}/info`)
			.then((res) => {
				setStock({ ...res.data });
				console.log(stock);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

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

						<StockChart ticker={ticker as string} />
					</Box>
					<Box flex="0.25" borderWidth="1px" borderRadius="md" p={5}>
						<Tabs>
							<TabList>
								<Tab>Buy {ticker}</Tab>
								<Tab>Sell {ticker}</Tab>
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
									<Text>Total</Text>
									<Spacer />
									<Text>{formatter.format(stock.price * shares)}</Text>
								</HStack>
							</Stack>

							<TabPanels>
								<TabPanel>
									<Button colorScheme="teal" size="lg" width="100%">
										Buy
									</Button>
									<Center mt={3}>
										<Text fontWeight="bold" fontSize="sm">
											$6,000.00 Buying Power Available
										</Text>
									</Center>
								</TabPanel>
								<TabPanel>
									<Button colorScheme="teal" size="lg" width="100%">
										Sell
									</Button>
									<Center mt={3}>
										<Text fontWeight="bold" fontSize="sm">
											14 Shares Available
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
