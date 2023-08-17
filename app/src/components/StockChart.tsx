import React, { useState, useRef, useEffect } from "react";
import * as Highcharts from "highcharts/highstock";
import highchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useTheme } from "@chakra-ui/react";
// import { useColorMode } from "@chakra-ui/react";

const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

export default function StockChart(props: { symbol: string }) {
	const location = useLocation();
	// const { colorMode } = useColorMode();

	const accentColor =
		useTheme()["components"]["Link"]["baseStyle"]["color"].split(".")[0];
	const chartAccentColor = "var(--chakra-colors-" + accentColor + "-500)";

	const [options, setOptions] = useState<Highcharts.Options>({
		rangeSelector: {
			selected: 1,
			inputStyle: {
				color: chartAccentColor,
				fontWeight: "bold",
			},
		},
		colors: [chartAccentColor],
		title: {
			text: "",
		},
		yAxis: [
			{
				height: "75%",
				labels: {
					formatter: (point: any) => formatter.format(point.value as number),
					x: -5,
					align: "left",
				},
				title: {
					text: " ",
				},
			},
		],
		plotOptions: {
			series: {
				showInNavigator: true,
				gapSize: 6,
			},
		},
		chart: {
			height: 600,
			borderRadius: 10,
			// backgroundColor: "transparent",

			style: {
				fontFamily: "'Manrope Variable', sans-serif",
				fontWeight: "600",
				color: "red",
			},
		},
		credits: {
			enabled: false,
		},
		xAxis: {
			type: "datetime",
		},
		navigator: {
			maskFill: "rgb(49, 130, 206, 0.25)",
			series: {
				color: chartAccentColor,
				fillOpacity: 0.1,
				lineWidth: 2,
			},
		},
	} as any);

	const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

	highchartsAccessibility(Highcharts);

	// useEffect(() => {
	// 	options.chart!.style!.color = colorMode === "light" ? "black" : "white";
	// 	chartComponentRef.current?.chart?.update(options);
	// 	console.log("updates");
	// }, [colorMode]);

	useEffect(() => {
		axios.get(`/api/stocks/${props.symbol}/historical`).then((res) => {
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
	}, [location]);

	return (
		<HighchartsReact
			constructorType={"stockChart"}
			highcharts={Highcharts}
			options={options}
			ref={chartComponentRef}
		/>
	);
}
