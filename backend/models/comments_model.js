const db = require("./conn");

class CommentsTable {
	constructor(apptid, user_id, usercomment) {
		this.apptid = apptid;
		this.user_id = user_id;
		this.usercomment = usercomment;
	}
	async CreatUserComments() {
		try {
			const response = await db.query(
				`Insert INTO commentsTb( apptid , user_id ,usercomment)
                  Values(
                      ${this.apptid},
                      ${this.user_id},
                      '${this.usercomment}'
                  );
                `
			);
			console.log(response);
			return response;
		} catch (error) {
			return error.message;
		}
	}
}

module.exports = CommentsTable;
