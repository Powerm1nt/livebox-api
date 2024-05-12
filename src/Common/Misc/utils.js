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

export async function query(service, method = "get", data = { parameters: {} }) {
    const apiResponse = await fetch(`${env.LIVEBOX_URL}/ws`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({
            service,
            method,
            ...data
        })
    })
        .then(async r => success(await r.json()))
        .catch(e => error({ message: e.message }));

    return apiResponse;
}