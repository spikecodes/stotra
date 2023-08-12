import React, { MutableRefObject, RefObject, useRef, useState } from "react";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverFooter,
	PopoverArrow,
	PopoverCloseButton,
	PopoverAnchor,
	useDisclosure,
	Input,
	List,
	ListItem,
	Text,
	HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const availableStocks = [
	{ ticker: "AAPL", name: "Apple Inc." },
	{ ticker: "MSFT", name: "Microsoft Corporation" },
	{ ticker: "AMZN", name: "Amazon.com, Inc." },
	{ ticker: "GOOG", name: "Alphabet Inc." },
	{ ticker: "FB", name: "Facebook, Inc." },
	{ ticker: "TSLA", name: "Tesla, Inc." },
	{ ticker: "NFLX", name: "Netflix, Inc." },
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
									stock.ticker.toLowerCase().includes(search.toLowerCase()) ||
									stock.name.toLowerCase().includes(search.toLowerCase()),
							)
							.map((stock) => {
								return (
									<ListItem key={stock.ticker} width="100%" height={7}>
										<Link to={`/stocks/${stock.ticker}`}>
											<HStack>
												<Text fontWeight="bold">{stock.ticker}</Text>
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
