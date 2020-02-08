import React from "react";

import hero from "../imagesmain/heroImage3.png";
import heroCircle from "../imagesmain/heromain.png";
import vector from "../imagesmain/vector-1.png";
import abstract from "../imagesmain/abstract-2.png";
import ab from "../imagesmain/ab.svg";
import "../Stylesheets/hero.css";

const HomePage = () => {
	return (
		<div class="container hero">
			<div className="row">
				<div className="col-sm-12 col-md-12 col-lg-12">
					<div className="hero_box">
						<img src={heroCircle} alt="another hero" className=" hero_image2" />
						<img src={ab} alt="thesvg" className="hero-svg" />
						<img
							src={abstract}
							alt="abstract"
							className="img-fluid hero_abstract"
						/>
						<img
							src={vector}
							alt="main pic"
							className="img-fluid hero_vector "
						/>
						<p className="hero_text">
							Debonaire is salon that thinks about our clients.
						</p>
						<img src={hero} alt="main pic" className="img-fluid hero_image1" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
