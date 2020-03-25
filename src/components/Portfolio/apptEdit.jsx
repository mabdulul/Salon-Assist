import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import Comment from "./addComment";
const ApptEdit = () => {
	let user_id = localStorage.personid;
	const { register, handleSubmit, watch } = useForm();
	const [notavailable, setnotavailable] = useState([]);
	const [startDate, setStartDate] = useState(new Date());
	let { apptid } = useParams();
	console.log(apptid);
	useEffect(() => {});
	const checkStylistTime = async event => {
		console.log("this data", event.target.value);
		const getTimeResponse = await fetch(
			`http://localhost:3080/appt/check/${event.target.value}`
		);
		const timeRes = await getTimeResponse.json();
		console.log(timeRes);
		const getAllDates = timeRes.map(time => new Date(`${time.date_of}`));
		console.log(getAllDates);
		setnotavailable(getAllDates);
	};
	const stylistTime = watch("stylist_id");

	const onSubmit = async (data, e) => {
		data.apptid = apptid;
		data.user_id = user_id;
		console.log(data);
		console.log("I am running");
		const response = await fetch(`http://localhost:3080/appt/updateAppt`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});

		console.log(response);
	};
	return (
		<>
			<div className="container-fluid apptContainer">
				<form
					className="apptContainer--forwardground"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="row">
						<div className="col-sm-12 col-md-12 appt_col">
							<h2>Update your appt</h2>
							<div className="appt_selectedOnly">
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
								<label class="appt_selectedBoxes">
									<div className="">
										<select
											ref={register}
											name="stylist_id"
											onChange={checkStylistTime}
											className="appt-marginTop"
											required
										>
											<option defaultValue value="">
												Stylist
											</option>
											<option value="1">Rahma Inman</option>
											<option value="2">Sarah Hill</option>
											<option value="3">Jess Garcia</option>
										</select>
									</div>
								</label>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-12 col-md-12 appt_col">
							{!!stylistTime ? (
								<label className="appt-marginTop">
									<div className="">
										<DatePicker
											selected={startDate}
											onChange={date => setStartDate(date)}
											showTimeSelect
											excludeTimes={notavailable}
											timeIntervals={60}
											minTime={new Date("02-05-2020 12:00:00 GMT-0500")}
											maxTime={new Date("02-20-2020 21:00:00 GMT-0500")}
											dateFormat="MMMM d, yyyy h:mm aa"
											required
										/>
									</div>
								</label>
							) : (
								" "
							)}
						</div>
					</div>
					<div className="row">
						<div className="col-sm-12 col-md-12 appt_col">
							<button className="appt_button" type="submit">
								Update
							</button>
						</div>
					</div>
				</form>
			</div>
			<Comment appt={apptid}></Comment>
		</>
	);
};

export default ApptEdit;
