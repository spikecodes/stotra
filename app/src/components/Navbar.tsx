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
	useTheme,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Image,
} from "@chakra-ui/react";

import { Link, useLocation, NavLink } from "react-router-dom";
import { HamburgerIcon, MoonIcon, StarIcon, SunIcon } from "@chakra-ui/icons";
import SearchBox from "./SearchBox";
import AccountMenu from "./AccountMenu";

export default function Navbar() {
	const { toggleColorMode, colorMode } = useColorMode();
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
			borderBottomWidth="1px"
			p="5"
			display="flex"
			justifyContent="space-between"
		>
			{/* Left Side */}
			<Flex gap={7}>
				<Text as={Link} to="/" display="flex" alignItems="center" gap="1">
					<Image src="/logo.svg" alt="Stotra Logo" boxSize="6" />
					<Text fontWeight="bold">Stotra</Text>
				</Text>
				<NavLink
					style={({ isActive }) => {
						return {
							fontWeight: isActive ? "500" : "",
						};
					}}
					to="/"
				>
					<Text display={{ base: "none", md: "block" }}>Dashboard</Text>
				</NavLink>
				<NavLink
					style={({ isActive }) => {
						return {
							fontWeight: isActive ? "500" : "",
						};
					}}
					to="/leaderboard"
				>
					<Text display={{ base: "none", md: "block" }}>Leaderboard</Text>
				</NavLink>
			</Flex>

			{/* Center */}
			<SearchBox />

			{/* Right Side */}
			<Box>
				<HStack spacing="2" display={{ base: "none", md: "flex" }}>
					<IconButton
						variant="outline"
						aria-label="Toggle dark mode"
						icon={colorMode == "light" ? <SunIcon /> : <MoonIcon />}
						onClick={() => toggleColorMode()}
					/>
					<Menu>
						<MenuButton
							as={IconButton}
							aria-label="Options"
							icon={<StarIcon />}
							variant="outline"
						/>
						<MenuList minW="auto" px="2" pt="1">
							{[
								"red",
								"orange",
								"yellow",
								"green",
								"blue",
								"teal",
								"cyan",
								"purple",
								"pink",
							].map((color) => (
								<MenuItem
									mt="1"
									as={IconButton}
									aria-label={color}
									variant="ghost"
									bg={color + ".500"}
									_hover={{
										border: "3px solid",
										borderColor: color + ".300",
										bg: color + ".400",
									}}
									key={color}
									onClick={() => {
										localStorage.setItem("accentColor", color);
										window.location.reload();
									}}
								></MenuItem>
							))}
						</MenuList>
					</Menu>
					<AccountMenu />
				</HStack>

				<Box display={{ base: "block", md: "none" }}>
					<IconButton
						aria-label="Hamburger menu"
						icon={<HamburgerIcon />}
						ref={mobileMenuBtn}
						colorScheme={
							useTheme()["components"]["Link"]["baseStyle"]["color"].split(
								"."
							)[0]
						}
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
								<HStack spacing="2" width="100%">
									<IconButton
										variant="outline"
										aria-label="Toggle dark mode"
										icon={colorMode == "light" ? <SunIcon /> : <MoonIcon />}
										onClick={() => toggleColorMode()}
									/>
									<Menu>
										<MenuButton
											as={IconButton}
											aria-label="Options"
											icon={<StarIcon />}
											variant="outline"
										/>
										<MenuList minW="auto" px="2" pt="1">
											{[
												"red",
												"orange",
												"yellow",
												"green",
												"blue",
												"teal",
												"cyan",
												"purple",
												"pink",
											].map((color) => (
												<MenuItem
													mt="1"
													as={IconButton}
													aria-label={color}
													variant="ghost"
													bg={"var(--chakra-colors-" + color + "-500)"}
													_hover={{
														border: "3px solid",
														borderColor:
															"var(--chakra-colors-" + color + "-300)",
														bg: "var(--chakra-colors-" + color + "-400)",
													}}
													key={color}
													onClick={() => {
														localStorage.setItem("accentColor", color);
														window.location.reload();
													}}
												></MenuItem>
											))}
										</MenuList>
									</Menu>
									<AccountMenu />
								</HStack>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</Box>
			</Box>
		</HStack>
	);
}
