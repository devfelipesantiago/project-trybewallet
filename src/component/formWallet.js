import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { wallet, editedExpenses } from '../actions';
import currencyApi from '../services/requestApi';

const methodList = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tagList = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class FormWallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: '',
    };

    this.createOptions = this.createOptions.bind(this);
    this.createSelect = this.createSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  createOptions() {
    const { listCurrenciesState } = this.props;
    return listCurrenciesState.map((element) => (
      <option
        key={ element }
        value={ element }
        data-testid={ element }
      >
        { element }
      </option>
    ));
  }

  createSelect(array, name, data, onChange) {
    return (
      <select
        name={ name }
        id={ name }
        data-testid={ data }
        onChange={ onChange }
      >
        {array.map((element) => (
          <option key={ element }>{ element }</option>
        )) }
      </select>
    );
  }

  createInputs(name, type, data, value) {
    return (<input
      name={ name }
      id={ name }
      value={ value }
      type={ type }
      data-testid={ data }
      onChange={ this.handleChange }
    />);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClickEditExpense() {
    const { updateExpensesState, editedExpensesDispatched } = this.props;
    const { value, description, currency, method, tag } = this.state;

    const expenseEdited = {
      id: updateExpensesState.id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: updateExpensesState.exchangeRates,
    };
    console.log(expenseEdited);
    editedExpensesDispatched(updateExpensesState.id, expenseEdited);
  }

  async handleClickAdd() {
    const { expensesDispatched } = this.props;
    const { id } = this.state;

    const data = await currencyApi();
    await this.setState(() => ({
      exchangeRates: data,
    }));
    console.log(this.state);
    expensesDispatched(this.state);
    this.setState({
      id: id + 1,
      value: 0,
      description: '',
    });
  }

  render() {
    const { value, description } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            { this.createInputs('value', 'number', 'value-input', value) }
          </label>
          <label htmlFor="description">
            Descrição:
            { this.createInputs('description', 'text', 'description-input', description) }
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              id="currency"
              data-testid=" currency-input"
              onChange={ this.handleChange }
            >
              { this.createOptions() }
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            { this.createSelect(methodList, 'method', 'method-input', this.handleChange) }
          </label>
          <label htmlFor="tag">
            Tag:
            { this.createSelect(tagList, 'tag', 'tag-input', this.handleChange) }
          </label>
          <button type="button" onClick={ this.handleClickAdd.bind(this) }>
            Adicionar despesa
          </button>
          <button type="button" onClick={ this.handleClickEditExpense.bind(this) }>
            Editar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listCurrenciesState: state.wallet.currencies,
  updateExpensesState: state.wallet.updateExpense,
});

const mapDispatchToProps = (dispatch) => ({
  expensesDispatched: (expenses) => dispatch(wallet(expenses)),
  editedExpensesDispatched: (id, newExpense) => dispatch(editedExpenses(id, newExpense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormWallet);

FormWallet.propTypes = {
  listCurrenciesState: PropTypes.func.isRequired,
  expensesDispatched: PropTypes.func.isRequired,
  updateExpensesState: PropTypes.objectOf.isRequired,
  editedExpensesDispatched: PropTypes.func.isRequired,
};
