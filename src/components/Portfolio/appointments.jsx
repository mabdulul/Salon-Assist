import React from "react";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Link } from "react-router-dom";
import moment from "moment";
import Comment from "./addComment";

const DashAppt = () => {
	const { control, register, handleSubmit } = useForm();
	const [pastAppt, setpastAppt] = useState([]);
	const [futureAppt, setfutureAppt] = useState([]);

	const { fields } = useFieldArray({
		control,
		name: "service"
	});

	let user_id = localStorage.personid;
	let day = moment();
	let date = day.format("YYYY-MM-DD");

	useEffect(() => {
		getFuture();
		getPast();

		async function getPast() {
			const response = await fetch(
				`http://localhost:3080/appt/getApptPast/${user_id}/${date}`
			);
			console.log(response);
			const data = await response.json();
			setpastAppt(data);
			console.log("The past", data);
		}

		async function getFuture() {
			const response = await fetch(
				`http://localhost:3080/appt/getAppt/${user_id}/${date}`
			);

			const data = await response.json();
			setfutureAppt(data);
			console.log("The future", data);
		}
	}, [user_id, date]);

	return (
		<>
			<div className="container">
				<div className="row">
					{futureAppt.map(future => (
						<>
							<ul>
								<li key={future.apptid}>{future.service}</li>
								<li>
									{future.firstname} {future.lastname}
								</li>
								<li>{future.date_of}</li>
							</ul>
							<Link to={`/appt/${future.apptid}`}>Edit</Link>
						</>
					))}

					<ul>
						The past
						{pastAppt.map(past => (
							<>
								<li>{past.service}</li>
								<li>
									{past.firstname} {past.lastname}
								</li>
								<li>{past.date_of}</li>
							</>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default DashAppt;
