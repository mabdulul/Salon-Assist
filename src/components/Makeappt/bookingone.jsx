import React, { useState, useContext } from "react";
import { SessionContextAppt } from "../../context/apptContext";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import moment from "moment";
// import { MdArrowDropDown } from "react-icons/md";
import "../../Stylesheets/booking.css";
import "react-datepicker/dist/react-datepicker.css";

const BookingOne = ({ history }) => {
	const { setAppt } = useContext(SessionContextAppt);
	const [errorMsg, setMsg] = useState("");
	const [stylistMsg, setStylist] = useState("");

	const { register, watch, handleSubmit } = useForm();

	const [startDate, setStartDate] = useState(new Date());
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

		let day = moment(startDate);
		let converTime = day.format("YYYY-MM-DD HH:mm:ss");
		data.date = converTime;

		console.log(data);

		if (!data.service && !data.stylist_id) {
			setMsg("Please selected a service");
			setStylist("Please selected stylist ");
		} else if (!data.service) {
			setMsg("Please selected a service");
			setStylist("");
		} else if (!data.stylist_id) {
			setStylist("Please selected stylist ");
			setMsg("");
		} else {
			setAppt(data.service, data.stylist_id, data.date);
			history.push("/confirmation");
		}
	};
	const stylistTime = watch("stylist_id");

	return (
		<div className="container-fluid apptContainer">
			<form
				className="apptContainer--forwardground"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="row">
					<div className="col-sm-12 col-md-12 appt_col">
						<h2>REQUEST A NEW APPOINTMENT</h2>
						<div className="appt_selectedOnly">
							<label class="appt_selectedBoxes">
								<div className="">
									<select ref={register} name="service" className="" required>
										<option value="">Service</option>
										<option value="Balayage/Ombre">Balayage/Ombre</option>
										<option value="Master Designer">Master Designer</option>
										<option value="Shampoo/BlowDry">Shampoo/Blow Dry</option>
										<option value="Keratin Treatment">KeratinTreatment</option>
									</select>
								</div>
								<span className="appt_error">{errorMsg}</span>
							</label>
							<label class="appt_selectedBoxes">
								<div className="">
									<select
										ref={register}
										name="stylist_id"
										onChange={checkStylistTime}
										className="appt-marginTop"
										required
									>
										<option defaultValue value="">
											Stylist
										</option>
										<option value="1">Rahma Inman</option>
										<option value="2">Sarah Hill</option>
										<option value="3">Jess Garcia</option>
									</select>
									{/* <span className="booking_icon">
											<MdArrowDropDown />
										</span> */}
								</div>
								<span className="appt_error">{stylistMsg}</span>
							</label>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12 col-md-12 appt_col">
						{!!stylistTime ? (
							<label className="appt-marginTop">
								<div className="">
									<DatePicker
										selected={startDate}
										onChange={date => setStartDate(date)}
										showTimeSelect
										excludeTimes={notavailable}
										timeIntervals={60}
										minTime={new Date("02-05-2020 12:00:00 GMT-0500")}
										maxTime={new Date("02-20-2020 21:00:00 GMT-0500")}
										dateFormat="MMMM d, yyyy h:mm aa"
										required
									/>
								</div>
							</label>
						) : (
							" "
						)}
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12 col-md-12 appt_col">
						<button className="appt_button" type="submit">
							Next
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default BookingOne;
