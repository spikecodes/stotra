import {
	Box,
	HStack,
	ListItem,
	Tag,
	TagLabel,
	TagLeftIcon,
	UnorderedList,
} from "@chakra-ui/react";
import { LedgerContext } from "../App";
import React, { useContext } from "react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import StockCard from "./StockCard";

export default function Ledger() {
	const { ledger } = useContext(LedgerContext);

	if (ledger.length === 0) return;

	return (
		<Box className="Ledger">
			{/* List of stocks in ledger */}
			<UnorderedList spacing={1} styleType="none">
				{ledger.map((transaction) => {
					var count_abs = Math.abs(transaction.count);
					return (
						<ListItem key={transaction.id}>
							<HStack spacing="0.5em" width="auto">
								<Tag variant="subtle">
									<TagLeftIcon
										boxSize="12px"
										as={transaction.count > 0 ? AddIcon : MinusIcon}
									/>
									<TagLabel>
										{transaction.count > 0 ? "BOUGHT" : "SOLD"}
									</TagLabel>
								</Tag>
								<StockCard
									ticker={transaction.ticker}
									price={transaction.price}
									count={count_abs}
								/>
							</HStack>
						</ListItem>
					);
				})}
			</UnorderedList>
		</Box>
	);
}
