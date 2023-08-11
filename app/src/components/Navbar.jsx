import { useState } from "react";
import reactLogo from "../assets/react.svg";
import { HStack, Input, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [count, setCount] = useState(0);

  return (
    <HStack
      className="Navbar"
      borderWidth="1px"
      p="5"
      bg="white"
      display="flex"
      justifyContent="space-between"
    >
      {/* Logo */}
      <Link to="/">
        <Text>Stotra</Text>
      </Link>

      {/* Search */}
      <Input placeholder="Search" w="auto" />

      {/* Account */}
      <HStack spacing="0.5em">
        <Link to="/login">
          <img src={reactLogo} alt="React Logo" width="20px" />
          <Text>Account</Text>
        </Link>
      </HStack>
    </HStack>
  );
}
