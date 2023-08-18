import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Button,
	Heading,
	Text,
	InputGroup,
	InputRightElement,
	Link,
	HStack,
	useToast,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import accounts from "../services/accounts.service";
import tokens from "../services/tokens.service";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import { useReducer } from "react";

export default function Login() {
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

	const [loginData, setLoginData] = useReducer(
		(state: any, newState: any) => ({ ...state, ...newState }),
		{ username: "", password: "", showPassword: false },
	);

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		// Call login function from auth.js
		accounts
			.login(
				loginData.username,
				loginData.password,
				turnstileRef.current?.getResponse()!,
			)
			.then((res) => {
				// Show alert with status of login attempt
				if (res === "success") {
					toast({
						title: `Logged in! Redirecting to dashboard...`,
						status: "success",
						isClosable: true,
					});
					navigate("/");
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
						Sign in to your account
					</Heading>
					<HStack spacing="1">
						<Text>Or</Text>
						<Link as={RouterLink} to="/signup" fontWeight="500">
							create an account
						</Link>
					</HStack>
				</Stack>
				<Box rounded={"lg"} boxShadow={"lg"} p={8} pt={{ base: 4, md: 8 }}>
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
							<Stack spacing={10} alignItems="center">
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
                    <Text>Forgot password?</Text>
                  </Link>
                </Stack> */}
								<Turnstile
									ref={turnstileRef}
									siteKey="0x4AAAAAAAI6ckchuGZipSqE"
								/>

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
