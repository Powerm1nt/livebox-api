import express from "express";
import env from "../Common/Misc/ConfigProvider.mjs";
import { getDevices } from "../Common/Misc/v1.js";
export const deviceService = express.Router();

deviceService.get("/all", async (req, res) => {
	const { active } = req.query;
	const apiResponse = await getDevices(env.USERNAME, env.PASSWORD, active === "true");
	if (!apiResponse.success) return res.status(500).json(apiResponse);
	return res.json(apiResponse);
});
