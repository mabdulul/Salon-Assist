import React, { useState } from "react";
import { useForm } from "react-hook-form";

//StyleSheet
import "../../Stylesheets/Quiz/quizStyles.css";

const Coloredhair = ({ history }) => {
	const { register, watch, handleSubmit } = useForm();
	const [errorMsg, setMsg] = useState("");
	const onSubmit = async (data, e) => {
		e.preventDefault();
		console.log(data);
		const boxdye_salon = data.boxdye_salon;
		const virgin_hair = data.virgin_hair;

		if (!virgin_hair && !boxdye_salon) {
			setMsg("Please select an answer.");
			// console.log("Please try again");
		} else if (virgin_hair === "Yes") {
			const response = await fetch(
				"http://localhost:3080/hair/form/virgin_hair",
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
			history.push("/hairroutine");
		} else if (virgin_hair === "No" && !boxdye_salon) {
			setMsg("Please select BoxDye or Salon");
			// console.log("Please try again");
		} else {
			const response = await fetch("http://localhost:3080/hair/form/dye", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			});
			console.log(response);
			history.push("/hairroutine");
		}
	};
	const BacktoHairLength = () => {
		history.push("/hairlength");
	};
	const coloredhair = watch("virgin_hair");
	console.log(coloredhair);
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
								<span className="QuizForm_breadcrumbs"></span>
								<span className="QuizForm_breadcrumbs-line"></span>
								<span className="QuizForm_end">END</span>
							</div>
							<div className="QuizForm-header">
								<p className="errorMsg">{errorMsg}</p>
								<h4>Do you have virgin hair ?</h4>
							</div>
							<div className="QuizForm__label">
								<label>
									<input
										type="radio"
										name="virgin_hair"
										value="Yes"
										ref={register}
									/>
									<div className="QuizForm-bgBlock__selecttext">
										<p>Yes</p>
									</div>
								</label>
								<label>
									<input
										type="radio"
										name="virgin_hair"
										value="No"
										ref={register}
										className="img-fluid"
									/>
									<div className="QuizForm-bgBlock__selecttext">
										<p>No</p>
									</div>
								</label>
							</div>
							{/* Ternary */}
							{coloredhair === "No" ? (
								<>
									<div className="QuizForm__label QuizForm--TyOfColor tempfix">
										<div className="QuizForm-header">
											<h4>Was it box dye or done at a Salon ?</h4>
										</div>
										<label>
											<input
												type="radio"
												name="boxdye_salon"
												value="BoxDye"
												ref={register}
											/>
											<div className="QuizForm-bgBlock__selecttext">
												<p>box dye</p>
											</div>
										</label>
										<label>
											<input
												type="radio"
												name="boxdye_salon"
												value="Salon"
												ref={register}
												className="img-fluid"
											/>
											<div className="QuizForm-bgBlock__selecttext">
												<p>Salon</p>
											</div>
										</label>
									</div>

									<div className="QuizForm__label QuizForm--TyOfColor ">
										<div className="QuizForm-header">
											<h4>What color was it ?</h4>
											<p className="tempfix"> You can chose more than one </p>
											<div className="tempfix-block"></div>
										</div>

										<label>
											<input
												type="checkbox"
												name="colorOfhair"
												value="black"
												ref={register}
											/>
											<div className="QuizForm-bgBlock__selecttext">
												<p>black</p>
											</div>
										</label>
										<label>
											<input
												type="checkbox"
												name="colorOfhair"
												value="red"
												ref={register}
											/>
											<div className="QuizForm-bgBlock__selecttext">
												<p>red</p>
											</div>
										</label>
										<label>
											<input
												type="checkbox"
												name="colorOfhair"
												value="brown"
												ref={register}
											/>
											<div className="QuizForm-bgBlock__selecttext">
												<p>brown</p>
											</div>
										</label>
										<label>
											<input
												type="checkbox"
												name="colorOfhair"
												value="blonde"
												ref={register}
											/>
											<div className="QuizForm-bgBlock__selecttext">
												<p>blonde</p>
											</div>
										</label>
										<label>
											<input
												type="checkbox"
												name="colorOfhair"
												value="blue"
												ref={register}
											/>
											<div className="QuizForm-bgBlock__selecttext">
												<p>blue</p>
											</div>
										</label>
										<label>
											<input
												type="checkbox"
												name="colorOfhair"
												value="green"
												ref={register}
											/>
											<div className="QuizForm-bgBlock__selecttext">
												<p>green</p>
											</div>
										</label>
										<label>
											<input
												type="checkbox"
												name="colorOfhair"
												value="orange"
												ref={register}
											/>
											<div className="QuizForm-bgBlock__selecttext">
												<p>orange</p>
											</div>
										</label>
										<label>
											<input
												type="checkbox"
												name="colorOfhair"
												value="pink"
												ref={register}
											/>
											<div className="QuizForm-bgBlock__selecttext">
												<p>pink</p>
											</div>
										</label>
										<label>
											<input
												type="checkbox"
												name="colorOfhair"
												value="purple"
												ref={register}
											/>
											<div className="QuizForm-bgBlock__selecttext">
												<p>purple</p>
											</div>
										</label>
									</div>
								</>
							) : (
								""
							)}
							{/* End Here */}
						</div>
						<div className="QuizForm__btnBlock col-sm-12 col-md-12 col-lg-12">
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
