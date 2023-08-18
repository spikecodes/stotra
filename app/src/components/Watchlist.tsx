import React, { useEffect, useState } from "react";
import accounts from "../services/accounts.service";
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

interface WatchlistItem {
	symbol: string;
	longName: string;
	regularMarketPrice: number;
	regularMarketPreviousClose: number;
	regularMarketChangePercent: number;
}

function Watchlist() {
	const [isLoading, setIsLoading] = useState(true);
	const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);

	useEffect(() => {
		accounts.getWatchlist(false).then((watchlist) => {
			setWatchlist(watchlist as WatchlistItem[]);
			setIsLoading(false);
		});
	}, []);

	return (
		<Card>
			<CardHeader>
				<Heading size="md">Watchlist</Heading>
			</CardHeader>

			<CardBody pt="0">
				{isLoading ? (
					<Spinner size={"lg"} />
				) : (
					<Stack divider={<StackDivider />} spacing="4">
						{watchlist.map((stock, i) => (
							<Flex gap={4} key={i} as={Link} to={"/stocks/" + stock.symbol}>
								<Stack flex="0.5">
									<Heading size="xs" textTransform="uppercase">
										{stock.symbol}
									</Heading>
									<Text
										fontSize="sm"
										whiteSpace={"nowrap"}
										overflow={"hidden"}
										textOverflow={"ellipsis"}
									>
										{stock.longName}
									</Text>
								</Stack>
								<Stack flex="0.5" alignItems={"end"}>
									<Heading size="xs" textTransform="uppercase">
										<Text fontSize="sm">
											{format(stock.regularMarketPrice)}
										</Text>
									</Heading>
									<Tag
										size="sm"
										w={"fit-content"}
										colorScheme={
											stock.regularMarketChangePercent > 0 ? "green" : "red"
										}
									>
										{stock.regularMarketChangePercent > 0 ? "+" : ""}
										{stock.regularMarketChangePercent.toFixed(2)}%
									</Tag>
								</Stack>
							</Flex>
						))}
						{watchlist.length === 0 && (
							<Text fontSize="sm">
								Nothing on your watchlist. Search stocks and click "Add to
								Waitlist"!
							</Text>
						)}
					</Stack>
				)}
			</CardBody>
		</Card>
	);
}

export default Watchlist;
