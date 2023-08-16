import React, { useState, useEffect } from "react";
import { Box, Heading, Spinner } from "@chakra-ui/react";
import accounts from "../accounts";

const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

function PortfolioPreview() {
	const [portfolioValue, setPortfolioValue] = useState(-1);
	const [prevCloseValue, setPrevCloseValue] = useState(0.0);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		accounts
			.getPortfolio()
			.then(({ portfolioValue, portfolioPrevCloseValue }) => {
				setPortfolioValue(portfolioValue);
				setPrevCloseValue(portfolioPrevCloseValue);
				setIsLoading(false);
			});
	}, []);

	return (
		<Box className="PortfolioPreview">
			{isLoading ? (
				<Spinner size={"lg"} />
			) : (
				<Heading as="h2" size="xl">
					{formatter.format(portfolioValue)}
				</Heading>
			)}
			{portfolioValue > 0 ? (
				<Heading
					as="h2"
					size="md"
					color={portfolioValue > prevCloseValue ? "green.500" : "red.500"}
				>
					{portfolioValue > prevCloseValue ? "▲" : "▼"}{" "}
					{formatter.format(portfolioValue - prevCloseValue)} (
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
				</Heading>
			) : (
				<Heading as="h2" size="md" fontWeight="normal">
					Make some trades to get started!
				</Heading>
			)}
		</Box>
	);
}

export default PortfolioPreview;
