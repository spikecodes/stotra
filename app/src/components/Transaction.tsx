import {
	Box,
	Input,
	Button,
	FormControl,
	FormLabel,
	RadioGroup,
	Radio,
	HStack,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export default function Transaction(props: any) {
	const ledger = {};

	const [action, setAction] = useState(props.action || "buy");
	const [stock, setStock] = useState(
		props.stock || {
			ticker: "",
			price: 0,
		},
	);
	const [count, setCount] = useState(props.count || 1);
	// const [price, setPrice] = useState(props.price || 0);

	const [status, setStatus] = useState("");

	useEffect(() => {
		setAction(props.action);
	}, [props.action]);

	useEffect(() => {
		setStock(props.stock);
	}, [props.stock]);

	useEffect(() => {
		setCount(props.count);
	}, [props.count]);

	// Hide alert after 5 seconds
	useEffect(() => {
		setTimeout(() => {
			setStatus("");
		}, 10000);
	}, [status]);

	return (
		<form className="Transaction" onSubmit={(e) => e.preventDefault()}>
			<FormControl className="Transaction__action">
				<FormLabel as="legend">Action</FormLabel>
				<RadioGroup value={action} onChange={setAction}>
					<HStack spacing="24px">
						<Radio value="buy">Buy</Radio>
						<Radio value="sell">Sell</Radio>
					</HStack>
				</RadioGroup>
			</FormControl>
			<FormControl className="Transaction__ticker">
				<FormLabel>
					Ticker:
					<Input
						width="auto"
						type="text"
						value={stock.ticker}
						onChange={(e) => setStock({ ...stock, ticker: e.target.value })}
					/>
				</FormLabel>
			</FormControl>
			<FormControl className="Transaction__count">
				<FormLabel>
					Count:
					<Input
						width="auto"
						type="number"
						value={count}
						onChange={(e) => setCount(e.target.value)}
					/>
				</FormLabel>
			</FormControl>
			<FormControl className="Transaction__price">
				<FormLabel>
					Price:
					<Input
						width="auto"
						type="text"
						value={stock.price}
						onChange={(e) => setStock({ ...stock, price: e.target.value })}
						readOnly
					/>
				</FormLabel>
			</FormControl>
			<FormControl className="Transaction__total">
				Total: {count * stock.price}
			</FormControl>
			<FormControl className="Transaction__submit">
				<Button>Submit</Button>
			</FormControl>

			{status == "insufficient stocks" ? (
				<Alert status="error" borderRadius="lg" mt="2">
					<AlertIcon />
					<Box>
						<AlertTitle>Insufficient stocks to sell</AlertTitle>
						<AlertDescription>
							You are trying to sell stocks that you do not own.
						</AlertDescription>
					</Box>
				</Alert>
			) : null}

			{status == "success" ? (
				<Alert status="success" borderRadius="lg" mt="2">
					<AlertIcon />
					<Box>
						<AlertTitle>Successfully submitted</AlertTitle>
						<AlertDescription>
							{action === "buy" ? "Bought " : "Sold "}
							{count} share{count > 1 ? "s" : ""} of {stock.ticker}{" "}
							{action === "buy" ? "for" : "at"} ${stock.price} each.
						</AlertDescription>
					</Box>
				</Alert>
			) : null}
		</form>
	);
}
