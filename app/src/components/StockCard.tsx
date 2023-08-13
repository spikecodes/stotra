import { Button, Card, CardBody, CardFooter } from "@chakra-ui/react";
import { Stat, StatLabel, StatNumber, StatHelpText } from "@chakra-ui/react";
import React from "react";

export default function StockCard(props: any) {
	return (
		<Card className="StockCard">
			<CardBody>
				<Stat>
					<StatLabel>{props.symbol}</StatLabel>
					<StatNumber>${props.price}</StatNumber>
					{props.count > 0 && (
						<StatHelpText>
							{props.count || 1} share{props.count > 1 ? "s" : ""} * $
							{props.price}
						</StatHelpText>
					)}
				</Stat>
			</CardBody>
			{props.showButtons && (
				<CardFooter>
					<Button size="sm" onClick={props.onBuy}>
						BUY
					</Button>
					<Button size="sm" onClick={props.onBuy}>
						SELL
					</Button>
				</CardFooter>
			)}
		</Card>
	);
}
