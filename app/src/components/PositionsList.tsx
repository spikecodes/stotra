import React, { useEffect, useState } from "react";
import accounts from "../accounts";
import { Position } from "src/App";
import {
	Box,
	Text,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Heading,
	Stack,
	StackDivider,
	Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function PositionsList() {
	const [positions, setPositions] = useState<Position[]>([]);

	useEffect(() => {
		accounts.getPositions().then((values) => {
			setPositions(values);
		});
	}, []);

	return (
		<Card>
			<CardHeader>
				<Heading size="md">My Portfolio</Heading>
			</CardHeader>

			<CardBody>
				<Stack divider={<StackDivider />} spacing="4">
					{positions.map((position) => (
						<Flex
							justifyItems="space-between"
							direction={{ base: "column-reverse", md: "row" }}
							gap={5}
							key={position.purchaseDate.toString()}
							as={Link}
							to={"/stocks/" + position.symbol}
						>
							<Stack>
								<Heading size="xs" textTransform="uppercase">
									{position.symbol}
								</Heading>
								<Text fontSize="sm">{position.quantity} shares</Text>
							</Stack>
							<Text fontSize="sm" color="gray.500">
								{position.purchaseDate.toString().split("T")[0]!.trim()}
							</Text>
							<Text fontSize="sm">${position.purchasePrice}</Text>
						</Flex>
					))}
				</Stack>
			</CardBody>
		</Card>
	);
}

export default PositionsList;
