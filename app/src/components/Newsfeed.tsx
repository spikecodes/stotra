import React, { useEffect, useState } from "react";
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Text,
	SimpleGrid,
	Heading,
	Divider,
	Stack,
	Link,
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

// convert ISO 8601 formatted date to human readable like "1h ago" or "4d ago"
function timeSince(date: string) {
	var seconds = Math.floor(
		(new Date().getTime() - new Date(date).getTime()) / 1000,
	);

	var interval = seconds / 31536000;
	if (interval > 1) {
		return Math.floor(interval) + " years";
	}

	interval = seconds / 2592000;
	if (interval > 1) {
		return Math.floor(interval) + " months";
	}

	interval = seconds / 86400;
	if (interval > 1) {
		return Math.floor(interval) + " days";
	}

	interval = seconds / 3600;
	if (interval > 1) {
		return Math.floor(interval) + " hours";
	}

	interval = seconds / 60;
	if (interval > 1) {
		return Math.floor(interval) + " minutes";
	}

	return Math.floor(seconds) + " seconds";
}

function Newsfeed(props: { symbol: string }) {
	const [news, setNews] = useState<NewsItem[]>([]);

	useEffect(() => {
		axios
			.get("http://localhost:3010/api/news/" + (props.symbol || ""))
			.then((res) => {
				setNews(res.data);
			});
	}, []);

	return (
		<>
			<SimpleGrid
				spacing={1}
				templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
			>
				{news.map((item) => (
					<Link
						href={item.sourceUrl}
						isExternal
						_hover={{ textDecoration: "none" }}
					>
						<Card maxW="sm" h="xs">
							<CardHeader fontSize="sm" pb={2} display="flex" gap="2">
								<Text>{timeSince(item.publishedAt)} ago </Text>
								<Text color="teal">{item.source}</Text>
							</CardHeader>
							<CardBody pt={0}>
								<Stack>
									<Heading size="sm">{item.title}</Heading>
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
						</Card>
					</Link>
				))}
			</SimpleGrid>
		</>
	);
}

export default Newsfeed;
