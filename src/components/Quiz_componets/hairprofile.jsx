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

	useEffect(() => {
		let user_id = localStorage.personid;
		setfirstName(localStorage.firstname);
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
			setLoading(false);
			console.log("here", data);
		}
	}, [user_id]);

	return (
		<div className="container">
			<div className="row">
				{loading ? (
					<div>...loading</div>
				) : (
					<>
						<h1>Hi , {firstName}</h1>

						<ul>
							<li>{hairtype}</li>
							<li>{length}</li>
							<li>
								{typeofColor === "Salon" ? (
									<>recently dye at salon</>
								) : (
									<>recently colored using box dye</>
								)}
							</li>
							<li>{hairstructure}</li>
							<li>You currently have {hairColor}</li>
							<li>{hairRoutine}</li>
						</ul>
					</>
				)}
			</div>
		</div>
	);
};

export default HairProfile;
