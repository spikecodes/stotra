import { Box, Flex, Spacer, Heading, Text } from "@chakra-ui/react";
import PortfolioPreview from "../components/PortfolioPreview";
import React from "react";
import PositionsList from "../components/PositionsList";
import Newsfeed from "../components/Newsfeed";
import Watchlist from "../components/Watchlist";
import accounts from "../accounts";

export default function Dashboard() {
	return (
		<Box className="Dashboard">
			<Flex direction={{ base: "column-reverse", md: "row" }} gap={5}>
				<Box flex="0.75">
					{accounts.isAuthenticated() ? (
						<PortfolioPreview />
					) : (
						<>
							<Heading as="h1" size="xl">
								Stotra
							</Heading>
							<Text fontSize="lg">
								Create an account or login to get started!
							</Text>
						</>
					)}
					<Spacer height={10} />
					<Heading size="md">Stock Market News</Heading>
					<Spacer height={2} />
					<Newsfeed symbol={""} />
				</Box>
				<Box
					flex="0.25"
					borderWidth="1px"
					borderRadius="md"
					p={5}
					height={"fit-content"}
				>
					{accounts.isAuthenticated() ? (
						<>
							<PositionsList />
							<Spacer h="3" />
							<Watchlist />
						</>
					) : (
						<Box>
							<Heading as="h6" size="xs" textAlign={"center"}>
								(Sign in to view positions and watchlist)
							</Heading>
						</Box>
					)}
				</Box>
			</Flex>
		</Box>
	);
}
