var express = require("express");
const router = express.Router();
const ApptModel = require("../models/appt_models");

router.post("/", async (req, res) => {
	const { stylist_id, service, date } = req.body;
	const formInstance = new ApptModel(null, stylist_id, service, null, date);
	const formIn = await formInstance.InsertNewAppt();
	console.log(formIn);
	console.log(formInstance);
});

module.exports = router;
