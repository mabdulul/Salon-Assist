import React, { Component } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import Login from "./components/Login";
import signup from "./components/signup";
import LogOut from "./components/LogOut";

// Quiz Components
import HairType from "./components/Quiz_componets/hairtype";
import HairStructure from "./components/Quiz_componets/hairstructure";
import HairLength from "./components/Quiz_componets/hairlength";
import Coloredhair from "./components/Quiz_componets/coloredHair";
import UploadUserPics from "./components/Quiz_componets/uploadPics";

import logo from "./images/logo5.png";

import "./Stylesheets/Nav.css";
import "./Stylesheets/global.css";

import { SessionContext } from "./context/SessionContext";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
	static contextType = SessionContext;

	render() {
		const { is_logged_in } = this.context;
		console.log(is_logged_in);

		return (
			<div className="App">
				<Router>
					<nav className="navbar navbar-toggleable-md navbar-light bg-faded">
						<ul>
							<li>
								<p className="nav-left">About Us</p>
							</li>
							{is_logged_in ? (
								<>
									<li>
										<Link to="/">Home</Link>
									</li>
									<LogOut />
								</>
							) : (
								<>
									<li>
										<Link to="/signup">Sign Up</Link>
									</li>
									<li>
										<Link to="/login">Members Login</Link>
									</li>
								</>
							)}
						</ul>
						<div className="logo">
							<img className="logo-dem" src={logo} alt="monroe's salon logo" />
						</div>
						<ul className="nav-two">
							<li className="nav-right">
								<p className="">Book a Consolation</p>
							</li>
						</ul>
					</nav>
					<Route path="/login" exact component={Login} />
					<Route path="/signup" exact component={signup} />
					<Route path="/hairQuiz" exact component={HairType} />
					<Route path="/hairStruture" exact component={HairStructure} />
					<Route path="/hairLength" exact component={HairLength} />
					<Route path="/coloredhair" exact component={Coloredhair} />
					<Route path="/uploadUserpics" exact component={UploadUserPics} />
				</Router>
			</div>
		);
	}
}

export default App;
