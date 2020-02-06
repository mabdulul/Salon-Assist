const db = require("./conn");

class ApptModels {
	constructor(apptid, stylist_id, service, user_id, date) {
		this.apptid = apptid;
		this.stylist_id = stylist_id;
		this.service = service;
		this.user_id = user_id;
		this.date = date;
	}
	async InsertNewAppt() {
		try {
			const response = await db.one(
				`INSERT INTO appt( stylist_id, service, user_id, date_of)
                  VALUES
                  ( 
                    ${this.stylist_id},
                    '${this.service}',
					68,
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
}

module.exports = ApptModels;
