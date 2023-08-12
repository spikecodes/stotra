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
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import auth from "../auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call login function from auth.js
    let res = await auth.login(username, password);
    // Show alert with status of login attempt
    setStatus(res);
    if (res === "success") {
      // Wait 1.5s before redirecting to dashboard
      await new Promise((res) => setTimeout(res, 1500));
      navigate("/");
    }
  };

  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Stack color="teal">
            <Link to="/signup">Or create an account</Link>
          </Stack>
        </Stack>
        {status === "success" && (
          <Alert status="success" borderRadius="md">
            <AlertIcon />
            <AlertTitle>Account created!</AlertTitle>
            <AlertDescription display="flex">
              Login
              <Stack align="center" color="teal" ml="1">
                <Link to="/login">here</Link>
              </Stack>
              .
            </AlertDescription>
          </Alert>
        )}
        {status !== "" && status !== "success" && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {status}
          </Alert>
        )}
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
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
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link to="/forgot-password">
                    <Text color="teal">Forgot password?</Text>
                  </Link>
                </Stack>
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
