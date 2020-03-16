import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";

const DashAppt = () => {
	const [pastAppt, setpastAppt] = useState([]);
	const [futureAppt, setfutureAppt] = useState([]);
	const [formView, setformView] = useState(false);
	const { register, watch, handleSubmit } = useForm();
	console.log("Line 7", futureAppt);
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

	const ShowForm = () => {
		setformView(true);
	};

	return (
		<>
			<div className="container">
				<div className="row">
					<ul>
						{!formView ? (
							<>
								{futureAppt.map(future => (
									<>
										<li>{future.service}</li>
										<li>
											{future.firstname} {future.lastname}
										</li>
										<li>{future.date_of}</li>
									</>
								))}
							</>
						) : (
							<>
								<label class="appt_selectedBoxes">
									<div className="">
										<select ref={register} name="service" className="" required>
											<option value="">Service</option>
											<option value="Balayage/Ombre">Balayage/Ombre</option>
											<option value="Master Designer">Master Designer</option>
											<option value="Shampoo/BlowDry">Shampoo/Blow Dry</option>
											<option value="Keratin Treatment">
												KeratinTreatment
											</option>
										</select>
									</div>
								</label>
							</>
						)}
						<button onClick={ShowForm}>Edit Appointment</button>
					</ul>
					<ul>
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
