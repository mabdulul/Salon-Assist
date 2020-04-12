import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";

import "../../Stylesheets/Dash/Prof.css";
const Portfolio = () => {
	const { register, handleSubmit } = useForm();
	let user_id = localStorage.personid;

	const [hairtype, setHair] = useState("");
	const [length_hair, setlength] = useState("");
	const [typeofColor, settypeofColor] = useState("");
	const [hairstructure, setshairstructure] = useState("");
	let [hairColor, sethairColor] = useState("");
	console.log("Line 16", hairColor);
	let test = hairColor.toString();
	console.log("the test", test);
	if (test === "undefined") {
		sethairColor("N/A");
	}

	const [hairRoutine, setHairRoutine] = useState("");
	const [virginhair, setVirginHair] = useState("");
	const [dateColor, setDateColor] = useState("");

	useEffect(() => {
		let user_id = localStorage.personid;

		getData();
		async function getData() {
			const response = await fetch(
				`http://localhost:3080/hair/form/hairprofile/${user_id}`
			);

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
		}
	}, [user_id]);

	const onSubmit = async (data, e) => {
		data.user_id = user_id;

		let day = moment(data.datecolor);
		let t = day.format("YYYY-MM-DD HH:mm:ss");

		data.datecolor = t;

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
			<div className="container-fluid DashBoard">
				<div className="row ">
					<div className="col-sm-12 col-md-12 col-lg-12">
						<div className="DashBoard_HeaderText">
							<h1 className="DashBoard__Nav">My Profile</h1>
						</div>
					</div>
				</div>
				<div className="row">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="col-sm-12 col-md-12 col-lg-12 DashBoard_divst">
							<div className="DashBoard_divstBox">
								<label className="DashBoard_divst_label">Hair Type</label>

								<select
									ref={register}
									name="hairtype"
									value={hairtype}
									onChange={e => setHair(e.target.value)}
								>
									<option value="Straight">straight</option>
									<option value="Wavy">wavy</option>
									<option value="Curly">curly</option>
								</select>
							</div>
							<div className="DashBoard_divstBox">
								<label className="DashBoard_divst_label">Length</label>
								<select
									ref={register}
									name="length_hair"
									value={length_hair}
									onChange={e => setlength(e.target.value)}
								>
									<option value="pixie">Pixie</option>
									<option value="short">Short</option>
									<option value="shoulderlength">Sholder Length</option>
									<option value="long">Long</option>
								</select>
							</div>
							<div className="DashBoard_divstBox">
								<label className="DashBoard_divst_label">Hair Structure</label>

								<select
									name="hairstructure"
									onChange={e => setshairstructure(e.target.value)}
									ref={register}
									value={hairstructure}
								>
									<option value="fine">fine</option>
									<option value="medium">medium</option>
									<option value="coarse">coarse</option>
								</select>
							</div>
							<div className="DashBoard_divstBox">
								<label className="DashBoard_divst_label">Virgin Hair</label>

								<select
									name="virgin_hair"
									onChange={e => setVirginHair(e.target.value)}
									ref={register}
									value={virginhair}
								>
									<option value="Yes">Yes</option>
									<option value="No">No</option>
								</select>
							</div>
							{virginhair === "No" ? (
								<>
									<div className="DashBoard_divstBox">
										<label className="DashBoard_divst_label">Color Type</label>
										<select
											name="boxdye_salon"
											onChange={e => settypeofColor(e.target.value)}
											ref={register}
											value={typeofColor}
										>
											<option value="BoxDye">Box Dye</option>
											<option value="Salon">Salon</option>
										</select>
									</div>
									<div className="DashBoard_divstBox">
										<label className="DashBoard_divst_label">Color</label>
										<input
											type="text"
											name="colorOfhair"
											value={hairColor}
											onChange={e => sethairColor(e.target.value)}
											ref={register}
											size="25"
										/>
									</div>
								</>
							) : (
								" "
							)}

							<div className="DashBoard_divstBox">
								<label className="DashBoard_divst_label">Hair Routine</label>
								<input
									type="text"
									name="hairroutine"
									value={hairRoutine}
									onChange={e => setHairRoutine(e.target.value)}
									ref={register}
									size="25"
								/>
							</div>
							<div className="DashBoard_divstBox">
								<label className="DashBoard_divst_label">Date Colored</label>
								<input
									type="text"
									name="datecolor"
									value={dateColor}
									onChange={e => setDateColor(e.target.value)}
									ref={register}
									size="25"
								/>
							</div>
							<div className="DashBoard_divstBox   DashBoard_button">
								<label className="DashBoard_divst_label"></label>
								<button type="submit">Save</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Portfolio;
