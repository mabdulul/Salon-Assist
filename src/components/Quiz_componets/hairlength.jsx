import React from "react";
import { useForm } from "react-hook-form";

//StyleSheet
import "../../Stylesheets/Quiz/quizStyles.css";

const Hairlength = ({ history }) => {
	const { register, handleSubmit } = useForm();
	const onSubmit = (data, e) => {
		e.preventDefault();
		console.log(data);
		history.push("/coloredhair");
	};
	const BacktoHairStructure = () => {
		history.push("/hairStruture");
	};
	// const NexttoHairType = () => {

	// };

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
								<span className="QuizForm_breadcrumbs-line"></span>
								<span className="QuizForm_end">END</span>
							</div>
							<div className="QuizForm-header">
								<h4>How long is your hair?</h4>
							</div>
							<div className="QuizForm__label">
								<label>
									<input
										type="radio"
										name="hairslength"
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
										name="hairslength"
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
										name="hairslength"
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
										name="hairslength"
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
