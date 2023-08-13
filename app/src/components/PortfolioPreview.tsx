import React, { useContext, useState, useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { Transaction } from "../App";
import accounts from "../accounts";

const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

function PortfolioPreview() {
	const [portfolioValue, setPortfolioValue] = useState(-1);
	const [todaysChange, setTodaysChange] = useState(0.0);

	useEffect(() => {
		accounts.getPortfolioValue().then((value) => {
			setPortfolioValue(value);
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
				color={portfolioValue > todaysChange ? "green.500" : "red.500"}
			>
				{portfolioValue > todaysChange ? "▲" : "▼"}{" "}
				{formatter.format(portfolioValue - todaysChange)} (
				{100 * ((portfolioValue - todaysChange) / todaysChange)}%){" "}
			</Heading>
		</Box>
	);
}

export default PortfolioPreview;
