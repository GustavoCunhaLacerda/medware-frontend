import { ofetch, FetchOptions } from "ofetch";
import MedicineApi from "./medicine";

const baseURL = "https://bula.vercel.app/";

export default class Api {
  public getMedicineApi() {
    return new MedicineApi(this.getApi());
  }

  private getApi() {
    return ofetch.create(this.getOptions());
  }

  private getOptions(): FetchOptions {
    return {
      baseURL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      retry: 3,
      onRequestError: this.onRequestError,
      onResponseError: this.onResponseError,
    };
  }

  private onRequestError({ request, options, error }: any) {
    // eslint-disable-next-line no-console
    console.log("[fetch request error]", request, error, options);

    return request;
  }

  private onResponseError({ request, response, options }: any) {
    // eslint-disable-next-line no-console
    console.log(
      "[fetch response error]",
      request,
      response,
      response.status,
      response.body,
      options
    );

    return response;
  }
}
