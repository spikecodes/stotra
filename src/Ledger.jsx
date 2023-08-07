import {
  Box,
  HStack,
  ListItem,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { LedgerContext } from "./App";
import { useContext, useEffect } from "react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

export default function Ledger() {
  const { ledger, setLedger } = useContext(LedgerContext);

  if (ledger.length === 0) return;

  return (
    <Box className="Ledger">
      {/* List of stocks in ledger */}
      <UnorderedList spacing={1}>
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
                <Text>
                  {count_abs} share{count_abs > 1 ? "s" : ""} of{" "}
                  {transaction.ticker} at ${transaction.price} for $
                  {Math.abs(transaction.count) * transaction.price} total
                </Text>
              </HStack>
            </ListItem>
          );
        })}
      </UnorderedList>
    </Box>
  );
}
