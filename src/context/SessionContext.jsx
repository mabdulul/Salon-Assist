import React, { Component, createContext } from "react";

export const SessionContext = createContext();

class SessionContextProvider extends Component {
	state = {
		is_logged_in: false,
		personid: " ",
		firstname: " ",
		lastname: " "
	};
	loggedIn = (loginvalue, personid, firstname, lastname) => {
		this.setState({
			is_logged_in: loginvalue,
			personid: personid,
			firstname: firstname,
			lastname: lastname
		});
	};

	loggedOut = () => {
		this.setState({
			is_logged_in: false,
			personid: " ",
			firstname: " ",
			lastname: " "
		});
	};
	componentDidMount = () => {
		const login = localStorage.getItem("is_logged");
		const id = localStorage.getItem("personid");
		const firstname = localStorage.getItem("firtname");
		const lastname = localStorage.getItem("lastname");
		console.log(login);

		this.setState({
			is_logged_in: login,
			personid: id,
			firstname: firstname,
			lastname: lastname
		});
	};

	render() {
		return (
			<SessionContext.Provider
				value={{
					...this.state,
					loggedIn: this.loggedIn,
					loggedOut: this.loggedOut
				}}
			>
				{this.props.children}
			</SessionContext.Provider>
		);
	}
}

export default SessionContextProvider;
