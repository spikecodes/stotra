import React, { useEffect, useState } from "react";
import {
	Card,
	CardHeader,
	CardBody,
	Text,
	SimpleGrid,
	Heading,
	Stack,
	Link,
	Spinner,
	useTheme,
	CardFooter,
	Tag,
	HStack,
} from "@chakra-ui/react";
import axios from "axios";

interface NewsItem {
	title: string;
	description: string;
	publishedAt: string;
	symbols: string[];
	source: string;
	sourceUrl: string;
}

function timeSince(date: string) {
	const now = Date.now();
	const seconds = Math.floor((now - new Date(date).getTime()) / 1000);
	const intervals = [
		{ name: "years", seconds: 31536000 },
		{ name: "months", seconds: 2592000 },
		{ name: "days", seconds: 86400 },
		{ name: "hours", seconds: 3600 },
		{ name: "minutes", seconds: 60 },
		{ name: "seconds", seconds: 1 },
	];

	for (const interval of intervals) {
		const value = Math.floor(seconds / interval.seconds);
		if (value >= 1) {
			return `${value} ${interval.name} ago`;
		}
	}

	return "Just now";
}

function Newsfeed(props: { symbol: string }) {
	const [isLoading, setIsLoading] = useState(true);
	const [news, setNews] = useState<NewsItem[]>([]);

	let accentColor =
		useTheme()["components"]["Link"]["baseStyle"]["color"].split(".")[0];

	useEffect(() => {
		axios.get("/api/news/" + (props.symbol || "")).then((res) => {
			setNews(res.data.slice(0, 9));
			setIsLoading(false);
		});
	}, []);

	if (isLoading) {
		return (
			<Stack align="center" justify="center" h="100%">
				<Spinner />
			</Stack>
		);
	}

	return (
		<>
			<SimpleGrid
				spacing={1}
				templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
				gap={5}
			>
				{news.map((item) => (
					<Card maxW="sm" h="100%" key={item.title}>
						<CardHeader fontSize="sm" pb={2} display="flex" gap="2">
							<Text whiteSpace="nowrap">{timeSince(item.publishedAt)}</Text>
							<Text
								color={accentColor + ".500"}
								fontWeight="500"
								textOverflow="ellipsis"
								overflow="hidden"
								whiteSpace="nowrap"
							>
								{item.source}
							</Text>
						</CardHeader>
						<Link
							href={item.sourceUrl}
							color="inherit"
							isExternal
							_hover={{ textDecoration: "none" }}
						>
							<CardBody pt={0} h="100%">
								<Stack>
									<Heading
										size="sm"
										textOverflow="ellipsis"
										display="-webkit-box"
										overflow="hidden"
										css="-webkit-line-clamp: 3; -webkit-box-orient: vertical;"
									>
										{item.title}
									</Heading>
									<Text
										size="sm"
										textOverflow="ellipsis"
										display="-webkit-box"
										overflow="hidden"
										css="-webkit-line-clamp: 6; -webkit-box-orient: vertical;"
									>
										{item.description}
									</Text>
								</Stack>
							</CardBody>
						</Link>
						{item.symbols.length > 0 && (
							<>
								{/* <Divider /> */}
								<CardFooter as={Stack}>
									<Text fontSize="sm" fontWeight="500" mr="2">
										Symbols:
									</Text>
									<br />
									<HStack flexWrap="wrap">
										{item.symbols.map((symbol) => (
											<Tag
												as={Link}
												href={"/stocks/" + symbol}
												key={symbol}
												colorScheme={accentColor}
												size="sm"
											>
												{symbol}
											</Tag>
										))}
									</HStack>
								</CardFooter>
							</>
						)}
					</Card>
				))}
			</SimpleGrid>
		</>
	);
}

export default Newsfeed;
