import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Text,
} from "@chakra-ui/react";
import {
	Stat,
	StatLabel,
	StatNumber,
	StatHelpText,
	StatArrow,
	StatGroup,
} from "@chakra-ui/react";
import React from "react";

export default function StockCard(props) {
	return (
		<Card className="StockCard">
			<CardBody>
				<Stat>
					<StatLabel>{props.ticker}</StatLabel>
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
