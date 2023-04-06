import { AuthAPI, SignupData, SigninData } from '../api/AuthAPI';
import { store } from '../utils/Store';
import router from '../utils/Router';

class AuthController {
  private api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  signup(data: SignupData) {
    this.api.signup(data)
      .then(() => {
        router.go('/profile');
      })
      .catch(console.log);
  }

  async signin(data: SigninData) {
    try {
      await this.api.singin(data);

      await this.fetchUser();
    } catch (err) {
      store.set('user.hasError', true);
    }
  }

  logout() {
    this.api.logout()
      .then(() => {
        router.go('/');
      })
      .catch(console.log);
  }

  async fetchUser() {
    store.set('user.isLoading', true);
    await this.api.getUser()
      .then((user) => {
        store.set('user.data', user);
      })
      .finally(() => {
        setTimeout(() => store.set('user.isLoading', false), 1000);
      });
  }
}

export default new AuthController();