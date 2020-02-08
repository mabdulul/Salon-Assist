import React, { Component, createContext } from "react";
export const GuestSessionContextAppt = createContext();

class GuestSessionContextProvider extends Component {
	state = {
		firstName: " ",
		lastName: " ",
		emailguest: " ",
		PhoneNumber: " "
	};
	setGuest = (firstName, lastName, emailguest, PhoneNumber) => {
		this.setState({
			firstName: firstName,
			lastName: lastName,
			emailguest: emailguest,
			PhoneNumber: PhoneNumber
		});
	};
	render() {
		return (
			<GuestSessionContextAppt.Provider
				value={{
					...this.state,
					setGuest: this.setGuest
				}}
			>
				{this.props.children}
			</GuestSessionContextAppt.Provider>
		);
	}
}

export default GuestSessionContextProvider;
