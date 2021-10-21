import { makeStyles } from "@material-ui/core";
import { Paper, Box, Grid } from "@material-ui/core";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ErrorIcon from "@mui/icons-material/Error";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";

// import fetch from "node-fetch";
import apis from "../constants/apis.json";
import { width } from "@material-ui/system";
import { bottom } from "@popperjs/core";

const response = [
	{
		id: 1,
		title: "Available Services",
		status: true,
	},
	{
		id: 2,
		title: "Down Services",
		status: false,
	},
];

const useStyles = makeStyles(() => ({
	firstBlock: {
		fontSize: "2rem",
		fontWeight: "bold",
	},
	box: {
		padding: "2rem",
		flexGrow: 1,
	},
	container: {
		padding: "3rem",
		color: "#eee",
	},
	titleContainer: {
		height: "10rem",
		padding: "3rem",
		fontSize: "1.4rem",
	},
	services: {
		fontSize: "4rem",
		color: "#eee",
	},
	statusContainer: {
		position: "relative",
	},
	endpoints: {
		padding: "1rem",
		color: "#111",
	},
	endpointUrls: {
		fontSize: "2rem",
		textAlign: "left",
	},
	white: {
		color: "#eee",
	},
	iconContainer: {
		position: "absolute",
		top: "-1rem",
		left: "2rem",
		padding: ".5rem",
	},
}));

const currentDateTime = () => {
	let dateObj = new Date();
	return (
		dateObj.getDate() +
		"/" +
		(dateObj.getMonth() + 1) +
		"/" +
		dateObj.getFullYear() +
		" @ " +
		dateObj.getHours() +
		":" +
		dateObj.getMinutes() +
		":" +
		dateObj.getSeconds()
	);
};

export default function DashboardGrid() {
	const [results, setResults] = useState([] as any);
	console.log(results);
	const endPoints = (arr: Array<any>) => {
		const arrayResponse = arr.map(async (response) => {
			return {
				url: apis.map((api, i) => {
					if (api.id === i + 1) {
						return api.name;
					}
					return "";
				}),
				status: response.status === 200 ? "UP" : "DOWN",
			};
		});
		return Promise.all(arrayResponse);
	};
	// let endPoints: Array<any> = [];
	useEffect(() => {
		async function fetchAPIResponse(apis: Array<any>) {
			try {
				const apiResponses = apis.map((api) => {
					return fetch(api.url, { method: "GET" });
				});
				const apiResponseFulfilled = await Promise.all(apiResponses);
				const response = await endPoints(apiResponseFulfilled);
				setResults([...response]);
			} catch (error) {
				console.log(error.message || "Problem while making api call!");
			}
		}
		fetchAPIResponse(apis);
	}, []);
	const classes = useStyles();
	let DashUp: Array<any> = [];
	DashUp.push({
		title: "Running Services",
		value: results.filter((upStatus: any) => upStatus.status === "UP").length,
	});
	let DashDown: Array<any> = [];
	DashDown.push({
		title: "Running Services",
		value: results.filter((upStatus: any) => upStatus.status === "DOWN").length,
	});
	// if (DashDown.length === 0) {
	// 	setDashboardStatus("All Operational");
	// } else if (DashDown.length > 0 && DashDown.length < results.length) {
	// 	setDashboardStatus("Partially Down");
	// } else {
	// 	setDashboardStatus("All Down");
	// }

	const firstBlock = () => {
		if (DashDown.length === 0) {
			return (
				<>
					<Paper className={classes.iconContainer}>
						<CheckCircleIcon color={"success"} sx={{ fontSize: "3rem" }} />
					</Paper>
					<Paper
						className={classes.titleContainer}
						style={{
							background: "#66bb6a",
						}}>
						<span className={classes.firstBlock}>All Up and Running</span>
					</Paper>
				</>
			);
		} else if (DashDown.length > 0 && DashDown.length < results.length) {
			return (
				<>
					<Paper className={classes.iconContainer}>
						<ErrorIcon color={"warning"} sx={{ fontSize: "3rem" }} />
					</Paper>
					<Paper
						className={classes.titleContainer}
						style={{
							background: "#ecb857",
						}}>
						<span className={classes.firstBlock}>Partially Up</span>
					</Paper>
				</>
			);
		} else {
			return (
				<>
					<Paper className={classes.iconContainer}>
						<CancelIcon color={"error"} sx={{ fontSize: "3rem" }} />
					</Paper>
					<Paper
						className={classes.titleContainer}
						style={{
							background: "#ef5350",
						}}>
						<span className={classes.firstBlock}>All Down</span>
					</Paper>
				</>
			);
		}
	};
	if (results.length !== 0) {
		return (
			<Box className={classes.box}>
				<Grid container spacing={4} className={classes.box}>
					{/* <Grid item xs={12}>
					<Paper className={classes.box}>
						<h1>Latest Status as per {currentDateTime()}</h1>
					</Paper>
				</Grid> */}
					{/* Top Status Bar, */}
					<Grid item xs={12} md={4} className={classes.statusContainer}>
						{firstBlock()}
					</Grid>
					{response.map((item, i) => (
						<Grid
							item
							xs={12}
							md={4}
							className={classes.statusContainer}
							key={i}>
							<Paper className={classes.iconContainer}>
								{i === 0 ? (
									<CheckCircleIcon
										color={"success"}
										sx={{ fontSize: "3rem" }}
									/>
								) : (
									<CancelIcon color={"error"} sx={{ fontSize: "3rem" }} />
								)}
							</Paper>
							<Paper
								className={classes.titleContainer}
								style={{
									background: `${item.status ? "#66bb6a" : "#ef5350"}`,
									textAlign: "right",
								}}>
								<span>{item.title}</span>
								<br />
								<span className={classes.services}>
									{i === 0 ? `${DashUp[0].value}` : `${DashDown[0].value}`}
								</span>
							</Paper>
						</Grid>
					))}
				</Grid>
				<Grid container spacing={3} className={classes.box}>
					{results.map((result: any, i: any) => (
						<>
							<Grid item xs={10} md={4}>
								<Paper className={classes.endpoints} elevation={0}>
									<pre className={classes.endpointUrls}>{result.url[i]}</pre>
								</Paper>
							</Grid>
							<Grid item xs={2} md={2}>
								<Paper
									className={classes.endpoints}
									elevation={0}
									style={{
										background: `${
											result.status === "UP" ? "#66bb6a" : "#ef5350"
										}`,
									}}>
									<h1 className={classes.white}>{result.status}</h1>
								</Paper>
							</Grid>
						</>
					))}
				</Grid>
			</Box>
		);
	} else {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					minHeight: "100vh",
					width: "100%",
				}}>
				<Loading />
			</div>
		);
	}
}
