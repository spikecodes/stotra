require("dotenv").config();
const jwtSecret = process.env.STOTA_JWT_SECRET;

const jwt = require("jsonwebtoken");

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

	jwt.verify(token, jwtSecret, (err, decoded) => {
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
