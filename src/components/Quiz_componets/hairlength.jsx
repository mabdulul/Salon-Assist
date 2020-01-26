import React, { useState } from "react";
import { useForm } from "react-hook-form";

//StyleSheet
import "../../Stylesheets/Quiz/quizStyles.css";

const Hairlength = ({ history }) => {
	const { register, handleSubmit } = useForm();
	const [errorMsg, setMsg] = useState("");
	let user_id = localStorage.personid;
	const onSubmit = async (data, e) => {
		e.preventDefault();
		console.log(data);
		const length_hair = data.length_hair;
		console.log("here", length_hair);
		data.user_id = user_id;

		if (!length_hair) {
			setMsg("Please select an answer.");
			// console.log("Please try again");
		} else {
			const response = await fetch(
				"http://localhost:3080/hair/form/length_hair",
				{
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json"
					},
					body: JSON.stringify(data)
				}
			);
			console.log(response);
			history.push("/coloredhair");
		}
	};
	const BacktoHairStructure = () => {
		history.push("/hairStruture");
	};

	return (
		<>
			<div className="container">
				<div className="row">
					<form
						className="QuizForm col-sm-12 col-md-8 col-lg-8"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="col-sm-12 col-md-12 col-lg-12">
							<div className="QuizForm-progressbar ">
								<span className="QuizForm-start">START</span>
								<span className="QuizForm_breadcrumbs "></span>
								<span className="QuizForm_breadcrumbs "></span>
								<span className="QuizForm_breadcrumbs is-active"></span>
								<span className="QuizForm_breadcrumbs"></span>
								<span className="QuizForm_breadcrumbs"></span>
								<span className="QuizForm_breadcrumbs-line"></span>
								<span className="QuizForm_end">END</span>
							</div>
							<div className="QuizForm-header">
								<p className="errorMsg">{errorMsg}</p>
								<h4>How long is your hair?</h4>
							</div>
							<div className="QuizForm__label">
								<label>
									<input
										type="radio"
										name="length_hair"
										value="pixie"
										ref={register}
									/>
									<div className="QuizForm-bgBlock__selecttext">
										<p>Pixie</p>
									</div>
								</label>
								<label>
									<input
										type="radio"
										name="length_hair"
										value="short"
										ref={register}
										className="img-fluid"
									/>
									<div className="QuizForm-bgBlock__selecttext">
										<p>Short</p>
									</div>
								</label>
								<label>
									<input
										type="radio"
										name="length_hair"
										value="shoulderlength "
										ref={register}
										className="img-fluid"
									/>
									<div className="QuizForm-bgBlock__selecttext">
										<p>Sholder Length</p>
									</div>
								</label>
								<label>
									<input
										type="radio"
										name="length_hair"
										value="long"
										ref={register}
										className="img-fluid"
									/>
									<div className="QuizForm-bgBlock__selecttext">
										<p>Long</p>
									</div>
								</label>
							</div>
						</div>
						<div className="QuizForm__btnBlock col-sm-12 col-md-12 col-lg-12">
							<button className="QuizForm__btn" onClick={BacktoHairStructure}>
								← Back
							</button>
							<button className="QuizForm__btn" type="submit">
								Next →
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Hairlength;
