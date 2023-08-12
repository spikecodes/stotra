"use client";

import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	InputGroup,
	InputRightElement,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	Link,
	HStack,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import auth from "../auth";
import { useReducer } from "react";

export default function Login() {
	const navigate = useNavigate();

	useEffect(() => {
		if (auth.isAuthenticated()) {
			// Redirect to home if already authenticated
			navigate("/");
		}
	}, []);

	const [loginData, setLoginData] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{ username: "", password: "", showPassword: false },
	);

	const [status, setStatus] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Call login function from auth.js
		let res = await auth.login(loginData.username, loginData.password);
		// Show alert with status of login attempt
		setStatus(res);
		if (res === "success") {
			// Wait 1.5s before redirecting to dashboard
			await new Promise((res) => setTimeout(res, 1500));
			navigate("/");
		}
	};

	return (
		<Flex align={"center"} justify={"center"}>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"}>Sign in to your account</Heading>
					<HStack spacing="1">
						<Text>Or</Text>

						<Link>
							<RouterLink to="/signup">create an account</RouterLink>
						</Link>
					</HStack>
				</Stack>
				{status === "success" && (
					<Alert status="success" borderRadius="md">
						<AlertIcon />
						<AlertTitle>Logged in!</AlertTitle>
						<AlertDescription display="flex">
							Redirecting to
							<Stack align="center" color="teal" ml="1">
								<Link to="/">dashboard</Link>
							</Stack>
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
									onChange={(e) =>
										setLoginData({
											username: e.target.value,
										})
									}
								/>
							</FormControl>
							<FormControl id="password" isRequired>
								<FormLabel>Password</FormLabel>
								<InputGroup>
									<Input
										type={loginData.showPassword ? "text" : "password"}
										onChange={(e) =>
											setLoginData({
												password: e.target.value,
											})
										}
									/>
									<InputRightElement h={"full"}>
										<Button
											variant={"ghost"}
											onClick={() =>
												setLoginData({
													showPassword: !loginData.showPassword,
												})
											}
										>
											{loginData.showPassword ? <ViewIcon /> : <ViewOffIcon />}
										</Button>
									</InputRightElement>
								</InputGroup>
							</FormControl>
							<Stack spacing={10}>
								{/* <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox
                    onChange={(e) =>
                      setLoginData({ rememberMe: e.target.checked })
                    }
                  >
                    Remember me
                  </Checkbox>
                  <Link to="/forgot-password">
                    <Text color="teal">Forgot password?</Text>
                  </Link>
                </Stack> */}
								<Button type="submit" onClick={handleSubmit}>
									Sign in
								</Button>
							</Stack>
						</Stack>
					</form>
				</Box>
			</Stack>
		</Flex>
	);
}
