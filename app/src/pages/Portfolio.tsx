import React, { useState, useContext, useEffect } from "react";
import {
	Stat,
	StatLabel,
	StatNumber,
	StatHelpText,
	StatArrow,
	StatGroup,
	Box,
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tag,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
} from "@chakra-ui/react";
import { LedgerContext } from "../App";

function getPortfolioValue(ledger) {
	return ledger.reduce((total, transaction) => {
		// Look up current price of stock
		return total + transaction.price * transaction.count;
	}, 0);
}

export default function Portfolio(props) {
	const { ledger, setLedger } = useContext(LedgerContext);

	return (
		<Box className="Portfolio" borderWidth="1px" borderRadius="lg" p="5">
			<StatGroup>
				<Stat>
					<StatLabel>Portfolio</StatLabel>
					<StatNumber>${getPortfolioValue(ledger)}</StatNumber>
					<StatHelpText>
						<StatArrow type="increase" />
						23.36%
					</StatHelpText>
				</Stat>

				<Stat>
					<StatLabel>Cash</StatLabel>
					<StatNumber>$100,000</StatNumber>
					<StatHelpText>Spend it wisely!</StatHelpText>
				</Stat>
			</StatGroup>

			<Table variant="simple">
				<TableCaption>Positions</TableCaption>
				<Thead>
					<Tr>
						<Th>Symbol</Th>
						<Th>Shares</Th>
						<Th>Price</Th>
						<Th>Change</Th>
						<Th>Value</Th>
					</Tr>
				</Thead>
				<Tbody>
					<Tr>
						<Td>
							<Tag size="sm" variant="solid" colorScheme="green">
								AAPL
							</Tag>
						</Td>
						<Td>200</Td>
						<Td>$1,200</Td>
						<Td>
							<Stat>
								<StatArrow type="increase" />
								23.36%
							</Stat>
						</Td>
						<Td>$2,400</Td>
					</Tr>
					<Tr>
						<Td>
							<Tag size="sm" variant="solid" colorScheme="red">
								AMZN
							</Tag>
						</Td>
						<Td>100</Td>
						<Td>$3,150</Td>
						<Td>
							<Stat>
								<StatArrow type="decrease" />
								9.05%
							</Stat>
						</Td>
						<Td>$3,150</Td>
					</Tr>
				</Tbody>
			</Table>
		</Box>
	);
}
