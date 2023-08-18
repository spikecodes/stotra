import React, { useState, useEffect } from "react";
import accounts from "../services/accounts.service";
import { ChevronDownIcon, UnlockIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
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
				<Menu>
					<MenuButton
						as={Button}
						width={{ base: "100%", md: "auto" }}
						rightIcon={<ChevronDownIcon />}
					>
						{username}
					</MenuButton>
					<MenuList minWidth="fit-content">
						<MenuItem
							as={Button}
							leftIcon={<UnlockIcon />}
							variant="ghost"
							mx="2"
							width="auto"
							onClick={() => {
								window.location.reload();
								accounts.logout();
								setUsername("");
							}}
						>
							Logout
						</MenuItem>
					</MenuList>
				</Menu>
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
