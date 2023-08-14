import React, { useState, useRef, useEffect } from "react";
import moment from "moment";
import * as Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";

const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

export default function StockChart(props: { symbol: string }) {
	const [options, setOptions] = useState<Highcharts.Options>({
		rangeSelector: {
			selected: 1,
			inputStyle: {
				color: "teal",
				fontWeight: "bold",
			},
		},
		colors: ["teal"],
		title: {
			text: "",
		},
		yAxis: [
			{
				height: "75%",
				labels: {
					formatter: (point: any) => formatter.format(point.value as number),
					x: -5,
					style: {
						color: "#000",
						position: "absolute",
					},
					align: "left",
				},
				title: {
					text: " ",
				},
			},
		],
		// tooltip: {
		// 	shared: true,
		// 	formatter: tooltipFormatter,
		// },
		plotOptions: {
			series: {
				showInNavigator: true,
				gapSize: 6,
			},
		},
		chart: {
			height: 600,
			// styledMode: true,
		},
		credits: {
			enabled: false,
		},
		xAxis: {
			type: "datetime",
		},
		navigator: {
			maskFill: "rgb(0, 128, 128, 0.25)",
			series: {
				color: "teal",
				fillOpacity: 0.1,
				lineWidth: 2,
			},
		},
	} as any);

	const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

	useEffect(() => {
		// const tooltipFormatter: Highcharts.TooltipFormatterCallbackFunction =
		// 	function () {
		// 		return (
		// 			formatter.format(this.y as number) +
		// 			"</b><br/>" +
		// 			moment(this.x).format("MMMM Do YYYY, h:mm")
		// 		);
		// 	};

		axios
			.get(`http://localhost:3010/api/stocks/${props.symbol}/historical`)
			.then((res) => {
				setOptions({
					...options,
					series: [
						{
							name: "Price",
							type: "spline",
							id: "stock_chart",

							data: res.data,
							lineWidth: 2,
							tooltip: {
								valueDecimals: 2,
							},
						},
					],
				});
			});
	}, []);

	return (
		<HighchartsReact
			constructorType={"stockChart"}
			highcharts={Highcharts}
			options={options}
			ref={chartComponentRef}
		/>
	);
}
