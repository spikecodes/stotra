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
	{
		components: {
			Link: {
				baseStyle: {
					color: "teal.500",
				},
			},
		},
	},
);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<ChakraProvider theme={customTheme}>
			<App />
		</ChakraProvider>
	</BrowserRouter>,
);
