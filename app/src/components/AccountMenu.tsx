import React, { useState, useEffect } from "react";
import accounts from "../accounts";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
	Popover,
	PopoverTrigger,
	Text,
	Button,
	PopoverContent,
	PopoverArrow,
	PopoverBody,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

function AccountMenu() {
	const location = useLocation();

	const [username, setUsername] = useState(accounts.getUsername());

	useEffect(() => {
		// Update username when auth.username changes
		setUsername(accounts.getUsername());
	}, [location.pathname]);

	return (
		<>
			{username ? (
				<Popover>
					<PopoverTrigger>
						<Button width={{ base: "100%", md: "auto" }}>
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
									accounts.logout();
									setUsername("");
								}}
							>
								Logout
							</Button>
						</PopoverBody>
					</PopoverContent>
				</Popover>
			) : (
				<Button
					as={Link}
					to="/login"
					variant="outline"
					width={{ base: "100%", md: "auto" }}
				>
					Login
				</Button>
			)}
		</>
	);
}

export default AccountMenu;
