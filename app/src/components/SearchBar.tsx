import React, { RefObject, useRef, useState } from "react";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverBody,
	PopoverArrow,
	useDisclosure,
	Input,
	List,
	ListItem,
	Text,
	HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const availableStocks = [
	{ symbol: "AAPL", name: "Apple Inc." },
	{ symbol: "MSFT", name: "Microsoft Corporation" },
	{ symbol: "AMZN", name: "Amazon.com, Inc." },
	{ symbol: "GOOG", name: "Alphabet Inc." },
	{ symbol: "META", name: "Meta Platforms Inc." },
	{ symbol: "TSLA", name: "Tesla, Inc." },
	{ symbol: "NFLX", name: "Netflix, Inc." },
];

function SearchBar() {
	const { isOpen, onToggle } = useDisclosure();

	const [search, setSearch] = useState("");

	const initialFocusRef =
		useRef<HTMLInputElement>() as RefObject<HTMLInputElement>;

	return (
		<Popover
			initialFocusRef={initialFocusRef}
			closeOnBlur={false}
			isOpen={isOpen}
			returnFocusOnClose={false}
		>
			<PopoverTrigger>
				<Input
					placeholder="Search"
					w="auto"
					ref={initialFocusRef}
					onBlur={onToggle}
					onFocus={onToggle}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</PopoverTrigger>
			<PopoverContent>
				<PopoverArrow />
				{/* <PopoverHeader>Header</PopoverHeader> */}
				<PopoverBody>
					{/* List of stocks */}
					<List>
						{availableStocks
							.filter(
								(stock) =>
									stock.symbol.toLowerCase().includes(search.toLowerCase()) ||
									stock.name.toLowerCase().includes(search.toLowerCase()),
							)
							.map((stock) => {
								return (
									<ListItem key={stock.symbol} width="100%" height={7}>
										<Link to={`/stocks/${stock.symbol}`}>
											<HStack>
												<Text fontWeight="bold">{stock.symbol}</Text>
												<Text>{stock.name}</Text>
											</HStack>
										</Link>
									</ListItem>
								);
							})}
					</List>
				</PopoverBody>
			</PopoverContent>
		</Popover>
	);
}

export default SearchBar;
