export const initialState = {
  Employees: [],
  isVisible: false,
  isCreateFormdialogOpen: false,
};
export const actionTypes = {
  SET_EMPLOYEELIST: "SET_EMPLOYEELIST",
  SET_VISIBLE: "SET_VISIBLE",
  SET_CREATE_FORM_DIALOG_OPEN: "SET_CREATE_FORM_DIALOG_OPEN",
  SET_DETAIL_PAGE_OPEN: "SET_DETAIL_PAGE_OPEN",
};
const reducer = (state, action) => {
  if (action) {
    switch (action.type) {
      case actionTypes.SET_EMPLOYEELIST:
        return { ...state, Employees: action.payload };
      case actionTypes.SET_VISIBLE:
        return { ...state, isVisible: action.isVisible };
      case actionTypes.SET_CREATE_FORM_DIALOG_OPEN:
        return {
          ...state,
          isCreateFormdialogOpen: !state.isCreateFormdialogOpen,
        };
      default:
        return state;
    }
  }
};
export default reducer;
