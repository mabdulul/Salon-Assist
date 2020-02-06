import React, { useContext } from "react";
import { SessionContextAppt } from "../../context/apptContext";
import { useForm } from "react-hook-form";

const ConfirmationTwo = () => {
	let user_id = localStorage.personid;
	const { service, stylist_id, date } = useContext(SessionContextAppt);

	console.log(service, stylist_id, date);

	const onSubmit = async (data, e) => {
		data.user_id = user_id;
		data.service = service;
		data.stylist_id = stylist_id;
		data.date = data;
		e.preventDefault();
		const responsethis = await fetch("http://localhost:3080/appt/appts", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});
		console.log(responsethis);
	};

	return (
		<div>
			<button onSubmit={onSubmit} type="submit">
				Please Confirm
			</button>
		</div>
	);
};

export default ConfirmationTwo;
