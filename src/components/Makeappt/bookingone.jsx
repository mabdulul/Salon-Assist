import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";

import moment from "moment";

const BookingOne = () => {
	const { register, handleSubmit } = useForm();
	const [startDate, setStartDate] = useState(
		new Date("02-20-2020 12:00:00 GMT-0500")
	);

	var closedTime = [
		new Date("02-05-2020 00:00:00 GMT-0500"),
		new Date("02-05-2020 01:00:00 GMT-0500"),
		new Date("02-20-2020 02:00:00 GMT-0500"),
		new Date("02-20-2020 03:00:00 GMT-0500"),
		new Date("02-20-2020 04:00:00 GMT-0500"),
		new Date("02-20-2020 05:00:00 GMT-0500"),
		new Date("02-20-2020 06:00:00 GMT-0500"),
		new Date("02-20-2020 07:00:00 GMT-0500"),
		new Date("02-20-2020 08:00:00 GMT-0500"),
		new Date("02-20-2020 09:00:00 GMT-0500"),
		new Date("02-20-2020 10:00:00 GMT-0500"),
		new Date("02-20-2020 11:00:00 GMT-0500")
	];

	const onSubmit = async (data, e) => {
		e.preventDefault();
		console.log("Here", startDate);

		var day = moment(startDate);
		var t = day.format("YYYY-MM-DD HH:mm:ss");
		data.date = t;
		console.log("I am t", t);

		console.log(data);

		const response = await fetch("http://localhost:3080/appt/", {
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
		<div className="container">
			<div className="row">
				<form
					className="QuizForm col-sm-12 col-md-8 col-lg-8"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="col-sm-12 col-md-12 col-lg-12">
						<div className="QuizForm-header">
							<h4>REQUEST A NEW APPOINTMENT</h4>
						</div>

						<label>
							<select ref={register} name="service">
								<option value="Balayage/Ombre">Balayage/Ombre</option>
								<option value="Master Designer">Master Designer</option>
								<option value="Shampoo/BlowDry">Shampoo/Blow Dry</option>
								<option value="Keratin Treatment">KeratinTreatment</option>
							</select>
						</label>
						<DatePicker
							selected={startDate}
							onChange={date => setStartDate(date)}
							showTimeSelect
							excludeTimes={closedTime}
							timeIntervals={60}
							dateFormat="MMMM d, yyyy h:mm aa"
						/>
						<label>
							<select ref={register} name="stylist_id">
								<option value="1">Rahma Inman</option>
								<option value="2">Sarah Hill</option>
								<option value="3">Jess Garcia</option>
								<option value="Any">Any Stylist</option>
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
