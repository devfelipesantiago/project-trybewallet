import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenses, wallet, updateExpenses } from '../actions';

class ExpenseAddForm extends React.Component {
  createrExpenses() {
    const { stateProps } = this.props;
    const expenses = stateProps;

    if (expenses !== undefined) {
      return expenses
        .map(({ id, value, description, currency, method, tag, exchangeRates }) => {
          const { name, ask } = exchangeRates[currency];
          const total = value * Number(ask);
          return (
            <tr key={ id } id={ id }>
              <td name={ description }>{ description }</td>
              <td name={ tag }>{ tag }</td>
              <td name={ method }>{ method }</td>
              <td name={ Number(ask).toFixed(2) }>
                { `${Number(ask).toFixed(2)}` }
              </td>
              <td name={ name.split('/')[0] }>{ name.split('/')[0] }</td>
              <td name={ value }>{ value }</td>
              <td>{ `${total.toFixed(2)}` }</td>
              <td>Real</td>
              <td>
                <button
                  id={ id }
                  type="button"
                  data-testid="edit-btn"
                  onClick={ (e) => this.handleClickEdit(e) }
                >
                  Editar
                </button>
              </td>
              <td>
                <button
                  id={ id }
                  type="button"
                  data-testid="delete-btn"
                  onClick={ this.handleClickDelete.bind(this) }
                >
                  Exluir
                </button>
              </td>
            </tr>
          );
        });
    }
  }

  handleClickDelete({ target: { id } }) {
    const { stateProps, expensesUpdateDispatched } = this.props;
    const ids = Number(id);
    const newExpenses = stateProps.filter((expense) => expense.id !== ids);
    expensesUpdateDispatched(newExpenses);
  }

  handleClickEdit({ target }) {
    const { stateProps, editExpensesDispatched } = this.props;
    const ids = Number(target.id);

    const editExpenses = stateProps.filter((expense) => expense.id === ids);

    const newObject = {
      id: editExpenses[0].id,
      value: editExpenses[0].value,
      description: editExpenses[0].description,
      currency: editExpenses[0].currency,
      method: editExpenses[0].method,
      tag: editExpenses[0].tag,
      exchangeRates: editExpenses[0].exchangeRates,
    };

    editExpensesDispatched(newObject);
  }

  render() {
    return (
      <div>
        <table>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          { this.createrExpenses() }
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stateProps: state.wallet.expenses,
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  expensesUpdateDispatched: (expenses) => dispatch(deleteExpenses(expenses)),
  expensesDispatched: (expenses) => dispatch(wallet(expenses)),
  editExpensesDispatched: (updateExpense) => dispatch(updateExpenses(updateExpense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseAddForm);

ExpenseAddForm.propTypes = {
  stateProps: PropTypes.array,
}.isRequired;
