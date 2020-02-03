import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";

const BookingOne = () => {
	const { register, handleSubmit } = useForm();
	const [errorMsg, setMsg] = useState("");
	const [startDate, setStartDate] = useState(new Date());
	console.log(startDate);
	const onSubmit = async (data, e) => {
		e.preventDefault();
		console.log(data);
		console.log("here", startDate);
	};
	return (
		<div className="container">
			<div className="row">
				<form
					className="QuizForm col-sm-12 col-md-8 col-lg-8"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="col-sm-12 col-md-12 col-lg-12">
						<div className="QuizForm-header">
							<p className="errorMsg">{errorMsg}</p>
							<h4>REQUEST A NEW APPOINTMENT</h4>
						</div>
						<DatePicker
							selected={startDate}
							onChange={date => setStartDate(date)}
						/>
					</div>
					<div className="QuizForm__btnBlock col-sm-12 col-md-12 col-lg-12">
						<button className="QuizForm__btn" type="submit">
							Next →
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default BookingOne;
