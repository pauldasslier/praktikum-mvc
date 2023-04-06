import Block from '../../utils/Block';
import template from './register.hbs';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input/input';
import styles from './styles.module.pcss';
import { Link } from '../../components/Link';
import authController from '../../controllers/AuthController';

export class RegisterPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.firstName = new Input({
      name: 'first_name',
      type: 'text',
      placeholder: 'Имя'
    });

    this.children.secondName = new Input({
      name: 'second_name',
      type: 'text',
      placeholder: 'Фамилия'
    });

    this.children.email = new Input({
      name: 'email',
      type: 'email',
      placeholder: 'E-mail'
    });

    this.children.login = new Input({
      name: 'login',
      type: 'text',
      placeholder: 'Логин'
    });

    this.children.phone = new Input({
      name: 'phone',
      type: 'tel',
      placeholder: 'Телефон'
    });

    this.children.password = new Input({
      name: 'password',
      type: 'password',
      placeholder: 'Пароль'
    });

    this.children.button = new Button({
      label: 'Зарегистрироваться',
      events: {
        click: () => this.onSubmit(),
      },
    });

    this.children.link = new Link({
      //@ts-ignore 
      label: 'Войти',
      to: '/'
    });
  }

  onSubmit() {
    const values = Object
      .values(this.children)
      .filter(child => child instanceof Input)
      .map((child) => ([(child as Input).getName(), (child as Input).getValue()]))

    const data = Object.fromEntries(values);

    authController.signup(data);
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
