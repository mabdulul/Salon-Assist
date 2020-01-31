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
import HairProfile from "./components/Quiz_componets/hairprofile";
import HairRoutine from "./components/Quiz_componets/hairroutine";

import "./Stylesheets/Nav.css";
import "./Stylesheets/global.css";

import { SessionContext } from "./context/SessionContext";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
	static contextType = SessionContext;

	render() {
		const { is_logged_in } = this.context;

		return (
			<div className="App">
				<Router>
					<nav className="navbar navbar-expand-lg navbar-light  nav  ">
						<Link className="navbar-brand navbar-color">
							<h2>monroe's salon</h2>
						</Link>
						<button
							className="navbar-toggler"
							type="button"
							data-toggle="collapse"
							data-target="#navbarNavAltMarkup"
							aria-controls="navbarNavAltMarkup"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>
						<div
							className="collapse navbar-collapse navPlace "
							id="navbarNavAltMarkup"
						>
							<div className="navbar-nav">
								<Link className="nav-item nav-link navset ">About Us</Link>
								{is_logged_in ? (
									<>
										<Link className="nav-item nav-link navset " to="/">
											Home
										</Link>
										<a className="nav-item nav-link navset " href="#">
											{" "}
											<LogOut />
										</a>
									</>
								) : (
									<>
										<Link className="nav-item nav-link navset" to="/signup">
											Sign Up
										</Link>

										<Link className="nav-item nav-link navset " to="/login">
											Members Login
										</Link>
									</>
								)}
								<Link className="nav-item nav-link navset ">
									Book a Consolation
								</Link>
							</div>
						</div>
					</nav>
					<Route path="/login" exact component={Login} />
					<Route path="/signup" exact component={signup} />
					<Route path="/hairQuiz" exact component={HairType} />
					<Route path="/hairStruture" exact component={HairStructure} />
					<Route path="/hairLength" exact component={HairLength} />
					<Route path="/coloredhair" exact component={Coloredhair} />
					<Route path="/hairroutine" exact component={HairRoutine} />
					<Route path="/hairprofile" exact component={HairProfile} />
					<Route path="/logOut " exact component={LogOut} />
				</Router>
			</div>
		);
	}
}

export default App;
