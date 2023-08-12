import React, { useContext, useState, useEffect } from "react";
import {
	LedgerContext,
	currentPortfolioValue,
	portfolioValueAtDate,
} from "../App";
import { Box, Heading } from "@chakra-ui/react";

const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

function PortfolioPreview() {
	const { ledger } = useContext(LedgerContext);

	const [portfolioValue, setPortfolioValue] = useState(
		currentPortfolioValue(ledger),
	);

	// Get yesterday's date
	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);

	const [oldValue] = useState(portfolioValueAtDate(ledger, yesterday)); //setOldValue

	useEffect(() => {
		setPortfolioValue(currentPortfolioValue(ledger));
	}, [ledger]);

	return (
		<Box className="PortfolioPreview">
			<Heading as="h2" size="xl">
				{formatter.format(portfolioValue)}
			</Heading>
			<Heading
				as="h2"
				size="md"
				color={portfolioValue > oldValue ? "green.500" : "red.500"}
			>
				{portfolioValue > oldValue ? "▲" : "▼"}{" "}
				{formatter.format(portfolioValue - oldValue)} (
				{100 * ((portfolioValue - oldValue) / oldValue)}%){" "}
			</Heading>
		</Box>
	);
}

export default PortfolioPreview;
