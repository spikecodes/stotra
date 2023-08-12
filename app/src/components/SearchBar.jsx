import { useRef, useState } from "react";
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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const availableStocks = ["AMZN", "GOOG", "MSFT"];

function SearchBar() {
	const { isOpen, onToggle } = useDisclosure();

	const [search, setSearch] = useState("");

	const initialFocusRef = useRef();

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
							.filter((stock) =>
								stock.toLowerCase().includes(search.toLowerCase()),
							)
							.map((stock) => {
								return (
									<ListItem key={stock}>
										<Link to={`/stocks/${stock}`}>{stock}</Link>
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
