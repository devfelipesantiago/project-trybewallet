import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { user } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validateUser());
  }

  validateUser() {
    const { email, password } = this.state;
    const emailRegex = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);
    const passwordRegex = new RegExp(/[\w\D]{6}/g);
    if (emailRegex.test(email) && passwordRegex.test(password)) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  handleClick() {
    const { emailDispatcher } = this.props;
    const { email } = this.state;
    emailDispatcher(email);
  }

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <form>
        <label htmlFor="email">
          Email
          <input
            type="text"
            name="email"
            value={ email }
            id="email"
            data-testid="email-input"
            onChange={ this.handleChange.bind(this) }
          />
        </label>
        <label htmlFor="login-password">
          Password
          <input
            type="password"
            name="password"
            value={ password }
            id="login-password"
            data-testid="password-input"
            onChange={ this.handleChange.bind(this) }
          />
        </label>
        <Link to="/carteira">
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ this.handleClick.bind(this) }
          >
            ENTRAR
          </button>
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispach) => ({
  emailDispatcher: (email) => dispach(user(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  emailDispatcher: PropTypes.func.isRequired,
};
