import express from "express";
import { error, login, query, success } from "../Common/Misc/utils.js";
import { headers } from "../Common/Misc/headers.js";
import env from "../Common/Misc/ConfigProvider.mjs";
export const firewallService = express.Router();

firewallService.get("/rules", async (req, res) => {
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

firewallService.post("/add-rule", async (req, res) => {
	const { commit } = req.query;
	if (!req.body) return res.status(400).json(error({ message: "Missing body" }));

	const user = await login(env.USERNAME, env.PASSWORD);
	if (!user.success) return res.status(500).json(user);
	const apiResponse = await query(
		"Firewall",
		"setPortForwarding",
		{ parameters: req.body },
		user.data.data.contextID,
		user.data.sessionId
	);

	// Si la requete n'a pas été successful
	if (!apiResponse.success) return res.status(500).json(apiResponse);

	if (commit === "true") {
		const commitResponse = await commitRules();
		if (!commitResponse.success) return res.status(500).json(commitResponse);
	}

	return res.json(apiResponse);
});

const commitRules = async () => {
	console.log("Committing rules");
	const user = await login(env.USERNAME, env.PASSWORD);
	if (!user.success) throw new Error("Failed to login");
	const apiResponse = await query(
		"Firewall",
		"commit",
		{ parameters: {} },
		user.data.data.contextID,
		user.data.sessionId
	);

	// Si la requete n'a pas été successful
	if (!apiResponse.success) throw new Error("Failed to commit rules");

	return apiResponse;
}

firewallService.get("/commit", async (req, res) => {
	const apiResponse = await commitRules();
	if (!apiResponse.success) return res.status(500).json(apiResponse);

	return res.json(apiResponse);
});

firewallService.delete("/delete-rule", async (req, res) => {
	const { commit } = req.query;
	if (!req.body) return res.status(400).json(error({ message: "Missing body" }));

	const user = await login(env.USERNAME, env.PASSWORD);
	if (!user.success) return res.status(500).json(user);
	const apiResponse = await query(
		"Firewall",
		"deletePortForwarding",
		{ parameters: req.body },
		user.data.data.contextID,
		user.data.sessionId
	);

	// Si la requete n'a pas été successful
	if (!apiResponse.success) return res.status(500).json(apiResponse);

	if (commit === "true") {
		const commitResponse = await commitRules();
		if (!commitResponse.success) return res.status(500).json(commitResponse);
	}

	return res.json(apiResponse);
});
