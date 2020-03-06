import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Portfolio from "./portfolio";
import React from "react";
const DashBoard = () => {
	return (
		<Router>
			<div>
				<ul>
					<li>
						<Link to="/portfolio">Portfolio</Link>
					</li>
					<li>
						<Link to="">Appointments</Link>
					</li>
				</ul>
			</div>
			<Route path="/portfolio" exact component={Portfolio} />
		</Router>
	);
};

export default DashBoard;
