import React, {useEffect} from 'react';
import {RootState, useAppDispatch} from '../../../redux/store';
import {useSelector} from 'react-redux';
import {fetchUser} from '../../../redux/user/user.service';
import {clearUser} from '../../../redux/user/user.reducer';
import { Text } from 'react-native';

interface IProps {
  navigation?: any;
}
const Login: React.FC<IProps> = props => {
  const {navigation} = props;
  const {user, loading, error} = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser('1'));
    return () => {
      dispatch(clearUser());
    };
  }, []);

  useEffect(() => {
    user && console.log(user, loading, error);
  }, [user]);

  return <Text>Login</Text>;
};

export default Login;
