import { login, query } from "./utils";

export const commitFirewallRules = async (username, password) => {
	const user = await login(username, password);
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

export const deleteRule = async (username, password, body, commit) => {
    const user = await login(username, password);
	if (!user.success) throw new Error("Failed to login");
	const apiResponse = await query(
		"Firewall",
		"deletePortForwarding",
		{ parameters: body },
		user.data.data.contextID,
		user.data.sessionId
	);

	// Si la requete n'a pas été successful
	if (!apiResponse.success) throw new Error("Failed to delete rule");

	if (commit === "true") {
		const commitResponse = await commitFirewallRules(username, password);
		if (!commitResponse.success) throw new Error("Failed to commit rules");
	}

    return apiResponse;
}

export const addRule = async (username, password, body, commit) => {
    const user = await login(username, password);
	if (!user.success) throw new Error("Failed to login");
	const apiResponse = await query(
		"Firewall",
		"setPortForwarding",
		{ parameters: body },
		user.data.data.contextID,
		user.data.sessionId
	);

	// Si la requete n'a pas été successful
	if (!apiResponse.success) throw new Error("Failed to add rule");

	if (commit === "true") {
		const commitResponse = await commitFirewallRules(username, password);
		if (!commitResponse.success) throw new Error("Failed to commit rules");
	}

    return apiResponse;
}

export const getRules = async (username, password) => {
    const user = await login(username, password);
	if (!user.success) throw new Error("Failed to login");
	const apiResponse = await query(
        "Firewall",
        "getPortForwarding",
        { parameters: {} },
        user.data.data.contextID,
        user.data.sessionId
    );

	// Si la requete n'a pas été successful
	if (!apiResponse.success) throw new Error("Failed to add rule");
    return apiResponse;
}

export const getDevices = async (username, password, isActive) => {
    const user = await login(username, password);
	if (!user.success) throw new Error("Failed to login");

    const apiResponse = await query(
		"Devices",
		"get",
		{ parameters: {} },
		user.data.data.contextID,
		user.data.sessionId
	);

	if (isActive) {
		const devices = apiResponse.data.status.filter(
			(device) => device.Active === true
		);
		apiResponse.data.status = devices;
	}

    return apiResponse;
}

export const getLiveboxInfo = async (username, password) => {
    const user = await login(username, password);
	if (!user.success) return res.status(500).json(user);
    const apiResponse = await query("DeviceInfo", "get", { parameters: {} }, user.data.data.contextID, user.data.sessionId);

    // Si la requete n'a pas été successful
	if (!apiResponse.success) throw new Error("Failed to add rule");
    return apiResponse;
}  

export const rebootLivebox = async (username, password) => {
    const user = await login(username, password);
	if (!user.success) return res.status(500).json(user);
    const apiResponse = await query(
        "NMC",
        "reboot",
        { parameters: { reason: 'GUI_Reboot' } },
        user.data.data.contextID,
        user.data.sessionId
    );
    // Si la requete n'a pas été successful
	if (!apiResponse.success) throw new Error("Failed to add rule");
    return apiResponse;
}  

export const checkForUpgrades = async (username, password) => {
    const user = await login(username, password);
	if (!user.success) return res.status(500).json(user);
    const apiResponse = await query(
        "NMC",
        "checkForUpgrades",
        { parameters: {} },
        user.data.data.contextID,
        user.data.sessionId
    );
    // Si la requete n'a pas été successful
	if (!apiResponse.success) throw new Error("Failed to add rule");
    return apiResponse;
}  