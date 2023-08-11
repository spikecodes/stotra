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
} from "@chakra-ui/react";

import { useState } from "react";
import { Link } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    axios
      .post("http://localhost:3010/api/auth/signup", { username, password })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        {status == "success" && (
          <Alert status="success">
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
        {status != "" && status != "success" && (
          <Alert status="error">
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
              <Stack pt={6}>
                <Stack align="center" color="teal">
                  Already a user? <Link to="/login">Login</Link>
                </Stack>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
