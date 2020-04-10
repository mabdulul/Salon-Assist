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
			<div className="container-fluid DashBoard">
				<div className="row">
					<div className="col-sm-12 col-md-12 col-lg-12">
						<div className="DashBoard_HeaderText">
							<h1 className="DashBoard__Nav">Appointments</h1>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12 col-md-12 col-lg-12 ">
						<h2>Upcoming Appointments </h2>
						{futureAppt.map(future => (
							<>
								<div className="AppointmentsBox">
									<div key={future.apptid}>{future.service}</div>
									<div>
										{future.firstname} {future.lastname}
									</div>
									<div>{future.date_of}</div>
									<div>
										<Link to={`/appt/${future.apptid}`}>Edit</Link>
									</div>
								</div>
							</>
						))}
					</div>
				</div>

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
		</>
	);
};

export default DashAppt;
