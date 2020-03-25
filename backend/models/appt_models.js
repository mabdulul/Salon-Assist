const db = require("./conn");

class ApptModels {
	constructor(
		apptid,
		stylist_id,
		service,
		user_id,
		date,
		firstName,
		lastName,
		emailguest,
		PhoneNumber
	) {
		this.apptid = apptid;
		this.stylist_id = stylist_id;
		this.service = service;
		this.user_id = user_id;
		this.date = date;
		this.firstName = firstName;
		this.lastName = lastName;
		this.emailguest = emailguest;
		this.PhoneNumber = PhoneNumber;
	}
	async InsertNewAppt() {
		try {
			const response = await db.one(
				`INSERT INTO appt( stylist_id, service, user_id, date_of)
                  VALUES
                  ( 
                    ${this.stylist_id},
                    '${this.service}',
					${this.user_id},
					'${this.date}'
                    );`
			);
			console.log(response);
			return response;
		} catch (error) {
			return error.message;
		}
	}
	async CheckTime() {
		try {
			const response = await db.query(
				`SELECT
                stylist.stylist_id,
                firstname,
                lastname,
                appt.service,
                appt.date_of
                
             FROM
                stylist
             INNER JOIN appt ON appt.stylist_id = stylist.stylist_id
             WHERE
             appt.stylist_id=${this.stylist_id};`
			);
			console.log(response);
			return response;
		} catch (error) {
			return error.message;
		}
	}
	async GuestAppt() {
		try {
			const response = await db.one(
				`INSERT INTO apptguest( stylist_id, service, date_of, firstName, lastName, emailguest, PhoneNumber)
                  VALUES
                  ( 
                    ${this.stylist_id},
                    '${this.service}',
					'${this.date}',
					'${this.firstName}',
					'${this.lastName}',
					'${this.emailguest}',
					'${this.PhoneNumber}'
                    );`
			);
			console.log(response);
			return response;
		} catch (error) {
			return error.message;
		}
	}
	async GetAppt() {
		try {
			const response = await db.query(
				`select date_of, service,firstname, lastname, apptid
				from appt
				Inner JOIN stylist ON appt.stylist_id = stylist.stylist_id
				WHERE user_id=${this.user_id} AND date_of >= '${this.date}';`
			);
			console.log(response);
			return response;
		} catch (error) {
			return error.message;
		}
	}
	async GetPastAppt() {
		try {
			const response = await db.query(
				`select apptid, date_of, service,firstname, lastname
				from appt
				Inner JOIN stylist ON appt.stylist_id = stylist.stylist_id
				WHERE user_id=${this.user_id} AND date_of < '${this.date}';`
			);
			console.log(response);
			return response;
		} catch (error) {
			return error.message;
		}
	}
	async UpdateAppt() {
		try {
			const response = await db.one(
				`UPDATE appt
				 SET
				 date_of = '${this.date}',
				 service = '${this.service}',
				 stylist_id = '${this.stylist_id}',
				 user_id = '${this.user_id}'
				 WHERE apptid=${this.apptid};`
			);
			console.log(response);
		} catch (error) {
			return error.message;
		}
	}
}

module.exports = ApptModels;
