import React, { useState, useEffect } from "react";

//StyleSheet
import "../../Stylesheets/Quiz/quizStyles.css";

const HairProfile = () => {
	let user_id = localStorage.personid;

	useEffect(() => {
		getData();
		async function getData() {
			const response = await fetch(
				`http://localhost:3080/hair/form/hairprofile/${user_id}`
			);

			const data = await response.json();
			console.log("here", data);
		}
	}, [user_id]);

	return (
		<div className="container">
			<div className="row">
				<h1>Hello There</h1>
			</div>
		</div>
	);
};

export default HairProfile;
