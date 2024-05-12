import express from "express";
import env from "../Common/Misc/ConfigProvider.mjs";
import { checkForUpgrades, getLiveboxInfo, getNMC, getWANStatus, rebootLivebox } from "../Common/Misc/v1.js";
export const statusService = express.Router();

statusService.get("/info", async (req, res, next) => {
    const apiResponse = await getLiveboxInfo(env.USERNAME, env.PASSWORD);
	if (!apiResponse.success) return res.status(500).json(apiResponse);
	return res.json(apiResponse);
});

statusService.get("/reboot", async (req, res, next) => {
    const apiResponse = await rebootLivebox(env.USERNAME, env.PASSWORD);
	if (!apiResponse.success) return res.status(500).json(apiResponse);
	return res.json(apiResponse);
});

statusService.get("/check-updates", async (req, res, next) => {
    const apiResponse = await checkForUpgrades(env.USERNAME, env.PASSWORD);
	if (!apiResponse.success) return res.status(500).json(apiResponse);
	return res.json(apiResponse);
});

statusService.get("/wan-status", async (req, res, next) => {
    const apiResponse = await getWANStatus(env.USERNAME, env.PASSWORD);
	if (!apiResponse.success) return res.status(500).json(apiResponse);
	return res.json(apiResponse);
});

statusService.get("/nmc-status", async (req, res, next) => {
    const apiResponse = await getNMC(env.USERNAME, env.PASSWORD);
	if (!apiResponse.success) return res.status(500).json(apiResponse);
	return res.json(apiResponse);
});
