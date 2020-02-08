import React, { useState, useContext } from "react";
import { SessionContextAppt } from "../../context/apptContext";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import moment from "moment";
import { MdArrowDropDown } from "react-icons/md";
import "../../Stylesheets/booking.css";
import "react-datepicker/dist/react-datepicker.css";

const BookingOne = ({ history }) => {
	const { setAppt } = useContext(SessionContextAppt);

	const { register, watch, handleSubmit } = useForm();

	const [startDate, setStartDate] = useState(
		new Date("02-20-2020 12:00:00 GMT-0500")
	);
	const [notavailable, setnotavailable] = useState([]);
	console.log("not aav", notavailable);

	const checkStylistTime = async event => {
		console.log("this data", event.target.value);
		const getTimeResponse = await fetch(
			`http://localhost:3080/appt/check/${event.target.value}`
		);
		const timeRes = await getTimeResponse.json();
		console.log(timeRes);
		const getAllDates = timeRes.map(time => new Date(`${time.date_of}`));
		console.log(getAllDates);
		setnotavailable(getAllDates);
	};

	const onSubmit = async (data, e) => {
		e.preventDefault();

		var day = moment(startDate);
		var converTime = day.format("YYYY-MM-DD HH:mm:ss");
		data.date = converTime;

		// const responsethis = await fetch("http://localhost:3080/appt/appts", {
		// 	method: "POST",
		// 	headers: {
		// 		Accept: "application/json",
		// 		"Content-Type": "application/json"
		// 	},
		// 	body: JSON.stringify(data)
		// });
		setAppt(data.service, data.stylist_id, data.date);
		//console.log(responsethis);
		history.push("/confirmation");
	};
	const stylistTime = watch("stylist_id");

	return (
		<div className="container">
			<div className="row">
				<form className="BookingForm" onSubmit={handleSubmit(onSubmit)}>
					<div className="col-sm-12 col-md-12 col-lg-12 booking">
						<div className="booking_header">
							<h4>REQUEST A NEW APPOINTMENT</h4>
							<div class="booking__container">
								<label class="booking__selectSection">
									<span className="booking_title">Service</span>
									<div className="booking_selectedBox booking_selectedBox--left">
										<select
											ref={register}
											name="service"
											className="booking_selected"
										>
											<option value="Balayage/Ombre">Balayage/Ombre</option>
											<option value="Balayage/Ombre">Balayage/Ombre</option>
											<option value="Master Designer">Master Designer</option>
											<option value="Shampoo/BlowDry">Shampoo/Blow Dry</option>
											<option value="Keratin Treatment">
												KeratinTreatment
											</option>
										</select>
									</div>
								</label>
								<label class="booking__selectSection">
									<p className="booking_title">Stylist</p>
									<div className="booking_selectedBox">
										<select
											ref={register}
											name="stylist_id"
											onChange={checkStylistTime}
											className="booking_selected"
										>
											<option defaultValue value=""></option>
											<option value="1">Rahma Inman</option>
											<option value="2">Sarah Hill</option>
											<option value="3">Jess Garcia</option>
											<option value="0">Any Stylist</option>
										</select>
										{/* <span className="booking_icon">
											<MdArrowDropDown />
										</span> */}
									</div>
								</label>
								{!!stylistTime ? (
									<div className="booking_selectedBox">
										<DatePicker
											selected={startDate}
											onChange={date => setStartDate(date)}
											showTimeSelect
											excludeTimes={notavailable}
											timeIntervals={60}
											minTime={new Date("02-05-2020 12:00:00 GMT-0500")}
											maxTime={new Date("02-20-2020 21:00:00 GMT-0500")}
											dateFormat="MMMM d, yyyy h:mm aa"
										/>
									</div>
								) : (
									" "
								)}
							</div>
							<button className=" booking_btn" type="submit">
								Next
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default BookingOne;
