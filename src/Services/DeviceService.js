import express from "express";
import { error, login, query, success } from "../Common/Misc/utils.js";
import { headers } from "../Common/Misc/headers.js";
import env from "../Common/Misc/ConfigProvider.mjs";
export const deviceService = express.Router();

deviceService.get("/all", async (req, res) => {
	const { active } = req.query;
	const user = await login(env.USERNAME, env.PASSWORD);
	if (!user.success) return res.status(500).json(user);
	const apiResponse = await query(
		"Devices",
		"get",
		{ parameters: {} },
		user.data.data.contextID,
		user.data.sessionId
	);

	if (active === "true") {
		const devices = apiResponse.data.status.filter(
			(device) => device.Active === true
		);
		apiResponse.data.status = devices;
	}

	// Si la requete n'a pas été successful
	if (!apiResponse.success) return res.status(500).json(apiResponse);

	return res.json(apiResponse);
});
