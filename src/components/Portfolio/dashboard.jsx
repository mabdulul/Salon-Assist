import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Portfolio from "./portfolio";
import DashAppt from "./appointments";
import ApptEdit from "./apptEdit";
import React from "react";

import "../../Stylesheets/Dash/Prof.css";
const DashBoard = () => {
	return (
		<Router>
			<div>
				<ul className="DashBoard_Nav">
					<li>
						<Link to="/portfolio">Portfolio</Link>
					</li>
					<li>
						<Link to="/dashAppt">Appointments</Link>
					</li>
				</ul>
			</div>
			<Route path="/portfolio" exact component={Portfolio} />
			<Route path="/dashAppt" exact component={DashAppt} />
			<Route path="/upDateAppt" exact component={DashAppt} />

			<Route path="/appt/:apptid?" component={ApptEdit}></Route>
		</Router>
	);
};

export default DashBoard;
