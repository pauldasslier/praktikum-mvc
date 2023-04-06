import Block from '../../utils/Block';
import template from './login.hbs';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input/input';
import styles from './styles.module.pcss';
import { Link } from '../../components/Link';
import authController from '../../controllers/AuthController';

export class LoginPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.login = new Input({
      name: 'login',
      type: 'text',
      placeholder: 'Логин'
    });

    this.children.password = new Input({
      name: 'password',
      type: 'password',
      placeholder: 'Пароль'
    });

    this.children.button = new Button({
      label: 'Войти',
      events: {
        click: () => this.onSubmit()
      },
    });

    this.children.link = new Link({
      //@ts-ignore
      label: 'Регистрация',
      to: '/register'
    });
  }

  onSubmit() {
    const values = Object
      .values(this.children)
      .filter(child => child instanceof Input)
      .map((child) => ([(child as Input).getName(), (child as Input).getValue()]))

    const data = Object.fromEntries(values);

    authController.signin(data);
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
