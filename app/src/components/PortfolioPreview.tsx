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
			{accounts.isAuthenticated() ? (
				<>
					{isLoading ? (
						<Spinner size={"lg"} />
					) : (
						<Heading as="h2" size="xl">
							{formatter.format(portfolioValue)}
						</Heading>
					)}
					{portfolioValue > 0 && (
						<Heading
							as="h2"
							size="md"
							color={portfolioValue > prevCloseValue ? "green.500" : "red.500"}
						>
							{portfolioValue > prevCloseValue ? "▲" : "▼"}{" "}
							{formatter.format(portfolioValue - prevCloseValue)} (
							{(
								100 *
								((portfolioValue - prevCloseValue) / prevCloseValue)
							).toFixed(3)}
							%){" "}
						</Heading>
					)}
				</>
			) : (
				<>
					<Heading as="h1" size="xl">
						Stotra
					</Heading>
					<Heading as="h2" size="md">
						Create an account or login to get started!
					</Heading>
				</>
			)}
		</Box>
	);
}

export default PortfolioPreview;
