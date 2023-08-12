"use client";

import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	Link,
} from "@chakra-ui/react";

import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import auth from "../auth";

export default function Signup() {
	const navigate = useNavigate();

	useEffect(() => {
		if (auth.isAuthenticated()) {
			// Redirect to home if already authenticated
			navigate("/");
		}
	}, []);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const [status, setStatus] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Call signup function from auth.js
		let res = await auth.signup(username, password);
		// Show alert with status of signup attempt
		setStatus(res);
		if (res === "success") {
			// Wait 1.5s before redirecting to login
			await new Promise((res) => setTimeout(res, 1500));
			navigate("/login");
		}
	};

	return (
		<Flex align={"center"} justify={"center"}>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Sign up
					</Heading>
				</Stack>
				{status === "success" && (
					<Alert status="success" borderRadius="md">
						<AlertIcon />
						<AlertTitle>Account created!</AlertTitle>
						<AlertDescription display="flex">
							Redirecting to
							<Link as={RouterLink} to="/login" ml="1">
								login
							</Link>
							...
						</AlertDescription>
					</Alert>
				)}
				{status !== "" && status !== "success" && (
					<Alert status="error" borderRadius="md">
						<AlertIcon />
						{status}
					</Alert>
				)}
				<Box rounded={"lg"} boxShadow={"lg"} p={8}>
					<form>
						<Stack spacing={4}>
							<FormControl id="username" isRequired>
								<FormLabel>Username</FormLabel>
								<Input
									type="text"
									onChange={(e) => setUsername(e.target.value)}
								/>
							</FormControl>
							<FormControl id="password" isRequired>
								<FormLabel>Password</FormLabel>
								<InputGroup>
									<Input
										type={showPassword ? "text" : "password"}
										onChange={(e) => setPassword(e.target.value)}
									/>
									<InputRightElement h={"full"}>
										<Button
											variant={"ghost"}
											onClick={() =>
												setShowPassword((showPassword) => !showPassword)
											}
										>
											{showPassword ? <ViewIcon /> : <ViewOffIcon />}
										</Button>
									</InputRightElement>
								</InputGroup>
							</FormControl>
							<Stack spacing={10} pt={2}>
								<Button
									loadingText="Submitting"
									size="lg"
									onClick={handleSubmit}
									type="submit"
								>
									Sign up
								</Button>
							</Stack>
							<HStack pt={2}>
								<Text>Already a user?</Text>
								<Link as={RouterLink} to="/login">
									Login
								</Link>
							</HStack>
						</Stack>
					</form>
				</Box>
			</Stack>
		</Flex>
	);
}
