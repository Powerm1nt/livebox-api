export const headers = (token = "", sessionId = "") => {
	return {
		"Content-Type": "application/x-sah-ws-4-call+json",
		Authorization: token?.length > 0 ? `X-Sah ${token}` : 'X-Sah-Login',
        "X-Context": token,
        Cookie: `475ec806/sessid=${sessionId}; sah/contextId=${token};`
	};
};
