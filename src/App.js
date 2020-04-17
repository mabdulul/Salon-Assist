import React, { Component } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import Login from "./components/Login";
import signup from "./components/signup";
import LogOut from "./components/LogOut";

//Home Page
import HomePage from "./components/home";

// Quiz Components
import HairType from "./components/Quiz_componets/hairtype";
import HairStructure from "./components/Quiz_componets/hairstructure";
import HairLength from "./components/Quiz_componets/hairlength";
import Coloredhair from "./components/Quiz_componets/coloredHair";
import HairProfile from "./components/Quiz_componets/hairprofile";
import HairRoutine from "./components/Quiz_componets/hairroutine";

//Make Appts
import BookingOne from "./components/Makeappt/bookingone";
import Confirmation from "./components/Makeappt/confirmappt";
import ConfirmationTwo from "./components/Makeappt/confirmTwo";
import ApptSessionContextProvider from "./context/apptContext";
import GuestSessionContextAppt from "./context/GuestContext";
import ConfirmationFinal from "./components/Makeappt/confrimFinal";

//DashBoard
import DashBoard from "./components/Portfolio/dashboard";
import DashAppt from "./components/Portfolio/appointments";
import ApptEdit from "./components/Portfolio/apptEdit";
import Portfolio from "./components/Portfolio/portfolio";

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
					<nav className="navbar navbar-expand-lg   nav  ">
						<Link className="navbar-brand navbar-color" to="/">
							<h2 className="nav_logo">debonaire</h2>
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
								{is_logged_in ? (
									<>
										<Link className="nav-item nav-link navset " to="/">
											Home
										</Link>
										<Link className="nav-item nav-link navset " to="">
											<LogOut />
										</Link>
										<div className="dropdown">
											<button
												className="btn btn-secondary dropdown-toggle"
												type="button"
												id="dropdownMenuButton"
												data-toggle="dropdown"
												aria-haspopup="true"
												aria-expanded="false"
											>
												User
											</button>
											<div
												className="dropdown-menu"
												aria-labelledby="dropdownMenuButton"
											>
												<Link className="dropdown-item" to="/portfolio">
													Portfolio
												</Link>
												<Link className="dropdown-item" to="/dashAppt">
													Appointments
												</Link>
											</div>
										</div>
									</>
								) : (
									<>
										<Link className="nav-item nav-link navset" to="/signup">
											Sign Up
										</Link>

										<Link className="nav-item nav-link navset " to="/login">
											Login
										</Link>
									</>
								)}
								<Link
									className="nav-item nav-link navset nav_booking "
									to="/bookingone"
								>
									Book an Appointment
								</Link>
							</div>
						</div>
					</nav>
					<Route path="/" exact component={HomePage} />
					<Route path="/login" exact component={Login} />
					<Route path="/signup" exact component={signup} />
					<Route path="/hairQuiz" exact component={HairType} />
					<Route path="/hairStruture" exact component={HairStructure} />
					<Route path="/hairLength" exact component={HairLength} />
					<Route path="/coloredhair" exact component={Coloredhair} />
					<Route path="/hairroutine" exact component={HairRoutine} />
					<Route path="/hairprofile" exact component={HairProfile} />
					<Route path="/dashBoard" exact component={DashBoard} />

					<GuestSessionContextAppt>
						<ApptSessionContextProvider>
							<Route path="/confirmation" exact component={Confirmation} />
							<Route path="/bookingone" exact component={BookingOne} />
							<Route
								path="/confirmationTwo"
								exact
								component={ConfirmationTwo}
							/>
						</ApptSessionContextProvider>
					</GuestSessionContextAppt>
					<Route path="/final" exact component={ConfirmationFinal} />

					<Route path="/logOut " exact component={LogOut} />

					<Route path="/portfolio" exact component={Portfolio} />
					<Route path="/dashAppt" exact component={DashAppt} />
					<Route path="/upDateAppt" exact component={DashAppt} />

					<Route path="/appt/:apptid?" component={ApptEdit}></Route>
				</Router>
			</div>
		);
	}
}

export default App;
