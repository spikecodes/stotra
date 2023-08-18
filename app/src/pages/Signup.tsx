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
	Link,
	useToast,
} from "@chakra-ui/react";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import accounts from "../services/accounts.service";
import tokens from "../services/tokens.service";

export default function Signup() {
	const toast = useToast();
	const navigate = useNavigate();

	const turnstileRef = useRef<TurnstileInstance>(null);

	useEffect(() => {
		if (tokens.isAuthenticated()) {
			// Redirect to home if already authenticated
			navigate("/");
		}
	});

	useLayoutEffect(() => {
		return () => {
			turnstileRef.current?.remove();
		};
	}, []);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		// Call signup function from auth.js
		accounts
			.signup(username, password, turnstileRef.current?.getResponse()!)
			.then((res) => {
				// Show alert with status of signup attempt
				if (res === "success") {
					toast({
						title: `Account created! Redirecting to login...`,
						status: "success",
						isClosable: true,
					});
					navigate("/login");
				} else {
					toast({
						title: `${res}`,
						status: "error",
						isClosable: true,
					});
				}
			})
			.catch((err) => {
				toast({
					title: `${err}`,
					status: "error",
					isClosable: true,
				});
			});
	};

	return (
		<Flex align={"center"} justify={"center"}>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} px={{ base: 0, md: 6 }}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign="center">
						Sign up
					</Heading>
				</Stack>
				<Box rounded={"lg"} boxShadow={"lg"} p={8} pt={{ base: 4, md: 8 }}>
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
							<Stack spacing={5} pt={2}>
								<Turnstile
									ref={turnstileRef}
									siteKey="0x4AAAAAAAI6ckchuGZipSqE"
								/>
								<Button
									loadingText="Submitting"
									size="lg"
									onClick={handleSubmit}
									type="submit"
								>
									Sign up
								</Button>
							</Stack>
							<HStack pt={2} fontWeight="500">
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
