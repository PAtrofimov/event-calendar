import { Layout } from 'antd';
import React, { useEffect } from 'react';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import './App.css';
import { useActions } from './hooks/useActions';
import { IUser } from './models/IUser';

const App = () => {
  const {setIsAuth, setUser} = useActions();

  useEffect(() => {

    if (localStorage.getItem('isAuth')) {
      setUser({username: localStorage.getItem('username') || ""} as IUser);
      setIsAuth(true);

    }

  }, [])
  return (
    <Layout>
      <NavBar />
      <Layout.Content>
        <AppRouter />
      </Layout.Content>

    </Layout>

  );
}

export default App;