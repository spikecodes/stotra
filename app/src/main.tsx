import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
	ChakraProvider,
	extendTheme,
	useColorModeValue,
	withDefaultColorScheme,
} from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

import "@fontsource-variable/manrope";
import "@fontsource-variable/inter";

const accentColor = localStorage.getItem("accentColor") || "cyan";

const customTheme = extendTheme(
	withDefaultColorScheme({ colorScheme: accentColor }),
	{
		styles: {
			global: () => ({
				body: {
					bg: useColorModeValue("gray.50", "initial"),
				},
			}),
		},
		fonts: {
			heading: `'Manrope Variable', sans-serif`,
			body: `'Inter Variable', sans-serif`,
		},
		components: {
			Spinner: {
				baseStyle: {
					color: accentColor + ".500",
					borderWidth: "3px",
				},
				defaultProps: {
					size: "xl",
				},
			},
			Link: {
				baseStyle: {
					color: accentColor + ".500",
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
