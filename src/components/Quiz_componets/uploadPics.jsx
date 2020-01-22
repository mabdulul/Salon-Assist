import React, { Fragment, useState } from "react";
import axios from "axios";

const UploadUserPics = ({ history }) => {
	const [file, setFile] = useState("");
	const [filename, setFilename] = useState("Choose File");
	const [uploadedFile, setUploadedFile] = useState({});

	const onChange = e => {
		setFile(e.target.files[0]);
		setFilename(e.target.files[0].name);
	};
	const onSubmit = async e => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("file", file);

		try {
			const res = await axios.post(
				"http://localhost:3080/hair/upload",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data"
					}
				}
			);
			console.log(res);

			const { fileName, filePath } = res.data;
			setUploadedFile({ fileName, filePath });
			console.log(uploadedFile.filePath);
		} catch (err) {
			if (err.response.status === 500) {
				console.log("There was a problem with the server");
			} else {
				console.log(err.response.data.msg);
			}
		}

		//history.push("/coloredhair");
	};
	return (
		<Fragment>
			<form onSubmit={onSubmit}>
				<div className="custom-file">
					<input
						type="file"
						className="custom-file-input"
						onChange={onChange}
						id="customFile"
					/>
					<label className="custom-file-label" htmlFor="customFile">
						{filename}
					</label>
				</div>
				<button className="QuizForm__btn" type="submit">
					Submit →
				</button>
			</form>
			{uploadedFile ? (
				<div className="row mt-5">
					<div className="col-md-6 m-auto">
						<h3 className="text-center">{uploadedFile.fileName}</h3>
						<img style={{ width: "100%" }} src={uploadedFile.filePath} alt="" />
					</div>
				</div>
			) : null}
		</Fragment>
	);
};

export default UploadUserPics;
