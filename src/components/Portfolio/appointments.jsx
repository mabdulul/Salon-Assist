import React from "react";
import { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import moment from "moment";

const DashAppt = () => {
	const { control, register, handleSubmit } = useForm();
	const [pastAppt, setpastAppt] = useState([]);
	const [futureAppt, setfutureAppt] = useState([]);

	const { fields } = useFieldArray({
		control,
		name: "service"
	});

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

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

	const onSubmit = async (data, e) => {
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
			<div className="container">
				<form
					className="QuizForm col-sm-12 col-md-8 col-lg-8"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div>
						<label class="appt_selectedBoxes">
							<label class="appt_selectedBoxes">
								<div className="">
									<select ref={register} name="service" className="" required>
										<option value="">Service</option>
										<option value="Balayage/Ombre">Balayage/Ombre</option>
										<option value="Master Designer">Master Designer</option>
										<option value="Shampoo/BlowDry">Shampoo/Blow Dry</option>
										<option value="Keratin Treatment">KeratinTreatment</option>
									</select>
								</div>
							</label>
						</label>
						<button className="QuizForm__btn" type="submit">
							Save →
						</button>
					</div>
				</form>
				<div className="row">
					{futureAppt.map(future => (
						<>
							<ul>
								<li key={future.apptid}>{future.service}</li>
								<li>
									{future.firstname} {future.lastname}
								</li>
								<li>{future.date_of}</li>
							</ul>
							<Button variant="primary" onClick={handleShow}>
								Launch demo modal
							</Button>
							<Modal show={show} onHide={handleClose}>
								<Modal.Header closeButton>
									<Modal.Title>Modal heading</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<form
										className="QuizForm col-sm-12 col-md-8 col-lg-8"
										onSubmit={handleSubmit(onSubmit)}
									>
										<div>
											<label class="appt_selectedBoxes">
												<label class="appt_selectedBoxes">
													{fields.map((field, index) => (
														<div key={field.id} className="">
															<select
																className=""
																required
																name={`service[${index}]`}
																ref={register}
															>
																<option value="">Service</option>
																<option value="Balayage/Ombre">
																	Balayage/Ombre
																</option>
																<option value="Master Designer">
																	Master Designer
																</option>
																<option value="Shampoo/BlowDry">
																	Shampoo/Blow Dry
																</option>
																<option value="Keratin Treatment">
																	KeratinTreatment
																</option>
															</select>
														</div>
													))}
												</label>
											</label>
											<button className="QuizForm__btn" type="submit">
												Save →
											</button>
										</div>
									</form>
								</Modal.Body>
								<Modal.Footer>
									<Button variant="secondary" onClick={handleClose}>
										Close
									</Button>

									<Button variant="primary" onClick={handleClose}>
										Save Changes
									</Button>
								</Modal.Footer>
							</Modal>
						</>
					))}

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
