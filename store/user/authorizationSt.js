/* eslint-disable no-undef */
/* eslint-disable no-shadow */
import { action, observable, makeObservable } from 'mobx';
import Router from 'next/router';

const Crypto = require('crypto-js');

class AuthorizationSt {
  // `this` from rootstore passed to the constructor and we can
  // assign it to a variable accessible in this class called
  // `rootStore`. Therefore, we can access other store like
  // useStore for e.g (this.rootStore.userStore)
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @observable newPasswordReset = {
    emailResetOk: false,
  };

  @action setNewPasswordReset = (name, value) => {
    this.newPasswordReset[name] = value;
  };

  @action saveNewPassword = (id, data) => {
    this.setNewPasswordReset('emailResetOk', false);
    this.rootStore
      .fetchData(`${this.rootStore.url}/password-reset/confirm/`, 'POST', {
        code: id,
        password: Crypto.SHA384(data.password.trim()).toString(),
      })
      .then((data) => {
        if (data !== undefined) {
          if (data.a === 'Success') {
            // "Success"
            this.setNewPasswordReset('emailResetOk', true);
          }
        }
      });
  };

  @observable passwordReset = {
    emailNotFound: false,
    emailResetOk: false,
  };

  @action setPasswordReset = (name, value) => {
    this.passwordReset[name] = value;
  };

  @action clickPasswordResetButton = (data) => {
    this.setPasswordReset('emailNotFound', false);
    this.setPasswordReset('emailResetOk', false);
    this.rootStore
      .fetchData(`${this.rootStore.url}/password-reset/`, 'POST', {
        email: data.email.toLowerCase(),
      })
      .then((data) => {
        console.log(data);
        if (data !== undefined) {
          if (data.a === true) {
            this.setPasswordReset('emailResetOk', true);
          } else if (data.a === false) {
            this.setPasswordReset('emailNotFound', true);
          }
        }
      });
  };

  @observable signup = {
    error: null,
  };

  @action setSignup = (name, value) => {
    this.signup[name] = value;
  };

  @action clickRegistrationButton = (data) => {
    this.setSignup('error', null);
    this.rootStore
      .fetchData(`${this.rootStore.url}/reg/`, 'POST', {
        email: data.email.toLowerCase(),
        password: Crypto.SHA384(data.password.trim()).toString(),
        username: data.username,
        code: data.code,
      })
      .then((data) => {
        if (data !== undefined) {
          if (data.user) {
            this.rootStore.uiSt.setLoading('loading', true);
            const { id, username, language } = data.user;
            this.rootStore.uiSt.setLoading('loading', true);
            this.rootStore.userSt.setSettings('id', id);
            this.rootStore.userSt.setSettings('username', username);
            this.rootStore.userSt.setSettings('darkTheme', data.user['dark-theme']);
            this.rootStore.userSt.setSettings('language', language);
            Router.push('/home');
            setTimeout(() => {
              this.rootStore.uiSt.setLoading('loading', false);
            }, 1500);
          }
          if (data.a === 'Malformed code (BadSignature)') {
            this.setSignup('error', 'Неверный код-приглашение');
          }
          if (data.a === 'Invite not found') {
            this.setSignup('error', 'Код-приглашение не найден');
          }
          if (data.a === 'Invite not found') {
            this.setSignup('error', 'Код-приглашение истек');
          }
          if (data.a === 'Email already in use') {
            this.setSignup('error', 'E-mail уже зарегистрирован');
          }
        } else {
          this.setSignup('error', 'serverError');
        }
      });
  };

  @observable login = {
    error: null,
  };

  @action setLogin = (name, value) => {
    this.login[name] = value;
  };

  @action clickEnterButton = (data, trigger) => {
    this.setLogin('error', null);
    this.rootStore
      .fetchData(`${this.rootStore.url}/auth/`, 'POST', {
        email: data.email.toLowerCase(),
        password: Crypto.SHA384(data.password.trim()).toString(),
      })
      .then((data) => {
        if (data !== undefined) {
          if (data.user) {
            this.rootStore.uiSt.setLoading('loading', true);
            const { id, username, language } = data.user;
            this.rootStore.uiSt.setLoading('loading', true);
            this.rootStore.userSt.setSettings('id', id);
            this.rootStore.userSt.setSettings('username', username);
            this.rootStore.userSt.setSettings('darkTheme', data.user['dark-theme']);
            this.rootStore.userSt.setSettings('language', language);
            this.rootStore.communitiesMenuSt.setUserCommunities(data.communities);
            Router.push('/home');
            setTimeout(() => {
              this.rootStore.uiSt.setLoading('loading', false);
            }, 1500);
          } else if (data.a === "User doesn't exist") {
            this.setLogin('error', "User doesn't exist");
            trigger();
          } else if (data.a === 'Wrong password') {
            this.setLogin('error', 'Wrong password');
            trigger();
          }
        } else {
          this.setLogin('error', 'Server error');
          trigger();
        }
      });
  };
}

export default AuthorizationSt;
