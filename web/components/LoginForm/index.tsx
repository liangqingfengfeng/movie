import request from '@/util/request';
import { Form, Input, Toast } from 'antd-mobile';
import classNames from 'classnames';
import React, { useState } from 'react';
import styles from './index.less';

export enum LoginAction {
  Login = 'login',
  Register = 'register',
}

type Props = {
  action: LoginAction;
  onSubmit?: () => void;
};

type LoginForm = {
  name: string;
  password: string;
  passwordConfirm: string;
};

const ACTIONMAP = {
  login: '登录',
  register: '注册',
};

export default function LoginForm(props: Props) {
  const { action, onSubmit } = props;
  const [form] = Form.useForm();
  const [finish, setFinish] = useState(false);

  const handleSubmit = () => {
    const { name, password, passwordConfirm } = form.getFieldsValue(true);
    if (action === LoginAction.Register) {
      if (password !== passwordConfirm) {
        Toast.show({ content: '两次输入密码不一致' });
        return;
      }
      const options = {
        method: 'post',
        body: { name, password },
      };
      request('/api/register', options).then(res => {
        console.log('res', res);
        if (res.success) {
          Toast.show('注册成功！');
          location.href = '/login';
        } else {
          Toast.show('注册失败，请稍后再试');
        }
      });
    }
    if (action === LoginAction.Login) {
    }
  };

  const handleValuesChange = (_: any, allValues: LoginForm) => {
    console.log('allValues', allValues);
    const { name, password, passwordConfirm } = allValues;
    const isLoginDone = action === LoginAction.Login && name && password;
    const isRegisterDone = action === LoginAction.Register && name && password && passwordConfirm;
    if (isLoginDone || isRegisterDone) {
      setFinish(true);
    } else {
      setFinish(false);
    }
  };

  return (
    <div className={styles.container}>
      <Form
        form={form}
        onValuesChange={handleValuesChange}
        style={{ '--border-top': 'none', '--border-bottom': 'none' }}
      >
        <Form.Item name='name' noStyle>
          <Input className={classNames(styles.input, styles['border-1px'])} placeholder='请输入用户名' />
        </Form.Item>
        <Form.Item name='password' noStyle>
          <Input className={styles.input} type='password' placeholder='请输入密码' />
        </Form.Item>

        {action === LoginAction.Register && (
          <Form.Item name='passwordConfirm' noStyle>
            <Input className={styles.input} type='password' placeholder='请再次输入密码' />
          </Form.Item>
        )}
      </Form>
      <div
        onClick={handleSubmit}
        className={classNames(styles.button, !finish ? styles['button--disable'] : styles['button--done'])}
      >
        {ACTIONMAP[action]}
      </div>
    </div>
  );
}
