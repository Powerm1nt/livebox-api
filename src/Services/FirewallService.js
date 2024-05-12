import express from "express";
import { error, login, query, success } from "../Common/Misc/utils.js";
import { headers } from "../Common/Misc/headers.js";
import env from "../Common/Misc/ConfigProvider.mjs";
export const firewallService = express.Router();

firewallService.get("/rules", async (req, res) => {
	const { active } = req.query;
	const user = await login(env.USERNAME, env.PASSWORD);
	if (!user.success) return res.status(500).json(user);
	const apiResponse = await query(
		"Firewall",
		"getPortForwarding",
		{ parameters: {} },
		user.data.data.contextID,
		user.data.sessionId
	);

	// Si la requete n'a pas été successful
	if (!apiResponse.success) return res.status(500).json(apiResponse);

	return res.json(apiResponse);
});
