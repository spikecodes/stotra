import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Box, Text } from "@chakra-ui/react";

export default function Navbar() {
  const [count, setCount] = useState(0);

  return (
    <Box
      className="Navbar"
      borderWidth="1px"
      p="5"
      pos="fixed"
      width="100%"
      bg="white"
    >
      <Text>Stotra</Text>
    </Box>
  );
}
