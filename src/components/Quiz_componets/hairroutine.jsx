import React from "react";
import { useForm } from "react-hook-form";

//StyleSheet
import "../../Stylesheets/Quiz/quizStyles.css";

const HairRoutine = ({ history }) => {
	const { register, handleSubmit } = useForm();
	const onSubmit = (data, e) => {
		e.preventDefault();
		console.log(data);
		history.push("/hairroutine");
	};
	const BacktoHairColor = () => {
		history.push("/coloredhair");
	};

	return (
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
							<span className="QuizForm_breadcrumbs"></span>
							<span className="QuizForm_breadcrumbs is-active"></span>
							<span className="QuizForm_breadcrumbs-line"></span>
							<span className="QuizForm_end ">END</span>
						</div>
						<div className="QuizForm-header">
							<h4>How do you style your hair ?</h4>
						</div>
						<div className="QuizForm__label">
							<textarea
								class="hairRoutine-textbox"
								name="hairRoutine"
								ref={register}
							></textarea>
						</div>
					</div>
					<div className="QuizForm__btnBlock col-sm-12 col-md-12 col-lg-12">
						<button className="QuizForm__btn" onClick={BacktoHairColor}>
							← Back
						</button>
						<button className="QuizForm__btn" type="submit">
							Next →
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default HairRoutine;
