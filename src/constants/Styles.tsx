import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
	firstBlock: {
		fontSize: "2rem",
		fontWeight: "bold",
	},
	box: {
		padding: "2rem",
		flexGrow: 1,
		margin: "0 0 1rem 0",
	},
	box2: {
		padding: "2rem",
		flexGrow: 1,
		background: "#ddd",
		marginTop: "2rem",
		position: "relative",
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
		height: "4rem",
	},
	endpointUrls: {
		fontSize: "2rem",
		textAlign: "left",
	},
	white: {
		color: "#eee",
		fontSize: "1.6rem",
	},
	iconContainer: {
		position: "absolute",
		top: "-1rem",
		left: "2rem",
		padding: ".5rem",
	},
}));

export { useStyles };
