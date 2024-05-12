import express from "express";
import { error } from "../Common/Misc/utils.js";
import env from "../Common/Misc/ConfigProvider.mjs";
import { addRule, commitFirewallRules, deleteRule, getRules } from "../Common/Misc/v1.js";
export const firewallService = express.Router();

firewallService.get("/rules", async (req, res) => {
	const apiResponse = await getRules(env.USERNAME, env.PASSWORD);
	return res.json(apiResponse);
});

firewallService.post("/add-rule", async (req, res) => {
	const { commit } = req.query;
	if (!req.body) return res.status(400).json(error({ message: "Missing body" }));
	const apiResponse = await addRule(env.USERNAME, env.PASSWORD, req.body, commit);
	if (!apiResponse.success) return res.status(500).json(apiResponse);
	return res.json(apiResponse);
});


firewallService.get("/commit", async (req, res) => {
	const apiResponse = await commitFirewallRules(env.USERNAME, env.PASSWORD);
	if (!apiResponse.success) return res.status(500).json(apiResponse);
	return res.json(apiResponse);
});

firewallService.delete("/delete-rule", async (req, res) => {
	const { commit } = req.query;
	if (!req.body) return res.status(400).json(error({ message: "Missing body" }));
	const apiResponse = await deleteRule(env.USERNAME, env.PASSWORD, req.body, commit);
	if (!apiResponse.success) return res.status(500).json(apiResponse);
	return res.json(apiResponse);
});
