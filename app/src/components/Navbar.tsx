import React, { RefObject, useEffect, useRef } from "react";
import {
	HStack,
	Text,
	IconButton,
	useColorMode,
	Flex,
	Box,
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Stack,
} from "@chakra-ui/react";

import { Link, useLocation } from "react-router-dom";
import { HamburgerIcon, SunIcon } from "@chakra-ui/icons";
import SearchBox from "./SearchBox";
import AccountMenu from "./AccountMenu";

export default function Navbar() {
	const { toggleColorMode } = useColorMode();
	const location = useLocation();

	// Mobile nav menu
	const { isOpen, onOpen, onClose } = useDisclosure();
	const mobileMenuBtn =
		useRef<HTMLButtonElement>() as RefObject<HTMLButtonElement>;

	useEffect(() => {
		if (isOpen) {
			onClose();
		}
	}, [location]);

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
			{/* Left Side */}
			<Flex gap={5}>
				<Text as={Link} to="/">
					<Text fontWeight="bold">Stotra</Text>
				</Text>
				<Text as={Link} to="/" display={{ base: "none", md: "block" }}>
					<Text>Dashboard</Text>
				</Text>
				<Text
					as={Link}
					to="/leaderboard"
					display={{ base: "none", md: "block" }}
				>
					<Text>Leaderboard</Text>
				</Text>
			</Flex>

			{/* Center */}
			<SearchBox />

			{/* Right Side */}
			<Box>
				<HStack spacing="2" display={{ base: "none", md: "flex" }}>
					<IconButton
						variant="outline"
						aria-label="Toggle dark mode"
						icon={<SunIcon />}
						onClick={() => toggleColorMode()}
					/>
					<AccountMenu />
				</HStack>

				<Box display={{ base: "block", md: "none" }}>
					<IconButton
						aria-label="Hamburger menu"
						icon={<HamburgerIcon />}
						ref={mobileMenuBtn}
						colorScheme="teal"
						onClick={onOpen}
					/>
					<Drawer
						isOpen={isOpen}
						placement="top"
						onClose={onClose}
						finalFocusRef={mobileMenuBtn}
					>
						<DrawerOverlay />
						<DrawerContent>
							<DrawerCloseButton />
							<DrawerHeader>
								<Text as={Link} to="/">
									<Text fontWeight="bold">Stotra</Text>
								</Text>
							</DrawerHeader>

							<DrawerBody>
								<Stack spacing="2.5">
									<Text as={Link} to="/">
										<Text>Dashboard</Text>
									</Text>
									<Text as={Link} to="/leaderboard">
										<Text>Leaderboard</Text>
									</Text>
								</Stack>
							</DrawerBody>

							<DrawerFooter>
								<AccountMenu />
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</Box>
			</Box>
		</HStack>
	);
}
