import { Button, Form, Input } from 'antd';
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { AuthActionCreators } from '../store/reducers/auth/actionCreators';
import { rules } from '../utils/rules';

const LoginForm: FC = () => {

   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   const {login} = useActions();
   const { isLoading, error } = useTypedSelector(state => state.auth)

   const submit = () => {
     login(username, password);
   }

   return (
      <Form onFinish={submit}>
         {error && <div style={{ color: 'red' }} >
            {error}
         </div>
         }
         <Form.Item
            label="Имя пользователя"
            name="username"
            rules={[rules.required("Пожалуйста введите логин!")]}>

            <Input value={username} onChange={(e) => setUsername(e.target.value)} />
         </Form.Item>
         <Form.Item
            label="Пароль"
            name="password"
            rules={[rules.required('Пожалуйста введите пароль!')]}>

            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
         </Form.Item>

         <Form.Item>
            <Button type="primary" htmlType="submit">Войти</Button>
         </Form.Item>
      </Form>
   );
};

export default LoginForm;