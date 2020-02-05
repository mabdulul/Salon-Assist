import React, { useState } from "react";
import DatePicker from "react-datepicker";
import TimePicker from "react-bootstrap-time-picker";

class Time extends Component {
	state = {
		time: 0
	};
	handleTimeChange(time) {
		console.log(time); // <- prints "3600" if "01:00" is picked
		this.setState({ time });
	}
	render() {
		return (
			<TimePicker
				start="10:00"
				end="21:00"
				step={30}
				onChange={this.handleTimeChange}
				value={this.state.time}
			/>
		);
	}
}

export default Time;
