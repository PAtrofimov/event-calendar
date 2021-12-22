import { Layout, Menu, Row } from 'antd';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { RouteNames } from '../routes';
import { AuthActionCreators } from '../store/reducers/auth/actionCreators';

const NavBar: FC = () => {
   const router = useHistory();
   const { isAuth, user } = useTypedSelector((state) => state.auth);
   const { logout, login } = useActions();
   return (
      <Layout.Header>
         <Row justify="center">
            {isAuth
               ?
               <>
                  <div style={{ color: 'white' }}>{user?.username}</div>
                  <Menu theme="dark" mode="horizontal" selectable={false}>
                     <Menu.Item onClick={logout} key="1">
                        Выйти
                     </Menu.Item>
                  </Menu>
               </>
               :  <>
                 <Menu theme="dark" mode="horizontal" selectable={false}>
                     <Menu.Item onClick={logout} key="1">
                        Логин
                     </Menu.Item>
                  </Menu>
              </>}

         </Row>
      </Layout.Header>
   );
};

export default NavBar;