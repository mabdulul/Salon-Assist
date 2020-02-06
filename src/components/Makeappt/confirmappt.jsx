import React, { useState, useEffect, useContext } from "react";
import { SessionContext } from "../../context/SessionContext";
import { useForm } from "react-hook-form";

const Confirmation = () => {
	const { is_logged_in, loggedIn } = useContext(SessionContext);
	const { register, handleSubmit } = useForm();

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

		if (reply.status !== 200) {
			loggedIn(false);
			console.log(this.context);
		}
	};

	return (
		<div>
			{is_logged_in ? (
				<h1>Please confirm you app </h1>
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
					<h1>Enter your contact deatils ?</h1>
				</>
			)}
		</div>
	);
};

export default Confirmation;
