import React, { KeyboardEvent as KE, RefObject, useRef, useState } from "react";
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
	Flex,
	useColorModeValue,
	InputLeftElement,
	InputGroup,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SearchIcon } from "@chakra-ui/icons";

interface SearchResult {
	symbol: string;
	longname: string;
}

function SearchBox() {
	const initialFocusRef =
		useRef<HTMLInputElement>() as RefObject<HTMLInputElement>;
	const navigate = useNavigate();

	const selectedBgColor = useColorModeValue("gray.100", "gray.800");

	const { isOpen, onToggle } = useDisclosure();
	const [selectedIndex, setSelectedIndex] = useState<number>(0);

	const [query, setQuery] = useState<string>("");
	const [results, setResults] = useState<[SearchResult] | null>(null);

	const onKeyDown = (e: KE<HTMLInputElement>) => {
		if (results == null || results.length < 1) return;

		if (e.key === "Enter") {
			// User pressed the enter key, redirect to the selected stock
			navigate(`/stocks/${results![selectedIndex]!.symbol}`);
			let input: HTMLInputElement = e.target! as HTMLInputElement;
			input.blur();
		} else if (e.key === "ArrowUp") {
			// User pressed the up arrow, decrement the index (loop around)
			setSelectedIndex((selectedIndex - 1) % results!.length);
			if (selectedIndex === 0) setSelectedIndex(results!.length - 1);
		} else if (e.key === "ArrowDown") {
			// User pressed the down arrow, increment the index (loop around)
			setSelectedIndex((selectedIndex + 1) % results!.length);
		}
	};

	React.useEffect(() => {
		if (query === "") {
			setResults(null);
			return;
		}

		setSelectedIndex(0);

		const searchForStock = setTimeout(() => {
			axios
				.get(`http://localhost:3010/api/stocks/search/${query!}`)
				.then((res: { data: [SearchResult] }) => {
					setResults(res.data);
				});
		}, 300);

		return () => clearTimeout(searchForStock);
	}, [query]);

	return (
		<Popover
			initialFocusRef={initialFocusRef}
			closeOnBlur={false}
			isOpen={isOpen}
			returnFocusOnClose={false}
		>
			<PopoverTrigger>
				<InputGroup w="auto">
					<InputLeftElement>
						<SearchIcon />
					</InputLeftElement>
					<Input
						placeholder="Search (ex. AAPL)"
						ref={initialFocusRef}
						onBlur={onToggle}
						onFocus={onToggle}
						onKeyDown={onKeyDown}
						onChange={(e) => setQuery(e.target.value)}
					/>
				</InputGroup>
			</PopoverTrigger>
			{results != null && (
				<PopoverContent>
					<PopoverArrow />
					{/* <PopoverHeader>Header</PopoverHeader> */}
					<PopoverBody>
						{/* List of stocks */}
						{results.length > 0 ? (
							<List>
								{results!.map((stock, i) => {
									return (
										<ListItem
											key={stock.symbol}
											width="100%"
											height={7}
											bg={selectedIndex === i ? selectedBgColor : ""}
										>
											<Link to={`/stocks/${stock.symbol}`}>
												<Flex gap={1}>
													<Text
														fontWeight="bold"
														flex="0.25"
														overflow="hidden"
														textOverflow="ellipsis"
														whiteSpace="nowrap"
													>
														{stock.symbol}
													</Text>
													<Text
														overflow="hidden"
														textOverflow="ellipsis"
														whiteSpace="nowrap"
														flex="0.75"
													>
														{stock.longname}
													</Text>
												</Flex>
											</Link>
										</ListItem>
									);
								})}
							</List>
						) : (
							<Text>No results found</Text>
						)}
					</PopoverBody>
				</PopoverContent>
			)}
		</Popover>
	);
}

export default SearchBox;
