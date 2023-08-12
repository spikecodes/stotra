import { useEffect, useState } from "react";
import {
	HStack,
	Input,
	Text,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverFooter,
	Button,
	PopoverArrow,
	PopoverCloseButton,
	Icon,
	IconButton,
	useColorMode,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import auth from "../auth";
import {
	CheckIcon,
	ChevronDownIcon,
	SunIcon,
	TimeIcon,
} from "@chakra-ui/icons";

export default function Navbar() {
	const location = useLocation();
	const [username, setUsername] = useState(auth.getUsername());
	const { colorMode, toggleColorMode } = useColorMode();

	useEffect(() => {
		console.log("Navbar: ", location.pathname);
		console.log("Navbar: ", auth.getUsername());
		// Update username when auth.username changes
		setUsername(auth.getUsername());
	}, [location.pathname]);

	return (
		<HStack
			className="Navbar"
			borderWidth="1px"
			borderTopWidth="0px"
			p="5"
			display="flex"
			justifyContent="space-between"
			borderBottomRadius="md"
		>
			{/* Logo */}
			<Link to="/">
				<Text>Stotra</Text>
			</Link>

			{/* Search */}
			<Input placeholder="Search" w="auto" />

			{/* Account */}
			<HStack spacing="2">
				<IconButton
					variant="outline"
					aria-label="Toggle dark mode"
					icon={<SunIcon />}
					onClick={() => toggleColorMode()}
				/>
				{username ? (
					<Popover>
						<PopoverTrigger>
							<Button>
								<ChevronDownIcon />
								<Text>{username}</Text>
							</Button>
						</PopoverTrigger>
						<PopoverContent width="auto">
							<PopoverArrow />
							<PopoverCloseButton />
							<PopoverBody>
								<Button
									variant="ghost"
									onClick={() => {
										auth.logout();
										setUsername("");
									}}
								>
									Logout
								</Button>
							</PopoverBody>
						</PopoverContent>
					</Popover>
				) : (
					<Link to="/login">Login</Link>
				)}
			</HStack>
		</HStack>
	);
}
