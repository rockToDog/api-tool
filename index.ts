import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";

export type Deep<T, R> = {
  [Key in keyof T]: T[Key] extends object ? Deep<T[Key], R> : R;
};

export type Request = <ResponseType>(
  RequestConfig?: {
    path?: any;
  } & Omit<AxiosRequestConfig, "method" | "url">
) => Promise<AxiosResponse<ResponseType, any>>;

export const createApi = <T>(
  api: Record<string, any>,
  instance?: AxiosInstance
): Deep<T, Request> => {
  const res = {};
  const loop = (api: Record<string, any>, res: Record<string, any>) => {
    Object.keys(api).forEach((key) => {
      if (typeof api[key] === "string") {
        let request: Request = ({ data, params, path, ...rest } = {}) => {
          let [method, url] = api[key].trim().split(" ");
          if (method && url) {
            if (path) {
              Object.keys(path).forEach((key) => {
                url = url.replace(`{${key}}`, path[key]);
              });
            }

            const options: AxiosRequestConfig = {
              method,
            };

            if (params) {
              options.params = params;
            }

            if (["PUT", "POST", "DELETE", "PATCH"].includes(method) && data) {
              options["data"] = data;
            }

            return (instance ?? axios)(url, {
              ...options,
              ...rest,
            });
          } else {
            throw new Error(`incorrect API information: ${key}: ${api[key]}`);
          }
        };
        res[key] = request;
      } else {
        res[key] = loop(api[key], {});
      }
    });

    return res;
  };
  return loop(api, res) as unknown as Deep<T, Request>;
};

export default createApi;
