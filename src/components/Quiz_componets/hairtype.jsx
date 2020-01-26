import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
//Images
import straight from "../../Stylesheets/Quiz/Images/straight.svg";
import wavy from "../../Stylesheets/Quiz/Images/wavy.svg";
import curly from "../../Stylesheets/Quiz/Images/curly.svg";

//StyleSheet
import "../../Stylesheets/Quiz/quizStyles.css";

const HairType = ({ history }) => {
	const { register, handleSubmit } = useForm();
	const [errorMsg, setMsg] = useState("");
	let user_id = localStorage.personid;

	useEffect(() => {
		const id = localStorage.getItem("personid");
	}, []);
	const onSubmit = async (data, e) => {
		e.preventDefault();
		data.user_id = user_id;
		console.log(data);
		const hairtype = data.hairtype;

		if (!hairtype) {
			setMsg("Please select an answer.");
			// console.log("Please try again");
		} else {
			const response = await fetch("http://localhost:3080/hair/form/hairtype", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			});
			console.log(response);
			history.push("/hairStruture");
		}
	};
	return (
		<>
			<section className="container">
				<div className="row">
					<form
						className="QuizForm col-sm-12 col-md-8 col-lg-8"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="col-sm-12 col-md-12 col-lg-12">
							<div className="QuizForm-progressbar ">
								<span className="QuizForm-start">START</span>
								<span className="QuizForm_breadcrumbs is-active "></span>
								<span className="QuizForm_breadcrumbs "></span>
								<span className="QuizForm_breadcrumbs"></span>
								<span className="QuizForm_breadcrumbs"></span>
								<span className="QuizForm_breadcrumbs"></span>
								<span className="QuizForm_breadcrumbs-line"></span>
								<span className="QuizForm_end">END</span>
							</div>
							<div className="QuizForm-header">
								<p className="errorMsg">{errorMsg}</p>
								<h4>What is your hair type?</h4>
							</div>
							<div className="QuizForm__label">
								<label>
									<input
										type="radio"
										name="hairtype"
										value="straight"
										ref={register}
									/>
									<div className="QuizForm-bgBlock">
										<img className="img-fluid" src={straight} alt="straight" />
									</div>
									<p>straight</p>
								</label>
								<label>
									<input
										type="radio"
										name="hairtype"
										value="wavy"
										ref={register}
									/>
									<div className="QuizForm-bgBlock">
										<img src={wavy} className="img-fluid" alt="wavy" />
									</div>
									<p>wavy</p>
								</label>
								<label>
									<input
										type="radio"
										name="hairtype"
										value="curly"
										className="img-fluid"
										ref={register}
									/>
									<div className="QuizForm-bgBlock">
										<img src={curly} className="img-fluid" alt="curly" />
									</div>
									<p>curly</p>
								</label>
							</div>
						</div>
						<div className="QuizForm__btnBlock QuizForm__btn--single col-sm-12 col-md-12 col-lg-12">
							<button className="QuizForm__btn " type="submit">
								Next →
							</button>
						</div>
					</form>
				</div>
			</section>
		</>
	);
};

export default HairType;
