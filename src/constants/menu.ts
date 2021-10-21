import { DrawerItem } from "../ts";
import { ROUTES } from "./routes";
import DashboardIcon from "@material-ui/icons/Dashboard";

export const DRAWER_LIST: DrawerItem[] = [
	{
		route: ROUTES.main,
		literal: "Dashboard",
		Icon: DashboardIcon,
	},
];
