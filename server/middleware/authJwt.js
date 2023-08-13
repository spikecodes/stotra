const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

verifyToken = (req, res, next) => {
	/* #swagger.security = [{
		"bearerAuth": []
	}] 
	#swagger.autoHeaders=false
	*/
	let token = req.headers["authorization"];

	if (!token) {
		return res.status(403).send({ message: "No token provided" });
	}

	token = token.split(" ")[1];

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			return res.status(401).send({
				message: "Unauthorized",
			});
		}
		req.userId = decoded.id;
		next();
	});
};

module.exports = { verifyToken };
