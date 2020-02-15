import React, { useState, useEffect } from "react";

//StyleSheet
import "../../Stylesheets/Quiz/quizStyles.css";

const HairProfile = () => {
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
			setLoading(false);
			console.log("here", data);
		}
	}, [user_id]);

	return (
		<div className="container-fluid apptTwo">
			<div className="apptTwo__forwardground">
				<div className="row ">
					<div className="col-sm-12 col-md-12 appt_col">
						{loading ? (
							<div>...loading</div>
						) : (
							<>
								<h1>Hi , {firstName}</h1>

								<ul className="hairList">
									<li>You currently have {hairtype}.</li>
									<li>It is {length}</li>
									{virginhair === "No" ? (
										<>
											<li>
												{typeofColor === "Salon" ? (
													<>recently dye at salon</>
												) : (
													<>recently colored using box dye</>
												)}
											</li>
											<li>You currently have {hairColor} hair </li>
										</>
									) : (
										""
									)}
									<li>{hairstructure}</li>
									<li>You style it {hairRoutine}</li>
								</ul>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HairProfile;
