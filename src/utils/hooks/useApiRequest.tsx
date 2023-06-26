import axios from 'axios';
import { useCallback } from "react";
import { useRequestState } from "./useRequestState";

type HttpMethod = "POST" | "GET" | "PUT" | "DELETE" | "PATCH";

export default function useApiRequest<Resp = unknown, Body = void>(
  path: string,
  method: HttpMethod = "POST"
) {
  const { setError, setLoading, setData, state } = useRequestState<Resp, string>();

  const fn = useCallback(
    async (body: Body) => {
      setLoading(true);

      try {
        const payload = JSON.stringify(body);

        const data = await executeAxiosRequest<Resp>(path, payload, method);

        setData(data);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : `Unknown error`;

        setError(message);

        return Promise.reject(error);
      }
    },
    [path, method, setLoading, setData, setError]
  );

  return [fn, state] as [typeof fn, typeof state];
}

async function executeAxiosRequest<Resp = unknown>(
  url: string,
  payload: string,
  method: HttpMethod = "POST"
) {
  const options: Record<string, any> = {
    method,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const methodsSupportingBody: HttpMethod[] = ["POST", "PUT", "PATCH", "GET", "DELETE"];

  const supportsBody = methodsSupportingBody.includes(method as HttpMethod);

  if (payload && supportsBody) {
    options.data = payload;
  }

  try {
    const response = await axios(url, options);

    if (response.status === 200) {
      return response.data as Resp;
    }

    return Promise.reject(response.statusText);
  } catch (e) {
    return Promise.reject(e);
  }
}
