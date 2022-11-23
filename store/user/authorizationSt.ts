/* eslint-disable @typescript-eslint/no-var-requires */
import { action, observable, makeObservable } from 'mobx';
import Router from 'next/router';
import { ResponseDataRegT } from 'models/dataProfileStore';
import { UseFormTrigger } from 'react-hook-form';
import RootStore from '../rootStore';

const Crypto = require('crypto-js');

type FormValues = {
  email: string;
  password: string;
};

type EmailResetT = {
  emailResetOk: boolean;
};

type DataT = {
  email: string;
};

type DataSuthT = {
  password: string;
  email: string;
  'X-Fields'?: string;
};

type ResponseDataT = 'Success' | 'Code error' | "User doesn't exist";

type PasswordResetT = {
  emailNotFound: boolean;
  emailResetOk: boolean;
  email: string;
};

type DataRegT = {
  password: string;
  email: string;
  username: string;
  code: string;
  'X-Fields'?: string;
};

class AuthorizationSt {
  // `this` from rootstore passed to the constructor and we can
  // assign it to a variable accessible in this class called
  // `rootStore`. Therefore, we can access other store like
  // useStore for e.g (this.rootStore.profileStore)
  rootStore: RootStore;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @observable newPasswordReset: EmailResetT = {
    emailResetOk: false,
  };

  @action setNewPasswordReset = (name: string, value: boolean) => {
    this.newPasswordReset[name] = value;
  };

  @action saveNewPassword = (id: string, data: { password: string }) => {
    this.setNewPasswordReset('emailResetOk', false);
    this.rootStore
      .fetchData(`${this.rootStore.url}/password-reset/confirm/`, 'POST', {
        code: id,
        password: Crypto.SHA384(data.password.trim()).toString(),
      })
      .then((data: ResponseDataT) => {
        if (data !== undefined) {
          if (data === 'Success') {
            // "Success"
            this.setNewPasswordReset('emailResetOk', true);
          }
        }
      });
  };

  @observable passwordReset: PasswordResetT = {
    emailNotFound: false,
    emailResetOk: false,
    email: '',
  };

  @action setPasswordReset = (name: string, value: boolean) => {
    this.passwordReset[name] = value;
  };

  @action clickPasswordResetButton = (data: DataT) => {
    this.setPasswordReset('emailNotFound', false);
    this.setPasswordReset('emailResetOk', false);
    this.rootStore
      .fetchData(`${this.rootStore.url}/password-reset/`, 'POST', {
        email: data.email.toLowerCase(),
      })
      .then((data) => {
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

  @action setSignup = (name: string, value: string | null) => {
    this.signup[name] = value;
  };

  @action clickRegistrationButton = (data: DataRegT) => {
    this.setSignup('error', null);

    this.rootStore
      .fetchData(`${this.rootStore.url}/signup/`, 'POST', {
        email: data.email.toLowerCase(),
        password: Crypto.SHA384(data.password.trim()).toString(),
        username: data.username,
        code: data.code,
      })
      .then((data: ResponseDataRegT) => {
        if (data) {
          if (data.user) {
            this.rootStore.uiSt.setLoading('loading', true);

            this.rootStore.userSt.setUserAll(data);

            Router.push('/home');

            setTimeout(() => {
              this.rootStore.uiSt.setLoading('loading', false);
            }, 1500);
          }
          if (data.a === 'Malformed code (BadSignature)') {
            this.setSignup('error', 'Неверный код');
          }
          if (data.a === 'Invite not found') {
            this.setSignup('error', 'Код не найден');
          }
          if (data.a === 'Invite not found') {
            this.setSignup('error', 'Код истек');
          }
          if (data.a === 'Email already in use') {
            this.setSignup('error', 'E-mail уже зарегистрирован');
          }
        } else {
          this.setSignup('error', 'serverError');
        }
      });
  };

  @observable signin = {
    errorEmail: null,
    errorPassword: null,
    error: null,
  };

  @action setSignin = (name: string, value: string | null) => {
    this.signin[name] = value;
  };

  @action clickSigninButton = (data: DataSuthT, trigger: UseFormTrigger<FormValues>) => {
    this.setSignin('errorEmail', null);
    this.setSignin('errorPassword', null);
    this.setSignin('error', null);

    this.rootStore
      .fetchData(`${this.rootStore.url}/signin/`, 'POST', {
        email: data.email.toLowerCase(),
        password: Crypto.SHA384(data.password.trim()).toString(),
      })
      .then((data: ResponseDataRegT) => {
        if (data) {
          if (data.a === 'Success') {
            this.rootStore.uiSt.setLoading('loading', true);

            this.rootStore.userSt.setUserAll(data);

            Router.push('/home');

            setTimeout(() => {
              this.rootStore.uiSt.setLoading('loading', false);
            }, 1500);
          } else if (data.a === "User doesn't exist") {
            this.setSignin('errorEmail', 'Не удалось найти аккаунт');
            trigger();
          } else if (data.a === 'Wrong password') {
            this.setSignin('errorPassword', 'Неправильный пароль');
            trigger();
          }
        } else {
          this.setSignin('errorPassword', 'Неправильный пароль');
          trigger();
        }
      });
  };
}

export default AuthorizationSt;
