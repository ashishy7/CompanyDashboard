import CONSTANTS from "../Helper/Constants";
import HF from "../Helper/Helper";
const { SUCCESS_CODE_LIST, AUTHORIZATION } = CONSTANTS;
class Backend {
  constructor() {
    this.API = process.env.REACT_APP_API_URL || "";
  }
  async customFetch(URI_PATH, token) {
    try {
      const options = {
        mode: "cors",
        cache: "no-cache",
      };

      if (token) {
        options["headers"] = {};
        options["headers"][AUTHORIZATION] = token;
      }
      const response = await fetch(this.API + URI_PATH, options);
      const isSuccess = SUCCESS_CODE_LIST.includes(response.status);
      if (isSuccess) return { success: isSuccess, data: response.json() };
    } catch (exception) {
      return Promise.reject();
    }
  }
  async customPOSTFetch(URI_PATH, body, token) {
    try {
      const options = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(body),
      };
      if (token) {
        options["headers"][AUTHORIZATION] = token;
      }
      const response = await fetch(this.API + URI_PATH, options);
      const isSuccess = SUCCESS_CODE_LIST.includes(response.status);
      return { success: isSuccess, data: response.json() };
    } catch (exception) {
      return Promise.reject();
    }
  }

  signOut() {
    HF.removeItemsInLocalStorage(["user", "token"]);
  }
}
const BE = new Backend();
export default BE;
