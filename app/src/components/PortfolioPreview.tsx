import React, { useState, useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";
import accounts from "../accounts";

const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

function PortfolioPreview() {
	const [portfolioValue, setPortfolioValue] = useState(-1);
	const [prevCloseValue, setPrevCloseValue] = useState(0.0);

	useEffect(() => {
		accounts
			.getPortfolioValue()
			.then(({ portfolioValue, portfolioPrevCloseValue }) => {
				console.log(portfolioValue + " | " + portfolioPrevCloseValue);
				setPortfolioValue(portfolioValue);
				setPrevCloseValue(portfolioPrevCloseValue);
			});
	}, []);

	return (
		<Box className="PortfolioPreview">
			<Heading as="h2" size="xl">
				{formatter.format(portfolioValue)}
			</Heading>
			<Heading
				as="h2"
				size="md"
				color={portfolioValue > prevCloseValue ? "green.500" : "red.500"}
			>
				{portfolioValue > prevCloseValue ? "▲" : "▼"}{" "}
				{formatter.format(portfolioValue - prevCloseValue)} (
				{(100 * ((portfolioValue - prevCloseValue) / prevCloseValue)).toFixed(
					5,
				)}
				%){" "}
			</Heading>
		</Box>
	);
}

export default PortfolioPreview;
