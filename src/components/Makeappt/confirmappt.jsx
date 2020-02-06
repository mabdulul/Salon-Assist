import React, { useContext } from "react";
import { SessionContext } from "../../context/SessionContext";
import { SessionContextAppt } from "../../context/apptContext";
import { useForm } from "react-hook-form";

const Confirmation = ({ history }) => {
	let user_id = localStorage.personid;
	const { is_logged_in, loggedIn } = useContext(SessionContext);
	const { service, stylist_id, date } = useContext(SessionContextAppt);

	console.log(service, stylist_id, date);
	const { register, handleSubmit } = useForm();

	const onSubmitGuest = async (data, e) => {
		data.service = service;
		data.stylist_id = stylist_id;
		data.date = date;
		console.log(data);
		const response = await fetch("http://localhost:3080/appt/guestappts", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});
		const reply = await response;
	};

	const onSubmit = async (data, e) => {
		e.preventDefault();

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
		}
		history.push("/confirmationTwo");

		if (reply.status !== 200) {
			loggedIn(false);
			console.log(this.context);
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
	};

	return (
		<div>
			{is_logged_in ? (
				<h1>
					Please confirm you app
					<button onClick={confirmAppt} type="submit">
						Please Confirm
					</button>
				</h1>
			) : (
				<>
					<h1>Already have an account ?</h1>
					<form onSubmit={handleSubmit(onSubmit)}>
						<label>
							<input
								className="login-input"
								type="text"
								name="email"
								ref={register}
								placeholder="Your email"
								required
							/>
						</label>
						<label>
							<input
								className="login-input"
								id="Password"
								type="password"
								name="password"
								ref={register}
								placeholder="Password"
								required
							/>
						</label>
						<button className="QuizForm__btn" type="submit">
							Sigin In
						</button>
					</form>
					Enter your contact deatils ?
					<form onSubmit={handleSubmit(onSubmitGuest)}>
						<label>
							<input
								className="firstName"
								type="text"
								name="firstName"
								ref={register}
								placeholder="First Name"
								required
							/>
						</label>
						<label>
							<input
								className="LastName"
								type="text"
								name="lastName"
								ref={register}
								placeholder="Last Name"
								required
							/>
						</label>
						<input
							className="login-input"
							type="text"
							name="emailguest"
							ref={register}
							placeholder="Your email"
							required
						/>
						<label>
							<input
								className="login-input"
								type="text"
								name="PhoneNumber"
								ref={register}
								placeholder="Phone Number"
								required
							/>
						</label>
						<button className="QuizForm__btn" type="submit">
							Confirm
						</button>
					</form>
				</>
			)}
		</div>
	);
};

export default Confirmation;
