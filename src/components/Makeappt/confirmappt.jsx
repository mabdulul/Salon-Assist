import React, { useContext, useState } from "react";
import { SessionContext } from "../../context/SessionContext";
import { SessionContextAppt } from "../../context/apptContext";
import { GuestSessionContextAppt } from "../../context/GuestContext";
import moment from "moment";
import { useForm } from "react-hook-form";

const Confirmation = ({ history }) => {
	let user_id = localStorage.personid;
	const { is_logged_in, loggedIn } = useContext(SessionContext);
	const { service, stylist_id, date } = useContext(SessionContextAppt);
	const { setGuest } = useContext(GuestSessionContextAppt);
	const [notLog, setnotLog] = useState("");

	let day = moment(date);
	let converTime = day.format(" MMMM DD, YYYY");
	let timeofDay = day.format("h:mm");

	console.log(service, stylist_id, date);
	const { register, handleSubmit } = useForm();

	const onSubmitGuest = async data => {
		setGuest(data.firstName, data.lastName, data.emailguest, data.PhoneNumber);
		history.push("/confirmationTwo");
	};

	const onSubmit = async (data, e) => {
		e.preventDefault();

		const notLog = "That is not a valid email address or password ";
		console.log(data);
		const response = await fetch("http://localhost:3080/users/login", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});
		const reply = await response;

		if (reply.status === 200) {
			const userData = await response.json();
			loggedIn(
				userData.isValid,
				userData.personid,
				userData.firstname,
				userData.lastname
			);
			localStorage.setItem("is_logged", userData.isValid);
			localStorage.setItem("personid", userData.personid);
			localStorage.setItem("firstname", userData.firstname);
			localStorage.setItem("lastname", userData.lastname);
			// history.push("/confirmationTwo");
		}

		if (reply.status !== 200) {
			loggedIn(false);
			setnotLog(notLog);
		}
	};

	const confirmAppt = async data => {
		const userdata = {};
		userdata.user_id = user_id;
		userdata.service = service;
		userdata.stylist_id = stylist_id;
		userdata.date = date;

		console.log("confirm app", userdata);

		const responsethis = await fetch("http://localhost:3080/appt/appts", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(userdata)
		});
		console.log(responsethis);
		history.push("/final");
	};

	return (
		<div className="container-fluid apptTwo ">
			<div className="apptTwo__forwardground">
				{is_logged_in ? (
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
							<button
								className="appt_button"
								onClick={confirmAppt}
								type="submit"
							>
								Request an Appointment
							</button>
						</div>
					</div>
				) : (
					<>
						<div className="row">
							<div className="col-sm-12 col-md-10 appt_col">
								<h2 className="apptTwo_h2">Already have an account ?</h2>

								<form
									onSubmit={handleSubmit(onSubmit)}
									className="apptTwo_form"
								>
									<label class="appt_inputBoxes appt_inputBoxes--right ">
										<input
											className=""
											type="text"
											name="email"
											ref={register}
											placeholder="Your email"
											required
										/>
									</label>
									<label class="appt_inputBoxes">
										<input
											className=""
											id="Password"
											type="password"
											name="password"
											ref={register}
											placeholder="Password"
											required
										/>
									</label>
									<div className="apptTwo__container">
										<span className="appt_error">{notLog}</span>
										<button className="appt_button" type="submit">
											Sigin In
										</button>
									</div>
								</form>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-12 col-md-10 appt_col">
								<h2 className="apptTwo_h2">Enter your contact details </h2>
								<form
									onSubmit={handleSubmit(onSubmitGuest)}
									className="apptTwo_form"
								>
									<label class="appt_inputBoxes appt_inputBoxes--right">
										<input
											className="firstName"
											type="text"
											name="firstName"
											ref={register}
											placeholder="First Name"
											required
										/>
									</label>
									<label class="appt_inputBoxes">
										<input
											className="LastName"
											type="text"
											name="lastName"
											ref={register}
											placeholder="Last Name"
											required
										/>
									</label>
									<label className="appt_inputBoxes  appt_inputBoxes--right">
										<input
											className=""
											type="text"
											name="emailguest"
											ref={register}
											placeholder="Your email"
											required
										/>
									</label>
									<label className="appt_inputBoxes">
										<input
											className=""
											type="text"
											name="PhoneNumber"
											ref={register}
											placeholder="Phone Number"
											required
										/>
									</label>
									<div className="apptTwo__container--single">
										<button className="appt_button" type="submit">
											Confirm
										</button>
									</div>
								</form>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Confirmation;
