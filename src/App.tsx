import { Redirect, Route, Switch } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import Layout from "./components/Layout";
import { DashboardPage } from "./pages";

function App() {
	return (
		<Layout>
			<Switch>
				<Route path='/' exact render={() => <Redirect to={ROUTES.main} />} />
				<Route exact path={ROUTES.main} component={DashboardPage} />
			</Switch>
		</Layout>
	);
}

export default App;
