import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const StyleandTime = () => {
	const [startDate, setStartDate] = useState(
		new Date("02-20-2020 12:00:00 GMT-0500")
	);
	const [notavailable, setnotavailable] = useState([]);
	console.log("not aav", notavailable);

	useEffect(() => {
		getData();
		async function getData() {
			const getTimeResponse = await fetch(`http://localhost:3080/appt/check/`);
			const timeRes = await getTimeResponse.json();
			console.log(timeRes);
			const getAllDates = timeRes.map(time => new Date(`${time.date_of}`));
			setnotavailable(getAllDates);
		}
	}, []);

	const onSubmit = async (data, e) => {
		console.log(data);
	};
	return (
		<div className="container">
			<div className="row">
				<form
					className="QuizForm col-sm-12 col-md-8 col-lg-8"
					onSubmit={onSubmit}
				>
					<div className="col-sm-12 col-md-12 col-lg-12">
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

export default StyleandTime;
