import express from "express";
import { login, query } from "../Common/Misc/utils.js";
import env from "../Common/Misc/ConfigProvider.mjs";
export const statusService = express.Router();

statusService.get("/info", async (req, res, next) => {
    const user = await login(env.USERNAME, env.PASSWORD);
	if (!user.success) return res.status(500).json(user);
    const apiResponse = await query("DeviceInfo", "get", { parameters: {} }, user.data.data.contextID, user.data.sessionId);

	// Si la requete n'a pas été successful
	if (!apiResponse.success) return res.status(500).json(apiResponse);

	return res.json(apiResponse);
});

statusService.get("/reboot", async (req, res, next) => {
    const user = await login(env.USERNAME, env.PASSWORD);
	if (!user.success) return res.status(500).json(user);
    const apiResponse = await query(
        "NMC",
        "reboot",
        { parameters: { reason: 'GUI_Reboot' } },
        user.data.data.contextID,
        user.data.sessionId
    );

	// Si la requete n'a pas été successful
	if (!apiResponse.success) return res.status(500).json(apiResponse);

	return res.json(apiResponse);
});

statusService.get("/check-updates", async (req, res, next) => {
    const user = await login(env.USERNAME, env.PASSWORD);
	if (!user.success) return res.status(500).json(user);
    const apiResponse = await query(
        "NMC",
        "checkForUpgrades",
        { parameters: {} },
        user.data.data.contextID,
        user.data.sessionId
    );

	// Si la requete n'a pas été successful
	if (!apiResponse.success) return res.status(500).json(apiResponse);

	return res.json(apiResponse);
});