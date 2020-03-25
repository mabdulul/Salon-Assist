import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const Comment = props => {
	console.log("This props", props);
	let user_id = localStorage.personid;
	let apptid = props.appt;
	const { register, handleSubmit, watch } = useForm();

	const commentSubmit = async (data, e) => {
		data.user_id = user_id;
		data.apptid = apptid;
		e.preventDefault();

		const response = await fetch("http://localhost:3080/appt/addComment", {
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
			<form onSubmit={handleSubmit(commentSubmit)}>
				<div className="QuizForm__label">
					<textarea
						className="hairRoutine-textbox"
						name="usercomment"
						ref={register}
					></textarea>
				</div>
				<button type="submit">Add Comment</button>
			</form>
		</>
	);
};

export default Comment;
