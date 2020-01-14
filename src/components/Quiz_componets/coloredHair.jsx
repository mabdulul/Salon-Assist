import React from "react";
import { useForm } from "react-hook-form";

//StyleSheet
import "../../Stylesheets/Quiz/quizStyles.css";

const Coloredhair = ({ history }) => {
	const { register, watch, handleSubmit } = useForm();
	const onSubmit = (data, e) => {
		e.preventDefault();
		console.log(data);
	};
	const BacktoHairLength = () => {
		history.push("/hairlength");
	};
	const coloredhair = watch("coloredhair");
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
								<span className="QuizForm_breadcrumbs "></span>
								<span className="QuizForm_breadcrumbs is-active"></span>
								<span className="QuizForm_breadcrumbs-line"></span>
								<span className="QuizForm_end">END</span>
							</div>
							<div className="QuizForm-header">
								<h2>Do you have virgin hair ?</h2>
							</div>
							<div className="QuizForm__label">
								<label>
									<input
										type="radio"
										name="coloredhair"
										value="Yes"
										ref={register}
									/>
									<div className="QuizForm-bgBlock">
										<p>Yes</p>
									</div>
								</label>
								<label>
									<input
										type="radio"
										name="coloredhair"
										value="No"
										ref={register}
										className="img-fluid"
									/>
									<div className="QuizForm-bgBlock">
										<p>No</p>
									</div>
								</label>
							</div>
							{/* Ternary */}
							{coloredhair === "No" ? (
								<div className="QuizForm__label QuizForm--TyOfColor ">
									<div className="QuizForm-header">
										<h2>Was it BoxDye or at Salon ?</h2>
									</div>
									<label>
										<input
											type="radio"
											name="coloredhairType"
											value="BoxDye"
											ref={register}
										/>
										<div className="QuizForm-bgBlock">
											<p>BoxDye</p>
										</div>
									</label>
									<label>
										<input
											type="radio"
											name="coloredhairType"
											value="Salon"
											ref={register}
											className="img-fluid"
										/>
										<div className="QuizForm-bgBlock">
											<p>Salon</p>
										</div>
									</label>
								</div>
							) : (
								""
							)}
							{/* End Here */}
						</div>
						<div class="QuizForm__btnBlock col-sm-12 col-md-12 col-lg-12">
							<button className="QuizForm__btn" onClick={BacktoHairLength}>
								← Back
							</button>
							<button className="QuizForm__btn" type="submit">
								Next →
							</button>
						</div>
					</form>
					<></>
				</div>
			</div>
		</>
	);
};

export default Coloredhair;
