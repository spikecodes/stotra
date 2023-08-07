import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  ChakraProvider,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";

const customTheme = extendTheme(
  withDefaultColorScheme({ colorScheme: "teal" })
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
