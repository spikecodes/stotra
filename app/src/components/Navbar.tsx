import React, { useEffect, useState } from "react";
import {
	HStack,
	Text,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverBody,
	Button,
	PopoverArrow,
	IconButton,
	useColorMode,
	Flex,
} from "@chakra-ui/react";

import { Link, useLocation } from "react-router-dom";
import auth from "../accounts";
import { ChevronDownIcon, SunIcon } from "@chakra-ui/icons";
import SearchBox from "./SearchBox";

export default function Navbar() {
	const location = useLocation();

	const [username, setUsername] = useState(auth.getUsername());
	const { toggleColorMode } = useColorMode();

	useEffect(() => {
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
			{/* Logo and Page Libks */}
			<Flex gap={5}>
				<Link to="/">
					<Text fontWeight="bold">Stotra</Text>
				</Link>
				<Link to="/">
					<Text>Dashboard</Text>
				</Link>
				<Link to="/leaderboard">
					<Text>Leaderboard</Text>
				</Link>
			</Flex>

			{/* Search */}
			<SearchBox />

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
							<PopoverBody>
								<Button
									variant="ghost"
									onClick={() => {
										window.location.reload();
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
