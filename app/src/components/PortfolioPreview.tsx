import React, { useState, useEffect } from "react";
import {
	Box,
	Flex,
	Heading,
	Spacer,
	Spinner,
	Text,
	useToast,
} from "@chakra-ui/react";
import accounts from "../services/accounts.service";
import tokens from "../services/tokens.service";
import { useNavigate } from "react-router-dom";

const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

function PortfolioPreview() {
	const [portfolioValue, setPortfolioValue] = useState(-1);
	const [prevCloseValue, setPrevCloseValue] = useState(0.0);
	const [cash, setCash] = useState(0.0);
	const [isLoading, setIsLoading] = useState(true);

	const toast = useToast();
	const navigate = useNavigate();

	useEffect(() => {
		accounts
			.getPortfolio()
			.then(({ portfolioValue, portfolioPrevCloseValue, cash }) => {
				setPortfolioValue(portfolioValue);
				setPrevCloseValue(portfolioPrevCloseValue);
				setCash(cash);
				setIsLoading(false);
			})
			.catch((err) => {
				if (err.response && err.response.status === 401) {
					tokens.clearToken();
					toast({
						title: `You are not logged in! Redirecting to login...`,
						status: "error",
						isClosable: true,
					});
					navigate("/login");
				}
			});
	}, []);

	return (
		<Flex className="PortfolioPreview">
			<Box flex="0.5">
				{isLoading ? (
					<Spinner size={"lg"} />
				) : (
					<>
						<Heading as="h4" size="sm" color="gray.500" fontWeight="600">
							Total Investment
						</Heading>
						<Spacer h="1" />
						<Heading as="h2" size="xl">
							{formatter.format(portfolioValue)}
						</Heading>
					</>
				)}
				{portfolioValue > 0 ? (
					<Heading
						as="h2"
						size="md"
						color={portfolioValue > prevCloseValue ? "green.500" : "red.500"}
					>
						{portfolioValue > prevCloseValue ? "▲" : "▼"}
						<Text as="span" fontWeight="800" px="1">
							{formatter.format(portfolioValue - prevCloseValue)}
						</Text>
						<Text as="span" fontWeight="500">
							(
							{
								// Show 4 decimal places if the change is less than 0.01%
								(
									100 *
									((portfolioValue - prevCloseValue) / prevCloseValue)
								).toFixed(
									Math.abs(
										100 * ((portfolioValue - prevCloseValue) / prevCloseValue),
									) < 0.01
										? 4
										: 2,
								)
							}
							%){" "}
						</Text>
					</Heading>
				) : (
					<Heading as="h2" size="md" fontWeight="normal">
						Make some trades to get started!
					</Heading>
				)}
			</Box>
			<Box flex="0.5">
				{isLoading ? (
					<Spinner size={"lg"} />
				) : (
					<>
						<Heading as="h4" size="sm" color="gray.500" fontWeight="600">
							Cash (Buying Power)
						</Heading>
						<Spacer h="1" />
						<Heading as="h2" size="xl">
							{formatter.format(cash)}
						</Heading>
					</>
				)}
			</Box>
		</Flex>
	);
}

export default PortfolioPreview;
