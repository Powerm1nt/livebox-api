import express from "express";
import env from "../Common/Misc/ConfigProvider.mjs";
import { changePassword, getUsers, startChPasswd } from "../Common/Misc/v1.js";
export const userService = express.Router();

userService.get("/startchpasswd", async (req, res, next) => {
	const apiResponse = await startChPasswd(env.USERNAME, env.PASSWORD);
	if (!apiResponse.success) return res.status(500).json(apiResponse);
	return res.json(apiResponse);
});

userService.post("/chpasswd", async (req, res, next) => {
	if (!req.body) return res.status(400).json(error({ message: "Missing body" }));
	const apiResponse = await changePassword(env.USERNAME, env.PASSWORD, req.body.password);
	if (!apiResponse.success) return res.status(500).json(apiResponse);
	return res.json(apiResponse);
});

userService.get("/all", async (req, res, next) => {
    const apiResponse = await getUsers(env.USERNAME, env.PASSWORD);
	if (!apiResponse.success) return res.status(500).json(apiResponse);
	return res.json(apiResponse);
});
