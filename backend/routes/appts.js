var express = require("express");
const router = express.Router();
const ApptModel = require("../models/appt_models");

router.post("/appts", async (req, res) => {
	const { stylist_id, service, date, user_id } = req.body;
	const formInstance = new ApptModel(null, stylist_id, service, user_id, date);
	const formIn = await formInstance.InsertNewAppt();
	if (formIn.id < 0) {
		res.sendStatus(500);
	} else {
		res.sendStatus(200);
	}
});
router.post("/guestappts", async (req, res) => {
	const {
		stylist_id,
		service,
		date,
		firstName,
		lastName,
		emailguest,
		PhoneNumber
	} = req.body;
	const formInstance = new ApptModel(
		null,
		stylist_id,
		service,
		null,
		date,
		firstName,
		lastName,
		emailguest,
		PhoneNumber
	);
	const formIn = await formInstance.GuestAppt();
	if (formIn.id < 0) {
		res.sendStatus(500);
	} else {
		res.sendStatus(200);
	}
});
router.get("/check/:stylist_id", async (req, res) => {
	const { stylist_id } = req.params;
	const formInstance = new ApptModel(null, stylist_id, null, null, null);
	const formIn = await formInstance.CheckTime();
	res.json(formIn).status(200);
});

module.exports = router;
