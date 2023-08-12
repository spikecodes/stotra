import { useEffect, useState } from "react";
import reactLogo from "../assets/react.svg";
import { HStack, Input, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import auth from "../auth";

export default function Navbar() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Update username when auth.username changes
    setCount(count + 1);
  }, [auth.username]);

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
      <Link to="/login">
        |{auth.getUsername()}|
        {auth.username ? (
          <HStack spacing="2">
            <img src={reactLogo} alt="React Logo" width="20px" />
            <Text>{auth.username}</Text>
          </HStack>
        ) : (
          "Login"
        )}
      </Link>
    </HStack>
  );
}
