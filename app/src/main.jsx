import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
	ChakraProvider,
	extendTheme,
	withDefaultColorScheme,
} from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

const customTheme = extendTheme(
	withDefaultColorScheme({ colorScheme: "teal" }),
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<ChakraProvider theme={customTheme}>
				<App />
			</ChakraProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
