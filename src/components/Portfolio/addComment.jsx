import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const Comment = props => {
	console.log("This props", props);
	let user_id = localStorage.personid;
	let firstname = localStorage.firstname;
	let lastname = localStorage.lastname;
	const [usercomments, setComments] = useState([]);
	const [trigger, setTrigger] = useState();

	let apptid = props.appt;
	const { register, handleSubmit, reset } = useForm();

	useEffect(() => {
		getComments();

		async function getComments() {
			const response = await fetch(
				`http://localhost:3080/appt/getComments/${user_id}/${apptid}`
			);
			const data = await response.json();
			setComments(data);
		}
	}, [user_id, apptid, trigger]);

	const commentSubmit = async (data, e) => {
		console.log(data);
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
		setTrigger(response);
		e.target.reset();
	};
	const DeleteComm = async e => {
		const CommentDelete = parseInt(e.target.value);

		setComments(usercomments.filter(obj => obj.commentid !== CommentDelete));

		const data = {};
		data.commentid = CommentDelete;

		const response = await fetch("http://localhost:3080/appt/DeleteComment", {
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
			<div className="row">
				<div className="col-sm-12 col-md-12 col-lg-12 DashBoard_CommentArea">
					{usercomments.map(com => (
						<>
							<div key={com.commentid} className="DashBoard_CommentView">
								<div>
									{firstname}
									&nbsp;
									{lastname}: {com.usercomment}
								</div>
								<button
									value={com.commentid}
									className="Comm__btn"
									onClick={DeleteComm}
								>
									Delete
								</button>
							</div>
						</>
					))}
				</div>
			</div>
			<div className="row">
				<div className="col-sm-12 col-md-12 col-lg-12 DashBoard_Comment">
					<div className="DashBoard_Comment">
						<form
							onSubmit={handleSubmit(commentSubmit)}
							className="DashBoard_Comment_Form"
						>
							<label className="DashBoard_comm_label">Comments</label>
							<textarea
								name="usercomment"
								ref={register}
								rows="1"
								cols="50"
								onClick={() => reset()}
							></textarea>
							<button className="Comm__btn" type="submit">
								Add Comment
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Comment;
