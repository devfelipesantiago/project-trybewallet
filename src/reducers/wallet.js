// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  REQUEST_CURRENCY,
  INPUT_WALLET,
  DELETE_EXPENSES,
  UPDATE_EXPENSES,
  EDIT_EXPENS,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  updateExpense: {},
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCY:
    return {
      ...state,
      currencies: action.response,
    };
  case INPUT_WALLET:
    console.log(state.expenses);
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: action.expenses,
    };
  case UPDATE_EXPENSES:
    return {
      ...state,
      updateExpense: action.updateExpense,
    };
  case EDIT_EXPENS: {
    const editedExpenses = state.expenses.map((e) => e);
    editedExpenses[action.id] = action.expenseEdited;
    return {
      ...state,
      expenses: editedExpenses,
    };
  }
  default:
    return state;
  }
};
export default wallet;
