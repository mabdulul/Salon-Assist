var express = require("express");
const router = express.Router();
const ApptModel = require("../models/appt_models");
const CommentModel = require("../models/comments_model");

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

router.post("/guestapptsUpdate", async (req, res) => {
	const { stylist_id, service, date } = req.body;
	const formInstance = new ApptModel(null, stylist_id, service, null, date);
	const formIn = await formInstance.AddInfoGuestAppt();
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

router.get("/getAppt/:user_id/:date/", async (req, res) => {
	const { user_id, date } = req.params;
	console.log(req.params);
	const formInstance = new ApptModel(null, null, null, user_id, date);
	const formIn = await formInstance.GetAppt();
	res.json(formIn).status(200);
});

router.get("/getApptPast/:user_id/:date/", async (req, res) => {
	const { user_id, date } = req.params;
	console.log(req.params);
	const formInstance = new ApptModel(null, null, null, user_id, date);
	const formIn = await formInstance.GetPastAppt();
	res.json(formIn).status(200);
});

router.post("/updateAppt", async (req, res) => {
	const { apptid, stylist_id, service, user_id, date } = req.body;
	console.log(req.body);
	const formInstance = new ApptModel(
		apptid,
		stylist_id,
		service,
		user_id,
		date
	);
	const formIn = await formInstance.UpdateAppt();
	res.json(formIn).status(200);
});

router.post("/addComment", async (req, res) => {
	const { apptid, user_id, usercomment } = req.body;
	console.log(req.body);
	const formInstance = new CommentModel(apptid, user_id, usercomment);
	const formIn = await formInstance.CreatUserComments();
	res.json(formIn).status(200);
});

router.get("/getComments/:user_id/:apptid", async (req, res) => {
	const { apptid, user_id } = req.params;
	console.log(req.params);
	const formInstance = new CommentModel(apptid, user_id, null);
	const formIn = await formInstance.GetComments();
	res.json(formIn).status(200);
});

router.post("/DeleteAppt", async (req, res) => {
	const { apptid } = req.body;
	console.log("here", req.body);
	const formInstance = new ApptModel(apptid, null, null);
	const formIn = await formInstance.DeleteAppt();
	const formTwo = await formInstance.DeleteApptFrom();

	res.json(formTwo).status(200);

	res.json(formIn).status(200);
});

router.post("/DeleteComment", async (req, res) => {
	const { commentid } = req.body;
	console.log("here", req.body);
	const formInstance = new CommentModel(null, null, null, commentid);
	const formIn = await formInstance.DeleteComment();

	res.json(formIn).status(200);
});

module.exports = router;
