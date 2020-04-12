import React from "react";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import moment from "moment";
import Moment from "react-moment";

const DashAppt = () => {
	const [pastAppt, setpastAppt] = useState([]);
	const [futureAppt, setfutureAppt] = useState([]);

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
		<div className="container-fluid DashBoard">
			<div className="row">
				<div className="col-sm-12 col-md-12 col-lg-12">
					<div className="DashBoard_HeaderText">
						<h1 className="DashBoard__Nav">Appointments</h1>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-12 col-md-12 col-lg-12 tableBox">
					<h5>Upcoming Appointments </h5>
					<table class="table tableAppt">
						<thead>
							<tr className="tableAppt_tr">
								<th className="tableAppt_th" scope="col">
									Service Type
								</th>
								<th className="tableAppt_th" scope="col">
									Stylist
								</th>

								<th className="tableAppt_th" scope="col">
									Service
								</th>
							</tr>
						</thead>
						<tbody>
							{futureAppt.map(future => (
								<>
									<tr className="tableAppt_tr" key={future.apptid}>
										<td className="tableAppt_td">{future.service}</td>
										<td className="tableAppt_td">
											{future.firstname} {future.lastname}
										</td>
										<td className="tableAppt_td">
											<Moment format="YYYY-MM-DD  @h:mm A">
												{future.date_of}
											</Moment>
										</td>
										<td className="tableAppt_td">
											<button className="appt_button">
												{" "}
												<Link to={`/appt/${future.apptid}`}>Edit</Link>
											</button>
										</td>
									</tr>
								</>
							))}
							<h5>Past Appointments </h5>
							{pastAppt.map(past => (
								<>
									<tr className="tableAppt_tr" key={past.apptid}>
										<td className="tableAppt_td">{past.service}</td>
										<td className="tableAppt_td">
											{past.firstname} {past.lastname}
										</td>
										<td className="tableAppt_td">
											<Moment format="YYYY-MM-DD  @h:mm A">
												{past.date_of}
											</Moment>
										</td>
									</tr>
								</>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default DashAppt;
