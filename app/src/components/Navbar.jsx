import { useEffect, useState } from "react";
import reactLogo from "../assets/react.svg";
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
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import auth from "../auth";
import { CheckIcon, ChevronDownIcon } from "@chakra-ui/icons";

export default function Navbar() {
	const location = useLocation();
	const [username, setUsername] = useState(auth.getUsername());

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
			p="5"
			bg="white"
			display="flex"
			justifyContent="space-between"
		>
			{/* Logo */}
			<Link to="/">
				<Text>Stotra</Text>
			</Link>

			{/* Search */}
			<Input placeholder="Search" w="auto" />

			{/* Account */}
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
	);
}
