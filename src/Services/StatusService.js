import express from "express";
import { error, query, success } from "../Common/Misc/utils.js";
import { headers } from "../Common/Misc/headers.js";

export const statusService = express.Router();

statusService.get("/", async (req, res) => {
	const apiResponse = await query("DeviceInfo", "get", { parameters: {} });

	if (!apiResponse.success) return res.status(500).json(apiResponse);
	return res.json(apiResponse);
});
