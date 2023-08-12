import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { Stat, StatArrow, Heading, Spacer } from "@chakra-ui/react";
import axios from "axios";
import StockChart from "../components/StockChart";

const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

function StockView() {
	const { ticker } = useParams();

	const [stock, setStock] = useReducer(
		(state: any, newState: any) => ({ ...state, ...newState }),
		{ longName: "", ticker, price: 0, changePercent: 0 },
	);

	useEffect(() => {
		axios
			.get(`http://localhost:3010/api/stocks/${ticker}/info`)
			.then((res) => {
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
				<>
					<Stat>
						<Heading size="md" fontWeight="md">
							{stock.longName}
						</Heading>
						<Heading size="xl">{formatter.format(stock.price)}</Heading>
						<Heading size="md">
							<StatArrow
								type={stock.changePercent > 0 ? "increase" : "decrease"}
							/>
							{stock.changePercent.toFixed(2)}%
						</Heading>
					</Stat>

					<Spacer height={5} />

					<StockChart ticker={ticker as string} />
				</>
			)}
		</>
	);
}

export default StockView;
