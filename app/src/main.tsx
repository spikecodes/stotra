import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
	ChakraProvider,
	extendTheme,
	withDefaultColorScheme,
} from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

import "@fontsource-variable/manrope";
import "@fontsource-variable/inter";

const customTheme = extendTheme(
	withDefaultColorScheme({ colorScheme: "teal" }),
	{
		fonts: {
			heading: `'Manrope Variable', sans-serif`,
			body: `'Inter Variable', sans-serif`,
		},
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
