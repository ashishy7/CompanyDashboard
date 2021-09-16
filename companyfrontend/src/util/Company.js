import HF from "../Helper/Helper";

class Company {
  #company;

  getCompanyInfo() {
    if (!this.#company) this.#company = HF.getItemFromLocalStorage("company");
    return this.#company;
  }
  setCompanyAndToken(companyAndToken) {
    HF.setItemsInLocalStorage(companyAndToken);
  }
}
const company = new Company();
export default company;
