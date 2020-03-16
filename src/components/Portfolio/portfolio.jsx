import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
const Portfolio = () => {
	const { register, handleSubmit } = useForm();
	let user_id = localStorage.personid;
	const [loading, setLoading] = useState(true);
	const [firstName, setfirstName] = useState("");
	const [hairtype, setHair] = useState("");
	const [length, setlength] = useState("");
	const [typeofColor, settypeofColor] = useState("");
	const [hairstructure, setshairstructure] = useState("");
	const [hairColor, sethairColor] = useState("");
	const [hairRoutine, setHairRoutine] = useState("");
	const [virginhair, setVirginHair] = useState("");
	const [dateColor, setDateColor] = useState("");

	useEffect(() => {
		let user_id = localStorage.personid;
		setfirstName(localStorage.firstname);
		getData();
		async function getData() {
			const response = await fetch(
				`http://localhost:3080/hair/form/hairprofile/${user_id}`
			);
			console.log(response);
			const data = await response.json();
			setHair(data.hairtype);
			setlength(data.length_hair);
			settypeofColor(data.boxdye_salon);
			setshairstructure(data.hair_structure);
			sethairColor(data.haircolor);
			setHairRoutine(data.hairroutine);
			setVirginHair(data.virgin_hair);

			let day = moment(data.datecolor);
			let t = day.format("YYYY-MM-DD");

			setDateColor(t);
			setLoading(false);
			console.log("here", data);
		}
	}, [user_id]);

	const onSubmit = async (data, e) => {
		data.user_id = user_id;

		let day = moment(data.datecolor);
		let t = day.format("YYYY-MM-DD HH:mm:ss");

		data.datecolor = t;
		console.log(data);
		const response = await fetch("http://localhost:3080/hair/form/updateAll", {
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
		<>
			<div className="container">
				<div className="row">
					<form
						className="QuizForm col-sm-12 col-md-8 col-lg-8"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="col-sm-12 col-md-12 col-lg-12">
							I have
							<label>
								<input
									type="text"
									name="hairtype"
									value={hairtype}
									onChange={e => setHair(e.target.value)}
									ref={register}
								/>
							</label>
							<label>
								<input
									type="text"
									name="length_hair"
									value={length}
									onChange={e => setlength(e.target.value)}
									ref={register}
								/>
							</label>
							<label>
								<input
									type="text"
									name="boxdye_salon"
									value={typeofColor}
									onChange={e => settypeofColor(e.target.value)}
									ref={register}
								/>
							</label>
							<label>
								<input
									type="text"
									name="hairstructure"
									value={hairstructure}
									onChange={e => setshairstructure(e.target.value)}
									ref={register}
								/>
							</label>
							<label>
								<input
									type="text"
									name="colorOfhair"
									value={hairColor}
									onChange={e => sethairColor(e.target.value)}
									ref={register}
								/>
							</label>
							<label>
								<input
									type="text"
									name="hairroutine"
									value={hairRoutine}
									onChange={e => setHairRoutine(e.target.value)}
									ref={register}
								/>
							</label>
							<label>
								<input
									type="text"
									name="virgin_hair"
									value={virginhair}
									onChange={e => setVirginHair(e.target.value)}
									ref={register}
								/>
							</label>
							<label>
								<input
									type="text"
									name="datecolor"
									value={dateColor}
									onChange={e => setDateColor(e.target.value)}
									ref={register}
								/>
							</label>
						</div>
						<div className="QuizForm__btnBlock col-sm-12 col-md-12 col-lg-12">
							<button className="QuizForm__btn" type="submit">
								Save →
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Portfolio;
