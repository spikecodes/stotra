import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import {
	Stat,
	StatLabel,
	StatNumber,
	StatHelpText,
	StatArrow,
	StatGroup,
} from "@chakra-ui/react";
import axios from "axios";

const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

function StockView() {
	const { ticker } = useParams();

	const [stock, setStock] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{ ticker, price: 0, changePercent: 0 },
	);

	useEffect(() => {
		axios
			.get(`http://localhost:3010/api/stocks/${ticker}`)
			.then((res) => {
				console.log(res.data);
				console.log("yeet");
				setStock({ ...res.data });
				console.log(stock);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<>
			{stock.price > 0 && (
				<Stat>
					<StatLabel>{stock.ticker}</StatLabel>
					<StatNumber>{formatter.format(stock.price)}</StatNumber>
					<StatHelpText>
						<StatArrow type="{stock.changePercent > 0 ? 'increase' : 'decrease'}" />
						{stock.changePercent.toFixed(2)}%
					</StatHelpText>
				</Stat>
			)}
		</>
	);
}

export default StockView;
