import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
//Images
import straight from "../../Stylesheets/Quiz/Images/straight.svg";
import wavy from "../../Stylesheets/Quiz/Images/wavy.svg";
import curly from "../../Stylesheets/Quiz/Images/curly.svg";

//StyleSheet
import "../../Stylesheets/Quiz/quizStyles.css";

const HairType = ({ history }) => {
	const { register, handleSubmit } = useForm();
	useEffect(() => {
		const id = localStorage.getItem("personid");
		console.log("The id is ", id);
	}, []);
	const onSubmit = (data, e) => {
		e.preventDefault();
		console.log(data);
		history.push("/HairStruture");
	};
	return (
		<>
			<section className="container">
				<div className="row">
					<div className="col-sm-12 col-md-12 col-lg-12">
						<form className="QuizForm" onSubmit={handleSubmit(onSubmit)}>
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
								<button className="QuizForm__btn" type="submit">
									Next
								</button>
							</div>
						</form>
					</div>
					<div class="col-sm-12 col-md-12 col-lg-12"></div>
				</div>
			</section>
		</>
	);
};

export default HairType;
