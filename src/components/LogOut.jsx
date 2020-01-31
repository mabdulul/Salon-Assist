import React, { Component } from "react";
import { SessionContext } from "../context/SessionContext";
import "../Stylesheets/LogOut.css";
import "../Stylesheets/global.css";
import { Redirect } from "react-router-dom";

class LogOut extends Component {
	state = {
		change: false
	};
	static contextType = SessionContext;
	logOut = async e => {
		e.preventDefault();

		const response = await fetch("http://localhost:3080/users/logout", {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			}
		});
		this.setState({
			change: true
		});
		console.log(response);
		this.context.loggedOut();
		localStorage.clear();
	};
	render() {
		if (this.state.change === true) {
			return <Redirect to="/login" />;
		}
		return (
			<li>
				<button className="logOut" onClick={this.logOut}>
					LogOut
				</button>
			</li>
		);
	}
}

export default LogOut;
