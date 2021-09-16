import HF from "../Helper/Helper";
import BE from "./backend";

class AuthHandler {
  #token = null;
  async signUp(userData) {
    const datafromBackend = await BE.customPOSTFetch("/signup", userData);
    return datafromBackend;
  }
  async signIn(userData) {
    console.log("USER", userData);
    const datafromBackend = await BE.customPOSTFetch("/signin", userData);
    return datafromBackend;
  }
  isAuthenticated() {
    return !!HF.getItemFromLocalStorage("token", true);
  }
  getAuthToken() {
    if (!this.#token) this.#token = HF.getItemFromLocalStorage("token");
    return this.#token;
  }
  signOut() {
    this.#token = null;
    HF.removeItemsInLocalStorage(["token", "company"]);
  }
}
const auth = new AuthHandler();
export default auth;
