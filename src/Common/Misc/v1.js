import { login, query } from "./utils";

export const commitFirewallRules = async (username, password) => {
	const user = await login(username, password);
	if (!user.success) throw new Error("Failed to login");
	const apiResponse = await query(
		"Firewall",
		"commit",
		{ parameters: {} },
		user.data.data.contextID,
		user.data.sessionId,
	);

	if (!apiResponse.success) throw new Error("Failed to commit rules");

	return apiResponse;
};

export const deleteRule = async (username, password, body, commit) => {
	const user = await login(username, password);
	if (!user.success) throw new Error("Failed to login");
	const apiResponse = await query(
		"Firewall",
		"deletePortForwarding",
		{ parameters: body },
		user.data.data.contextID,
		user.data.sessionId,
	);

	if (!apiResponse.success) throw new Error("Failed to delete rule");

	if (commit === "true") {
		const commitResponse = await commitFirewallRules(username, password);
		if (!commitResponse.success) throw new Error("Failed to commit rules");
	}

	return apiResponse;
};

export const addRule = async (username, password, body, commit) => {
	const user = await login(username, password);
	if (!user.success) throw new Error("Failed to login");
	const apiResponse = await query(
		"Firewall",
		"setPortForwarding",
		{ parameters: body },
		user.data.data.contextID,
		user.data.sessionId,
	);

	if (!apiResponse.success) throw new Error("Failed to add rule");

	if (commit === "true") {
		const commitResponse = await commitFirewallRules(username, password);
		if (!commitResponse.success) throw new Error("Failed to commit rules");
	}

	return apiResponse;
};

export const setIPV4FirewallLevel = async (username, password, level) => {
	const user = await login(username, password);
	if (!user.success) throw new Error("Failed to login");
	const apiResponse = await query(
		"Firewall",
		"setFirewallLevel",
		{ parameters: { level } },
		user.data.data.contextID,
		user.data.sessionId,
	);

	if (!apiResponse.success) throw new Error("Failed to set firewall level");
	return apiResponse;
};

export const setIPV6FirewallLevel = async (username, password, level) => {
	const user = await login(username, password);
	if (!user.success) throw new Error("Failed to login");
	const apiResponse = await query(
		"Firewall",
		"setFirewallIPv6Level",
		{ parameters: { level } },
		user.data.data.contextID,
		user.data.sessionId,
	);

	if (!apiResponse.success) throw new Error("Failed to set firewall level");
	return apiResponse;
};

export const getRules = async (username, password) => {
	const user = await login(username, password);
	if (!user.success) throw new Error("Failed to login");
	const apiResponse = await query(
		"Firewall",
		"getPortForwarding",
		{ parameters: {} },
		user.data.data.contextID,
		user.data.sessionId,
	);

	if (!apiResponse.success) throw new Error("Failed to get rules");
	return apiResponse;
};

export const getDevices = async (username, password, isActive) => {
	const user = await login(username, password);
	if (!user.success) throw new Error("Failed to login");

	const apiResponse = await query(
		"Devices",
		"get",
		{ parameters: {} },
		user.data.data.contextID,
		user.data.sessionId,
	);

	if (isActive) {
		const devices = apiResponse.data.status.filter(
			(device) => device.Active === true,
		);
		apiResponse.data.status = devices;
	}

	if (!apiResponse.success) throw new Error("Failed to get devices");
	return apiResponse;
};

export const getLiveboxInfo = async (username, password) => {
	const user = await login(username, password);
	if (!user.success) throw new Error("Failed to login");
	const apiResponse = await query(
		"DeviceInfo",
		"get",
		{ parameters: {} },
		user.data.data.contextID,
		user.data.sessionId,
	);

	if (!apiResponse.success) throw new Error("Failed to get livebox info");
	return apiResponse;
};

export const rebootLivebox = async (username, password) => {
	const user = await login(username, password);
	if (!user.success) throw new Error("Failed to login");
	const apiResponse = await query(
		"NMC",
		"reboot",
		{ parameters: { reason: "GUI_Reboot" } },
		user.data.data.contextID,
		user.data.sessionId,
	);

	if (!apiResponse.success) throw new Error("Failed to reboot livebox");
	return apiResponse;
};

export const checkForUpgrades = async (username, password) => {
	const user = await login(username, password);
	if (!user.success) throw new Error("Failed to login");
	const apiResponse = await query(
		"NMC",
		"checkForUpgrades",
		{ parameters: {} },
		user.data.data.contextID,
		user.data.sessionId,
	);

	if (!apiResponse.success) throw new Error("Failed to check for upgrades");
	return apiResponse;
};

export const getWANStatus = async (username, password) => {
	const user = await login(username, password);
	if (!user.success) throw new Error("Failed to login");
	const apiResponse = await query(
		"NMC",
		"getWANStatus",
		{ parameters: {} },
		user.data.data.contextID,
		user.data.sessionId,
	);

	if (!apiResponse.success) throw new Error("Failed to get WAN status");
	return apiResponse;
};

export const getNMC = async (username, password) => {
	const user = await login(username, password);
	if (!user.success) throw new Error("Failed to login");
	const apiResponse = await query(
		"NMC",
		"get",
		{ parameters: {} },
		user.data.data.contextID,
		user.data.sessionId,
	);

	if (!apiResponse.success) throw new Error("Failed to get NMC status");
	return apiResponse;
};

export const getUsers = async (username, password) => {
	const user = await login(username, password);
	if (!user.success) throw new Error("Failed to login");
	const apiResponse = await query(
		"UserManagement",
		"getUsers",
		{ parameters: {} },
		user.data.data.contextID,
		user.data.sessionId,
	);

	if (!apiResponse.success) throw new Error("Failed to get NMC status");
	return apiResponse;
};

export const startChPasswd = async (username, password) => {
	const user = await login(username, password);
	if (!user.success) throw new Error("Failed to login");
	const apiResponse = await query(
		"PasswordRecovery",
		"start",
		{ parameters: {} },
		user.data.data.contextID,
		user.data.sessionId,
	);

	if (!apiResponse.success) throw new Error("Failed to get NMC status");
	return apiResponse;
};

export const changePassword = async (username, password, newPassword) => {
	const user = await login(username, password);
	if (!user.success) throw new Error("Failed to login");
	const apiResponse = await query(
		"PasswordRecovery",
		"setPassword",
		{ parameters: { password: newPassword } },
		user.data.data.contextID,
		user.data.sessionId,
	);

	if (!apiResponse.success) throw new Error("Failed to get NMC status");
	return apiResponse;
};

export const changePingConfig = async (username, password, svcEnable) => {
	const user = await login(username, password);
	if (!user.success) throw new Error("Failed to login");
	const apiResponse = await query(
		"Firewall",
		"setRespondToPing",
		{
			parameters: {
				service_enable: svcEnable,
				sourceInterface: "data",
			},
		},
		user.data.data.contextID,
		user.data.sessionId,
	);

	if (!apiResponse.success) throw new Error("Failed to get NMC status");
	return apiResponse;
};

export const getPingConfig = async (username, password) => {
	const user = await login(username, password);
	if (!user.success) throw new Error("Failed to login");
	const apiResponse = await query(
		"Firewall",
		"getRespondToPing",
		{
			parameters: {
				sourceInterface: "data",
			},
		},
		user.data.data.contextID,
		user.data.sessionId,
	);

	if (!apiResponse.success) throw new Error("Failed to get NMC status");
	return apiResponse;
};
