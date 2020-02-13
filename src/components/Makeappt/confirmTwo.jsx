import React, { useContext } from "react";
import { SessionContextAppt } from "../../context/apptContext";
import { GuestSessionContextAppt } from "../../context/GuestContext";
import moment from "moment";

const ConfirmationTwo = () => {
	const { service, stylist_id, date } = useContext(SessionContextAppt);
	const { firstName, lastName, emailguest, PhoneNumber } = useContext(
		GuestSessionContextAppt
	);
	let day = moment(date);
	let converTime = day.format(" MMMM DD, YYYY");
	let timeofDay = day.format("h:mm");

	console.log(service, stylist_id, date);

	const onSubmit = async () => {
		//data.user_id = user_id;
		const userData = {};
		userData.service = service;
		userData.stylist_id = stylist_id;
		userData.date = date;
		userData.firstName = firstName;
		userData.lastName = lastName;
		userData.emailguest = emailguest;
		userData.PhoneNumber = PhoneNumber;

		console.log(userData);

		const responsethis = await fetch("http://localhost:3080/appt/guestappts", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(userData)
		});
		console.log(responsethis);
	};

	return (
		<div className="container-fluid apptTwo ">
			<div className="apptTwo__forwardground">
				<div className="row">
					<div className="col-sm-12 col-md-12 appt_col">
						<h2>PLEASE CONFIRM YOUR APPOINTMENT</h2>
						<div className="appt__confirm">
							<ul className="appt__confirm__deatils">
								<li>{converTime}</li>
								<li>
									{service} @ {timeofDay}
								</li>
							</ul>
						</div>
						<button onClick={onSubmit} type="submit">
							Request an Appointment
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationTwo;
