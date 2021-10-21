import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useDrawerContext } from "../contexts/drawer-context";

const useStyles = makeStyles(() => ({
	appBar: {
		background: "#42a5f5",
		color: "#fff",
	},
	icon: {
		padding: "1rem",
	},
	title: {
		margin: "auto",
	},
}));

const Header = () => {
	const classes = useStyles();
	const { isOpened, toggleIsOpened } = useDrawerContext();
	return (
		<AppBar className={classes.appBar}>
			<Toolbar>
				<IconButton
					color='inherit'
					onClick={() => toggleIsOpened(!isOpened)}
					className={classes.icon}>
					{isOpened ? <ChevronLeftIcon /> : <MenuIcon />}
				</IconButton>
				<Typography variant='h6' className={classes.title}>
					Live Api Status,
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
