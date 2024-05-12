export const headers = (token = "") => {
	return ({
		"Content-Type": "application/x-sah-ws-4-call+json",
		Authorization: `X-Sah ${token}`,
	});
};
