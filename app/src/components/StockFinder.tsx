import React, { useState } from "react";
import { Box, Button, Input, ListItem, UnorderedList } from "@chakra-ui/react";

export default function StockFinder(props: any) {
	const [search, setSearch] = useState("");

	// Available stocks dict with ticker and price
	const [availableStocks] = useState<any>({
		AAPL: 120,
		GOOG: 533,
		MSFT: 81,
		TSLA: 299,
	});

	return (
		<Box className="StockFinder">
			<Input
				placeholder="Search for a stock (e.g. AAPL)"
				width="auto"
				type="text"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>

			<UnorderedList>
				{Object.keys(availableStocks).map((ticker) => {
					if (
						search != "" &&
						ticker.toLowerCase().includes(search.toLowerCase())
					) {
						return (
							<ListItem key={ticker}>
								<label>
									{ticker} - ${availableStocks[ticker]}
								</label>

								<Button
									size="sm"
									onClick={() => {
										props.onSelectStock({
											ticker,
											price: availableStocks[ticker],
										});
										props.onSelectAction("buy");
									}}
								>
									BUY
								</Button>

								<Button
									variant="outline"
									size="sm"
									onClick={() => {
										props.onSelectStock({
											ticker,
											price: availableStocks[ticker],
										});
										props.onSelectAction("sell");
									}}
								>
									SELL
								</Button>
							</ListItem>
						);
					} else {
						return null;
					}
				})}
			</UnorderedList>
		</Box>
	);
}
