import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import moment from "moment";

const BookingOne = () => {
	const { register, handleSubmit } = useForm();
	const [errorMsg, setMsg] = useState("");
	const [startDate, setStartDate] = useState(new Date());

	const onSubmit = async (data, e) => {
		e.preventDefault();
		console.log(data);

		var day = moment(startDate);
		var t = day.format("YYYY-MM-DD HH:mm:ss");
		console.log("I am t", t);
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
							showTimeSelect
							timeFormat="HH:mm"
							timeIntervals={15}
							timeCaption="time"
							dateFormat="MMMM d, yyyy h:mm aa"
							ref={register}
							name="date"
						/>
						<label>
							<select ref={register} name="service">
								<option value="Balayage/Ombre">Balayage/Ombre</option>
								<option value="Master Designer">Master Designer</option>
								<option value="Shampoo/BlowDry">Shampoo/Blow Dry</option>
								<option value="Keratin Treatment">KeratinTreatment</option>
							</select>
						</label>
						<label>
							<select ref={register} name="stylist">
								<option value="Rahma Inman">Rahma Inman</option>
								<option value="Sarah Hill">Sarah Hill</option>
								<option value="Jess Garcia">Jess Garcia</option>
							</select>
						</label>
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
