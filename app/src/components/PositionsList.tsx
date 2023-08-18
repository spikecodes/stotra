import React, { useEffect, useState } from "react";
import accounts from "../services/accounts.service";
import { Position } from "../App";
import {
	Tag,
	Text,
	Card,
	CardHeader,
	CardBody,
	Heading,
	Stack,
	StackDivider,
	Flex,
	Spinner,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const format = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
}).format;

function PositionsList() {
	const [isLoading, setIsLoading] = useState(true);
	const [positions, setPositions] = useState<Position[]>([]);

	useEffect(() => {
		accounts.getPortfolio().then(({ positions }) => {
			setPositions(positions);
			setIsLoading(false);
		});
	}, []);

	return (
		<Card>
			<CardHeader>
				<Heading size="md">My Portfolio</Heading>
			</CardHeader>

			<CardBody pt="0">
				{isLoading ? (
					<Spinner size={"lg"} />
				) : (
					<Stack divider={<StackDivider />} spacing="4">
						{positions.map((position) => (
							<Flex
								justifyItems="space-between"
								gap={4}
								key={position.purchaseDate.toString()}
								as={Link}
								to={"/stocks/" + position.symbol}
							>
								<Stack flex="0.33">
									<Heading size="xs" textTransform="uppercase">
										{position.symbol}
									</Heading>
									<Text fontSize="sm">
										{position.quantity} share
										{position.quantity === 1 ? "" : "s"}
									</Text>
								</Stack>
								<Stack flex="0.33">
									<Heading
										fontSize="sm"
										color="gray.500"
										textTransform="uppercase"
									>
										Gain/Loss
									</Heading>
									<Text fontSize="sm" fontWeight="500">
										{format(
											(position.regularMarketPrice - position.purchasePrice) *
												position.quantity,
										)}
									</Text>
								</Stack>
								<Stack flex="0.33" alignItems={"end"}>
									<Heading size="xs" textTransform="uppercase">
										<Text fontSize="sm">
											{format(position.regularMarketPrice)}
										</Text>
									</Heading>
									<Tag
										size="sm"
										colorScheme={
											position.regularMarketChangePercent > 0 ? "green" : "red"
										}
									>
										{position.regularMarketChangePercent > 0 ? "+" : ""}
										{position.regularMarketChangePercent.toFixed(2)}%
									</Tag>
								</Stack>
							</Flex>
						))}
						{positions.length === 0 && (
							<Text fontSize="sm">
								You don't have any positions. Go make some trades!
							</Text>
						)}
					</Stack>
				)}
			</CardBody>
		</Card>
	);
}

export default PositionsList;
