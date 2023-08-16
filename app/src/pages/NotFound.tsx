import { Box, Heading, Text, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<Box textAlign="center" py={10} px={6}>
			<Heading display="inline-block" as="h2" size="2xl">
				404
			</Heading>
			<Text fontSize="18px" mt={3} mb={2}>
				Page Not Found
			</Text>
			<Text color={"gray"} mb={6}>
				The page you&apos;re looking for does not seem to exist
			</Text>

			<Button as={Link} to="/" size="lg">
				Go to Home
			</Button>
		</Box>
	);
}
