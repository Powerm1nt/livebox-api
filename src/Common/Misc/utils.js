import env from "../../Common/Misc/ConfigProvider.mjs";
import { headers } from "./headers";

export function error(data = {}) {
  return ({
    success: false,
    data
  })
}

export function success(data = {}) {
  return ({
    success: true,
    data
  })
}

export async function query(service, method = "get", data = { parameters: {} }, token = "", sessionId = "") {
    const apiResponse = await fetch(`${env.LIVEBOX_URL}/ws`, {
        method: "POST",
        headers: headers(token, sessionId),
        body: JSON.stringify({
            service,
            method,
            ...data
        })
    })
        .then(async r => {
            let sessionId = ""
            
            if (method === "createContext") {
                sessionId = r.headers.getSetCookie()[2].split(';')[0].replace('475ec806/sessid=', '')
            }

            const payload = await r.json()
            return success({ ...payload, sessionId })
        })
        .catch(e => error({ message: e.message }));

    return apiResponse;
}

export async function login (username, password) {
  const apiResponse = await query("sah.Device.Information", "createContext", {
    parameters: {
      applicationName: "webui",
      username,
      password
    }
  });

//   console.log(apiResponse.res.cookies)

  return { ...apiResponse };
}

