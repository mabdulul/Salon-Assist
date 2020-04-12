import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Comment from "./addComment";

const ApptEdit = () => {
	let user_id = localStorage.personid;
	const { register, handleSubmit, watch } = useForm();

	const [startDate, setStartDate] = useState(new Date());
	const [notavailable, setnotavailable] = useState([]);

	let { apptid } = useParams();

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
	const stylistTime = watch("stylist_id");
	return (
		<>
			<div className="container-fluid DashBoard">
				<div className="row ">
					<div className="col-sm-12 col-md-12 col-lg-12">
						<div className="DashBoard_HeaderText">
							<h1 className="DashBoard__Nav">Edit Appointment </h1>
						</div>
					</div>
				</div>
				<div className="row">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="col-sm-12 col-md-12 col-lg-12 DashBoard_divst">
							<div className="DashBoard_divstBox">
								<label className="DashBoard_divst_label">Service</label>
								<select ref={register} name="service">
									<option value="">Service</option>
									<option value="Balayage/Ombre">Balayage/Ombre</option>
									<option value="Master Designer">Master Designer</option>
									<option value="Shampoo/BlowDry">Shampoo/Blow Dry</option>
									<option value="Keratin Treatment">KeratinTreatment</option>
								</select>
							</div>
							<div className="DashBoard_divstBox">
								<label className="DashBoard_divst_label">Stylist</label>
								<select
									ref={register}
									name="stylist_id"
									onChange={checkStylistTime}
								>
									<option defaultValue value="">
										Stylist
									</option>
									<option value="1">Rahma Inman</option>
									<option value="2">Sarah Hill</option>
									<option value="3">Jess Garcia</option>
								</select>
							</div>
							<div className="DashBoard_divstBox  DashBoard_Fix appt_col">
								{!!stylistTime ? (
									<>
										<label className="DashBoard_divst_label">Time</label>
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
									</>
								) : (
									" "
								)}
							</div>
						</div>
						<div className="DashBoard_divstBox   DashBoard_button">
							<label className="DashBoard_divst_label"></label>
							<button type="submit">Update</button>
						</div>
					</form>
				</div>

				{/* <Comment appt={apptid}></Comment> */}
			</div>
		</>
	);
};

export default ApptEdit;
