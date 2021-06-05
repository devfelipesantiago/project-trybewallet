import requestApi from '../services/requestApi';

export const INPUT_LOGIN = 'INPUT_LOGIN';
export const INPUT_WALLET = 'INPUT_WALLET';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';
export const EDIT_EXPENS = 'EDIT_EXPENS';

export const user = (email) => ({
  type: INPUT_LOGIN,
  email,
});

export const wallet = (expenses) => ({
  type: INPUT_WALLET,
  currencies: [],
  expenses,
});

export const requestCurrecy = (response) => ({
  type: REQUEST_CURRENCY,
  response,
});

export const getCurrencies = () => async (dispatch) => {
  const currencies = await requestApi();
  dispatch(requestCurrecy(Object.keys(currencies)));
};

export const deleteExpenses = (newExpenses) => ({
  type: DELETE_EXPENSES,
  currencies: [],
  expenses: newExpenses,
});

export const updateExpenses = (updateExpense) => ({
  type: UPDATE_EXPENSES,
  updateExpense,
});

export const editedExpenses = ((id, newExpense) => ({
  type: EDIT_EXPENS,
  expenseEdited: newExpense,
  id,
}));
