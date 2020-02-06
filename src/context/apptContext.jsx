import React, { Component, createContext } from "react";
export const SessionContextAppt = createContext();

class ApptSessionContextProvider extends Component {
	state = {
		service: " ",
		stylist_id: " ",
		date: " "
	};
	setAppt = (service, stylist_id, date) => {
		this.setState({
			service: service,
			stylist_id: stylist_id,
			date: date
		});
	};
	render() {
		return (
			<SessionContextAppt.Provider
				value={{
					...this.state,
					setAppt: this.setAppt
				}}
			>
				{this.props.children}
			</SessionContextAppt.Provider>
		);
	}
}

export default ApptSessionContextProvider;
