import React, { useContext } from "react";
import { SessionContextAppt } from "../../context/apptContext";
import { GuestSessionContextAppt } from "../../context/GuestContext";
import { useForm } from "react-hook-form";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

const ConfirmationTwo = () => {
	const { service, stylist_id, date } = useContext(SessionContextAppt);
	const { firstName, lastName, emailguest, PhoneNumber } = useContext(
		GuestSessionContextAppt
	);

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
		<div>
			<button onClick={onSubmit} type="submit">
				Please Confirm
			</button>
		</div>
	);
};

export default ConfirmationTwo;
