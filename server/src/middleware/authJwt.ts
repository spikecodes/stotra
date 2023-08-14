import { NextFunction, Request, Response } from "express";

import dotenv from "dotenv";
dotenv.config();
const jwtSecret = process.env.STOTA_JWT_SECRET;

import jwt from "jsonwebtoken";

export function verifyToken(
	req: Request,
	res: Response,
	next: NextFunction,
): Response | void {
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

	jwt.verify(token, jwtSecret!, (err, decoded) => {
		if (err) {
			return res.status(401).send({
				message: "Unauthorized",
			});
		}
		// Set request user id to decoded id in typescript
		req.body.userId = decoded!;
		next();
	});
}

export default { verifyToken };
