import Block from '../../utils/Block';
import template from './profile.hbs';
import { Button } from '../../components/Button';
import { withStore } from '../../utils/Store';
import authController from '../../controllers/AuthController';

class ProfilePageBase extends Block {
  init() {
    this.children.button = new Button({
      label: 'Выйти',
      events: {
        click: () => {
          authController.logout();
        }
      }
    })
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withUser = withStore((state) => ({ ...state.user }));

export const ProfilePage = withUser(ProfilePageBase);
