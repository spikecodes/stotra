import { Box } from "@chakra-ui/react";
import PortfolioPreview from "../components/PortfolioPreview";
import React from "react";

export default function Dashboard() {
	return (
		<Box className="Dashboard">
			<PortfolioPreview />
		</Box>
	);
}
