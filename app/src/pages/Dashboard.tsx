import { Box, Flex } from "@chakra-ui/react";
import PortfolioPreview from "../components/PortfolioPreview";
import React from "react";
import PositionsList from "../components/PositionsList";
import Newsfeed from "../components/Newsfeed";

export default function Dashboard() {
	return (
		<Box className="Dashboard">
			<Flex direction={{ base: "column-reverse", md: "row" }} gap={5}>
				<Box flex="0.75">
					<PortfolioPreview />
					<Newsfeed />
				</Box>
				<Box flex="0.25" borderWidth="1px" borderRadius="md" p={5}>
					<PositionsList />
				</Box>
			</Flex>
		</Box>
	);
}
