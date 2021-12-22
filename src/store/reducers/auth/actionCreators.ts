import { AppDispatch } from './../../index';
import { IUser } from './../../../models/IUser';
import { AuthActionEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUSERAction } from "./types";
import axios from 'axios';
import UserService from '../../../api/UserService';

export const AuthActionCreators = {
   setUser: (user: IUser): SetUSERAction => ({ type: AuthActionEnum.SET_USER, payload: user }),
   setIsAuth: (isAuth: boolean): SetAuthAction => ({ type: AuthActionEnum.SET_AUTH, payload: isAuth }),
   setError: (error: string): SetErrorAction => ({ type: AuthActionEnum.SET_ERROR, payload: error }),
   setIsLoading: (isLoading: boolean): SetIsLoadingAction => ({ type: AuthActionEnum.SET_IS_LOADING, payload: isLoading }),
   login: (username: string, password: string) => async (dispatch: AppDispatch) => {
      try {
         dispatch(AuthActionCreators.setIsLoading(true));

         setTimeout(async () => {
            const response = await UserService.getUsers();

            const mockUser = response.data.find((user: IUser) => (user.username === username && user.password === password))
            if (mockUser) {
               localStorage.setItem('isAuth', 'true');
               localStorage.setItem('username', mockUser.username);
               dispatch(AuthActionCreators.setUser(mockUser))
               dispatch(AuthActionCreators.setIsAuth(true))


            } else {
               dispatch(AuthActionCreators.setError("Произошла ошибка - пользователь не найден"))
            }
         }, 1000);
      } catch (error) {
         dispatch(AuthActionCreators.setError("Произошла ошибка при логине"));
      } finally {
         dispatch(AuthActionCreators.setIsLoading(false));
      }
   },
   logout: () => async (dispatch: AppDispatch) => {

      localStorage.removeItem('isAuth');
      localStorage.removeItem('username');
      dispatch(AuthActionCreators.setUser({} as IUser));
      dispatch(AuthActionCreators.setIsAuth(false));

   }
}