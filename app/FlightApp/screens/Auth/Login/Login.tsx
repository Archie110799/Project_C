import React, {useEffect} from 'react';
import {RootState, useAppDispatch} from '../../../redux/store';
import {useSelector} from 'react-redux';
import {fetchUser} from '../../../redux/user/user.service';
import {clearUser} from '../../../redux/user/user.reducer';
import {View} from 'react-native';
import {CommonStyles} from '../../../utils/styles';
import InputCustom from '../../../components/common/InputCustom/InputCustom';
import TextCustom from '../../../components/common/TextCustom/TextCustom';
import {Styles} from './Login.styles';
import ButtonSubmit from '../../../components/common/ButtonSubmit/ButtonSubmit';
import {Routes} from '../../../navigators/Routes';

interface IProps {
  navigation?: any;
}
const Login: React.FC<IProps> = props => {
  const {navigation} = props;
  const {user, loading, error} = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(fetchUser('1'));
  //   return () => {
  //     dispatch(clearUser());
  //   };
  // }, []);

  useEffect(() => {
    user && console.log(user, loading, error);
  }, [user]);

  const handleLogin = () => {
    console.log('login');
    navigation.replace(Routes.home.main);
  };

  return (
    <View style={Styles.container}>
      <TextCustom style={Styles.text__title}>Welcome</TextCustom>
      <InputCustom
        styleText={CommonStyles.text__bold}
        placeholder="Enter your email"
        lable="Email"
        value="1"
      />
      <InputCustom
        type="password"
        placeholder="Enter your password"
        lable="Password"
      />
      <ButtonSubmit
        style={CommonStyles.margin__top__20}
        styleText={[CommonStyles.text__bold, CommonStyles.text__font__20]}
        title="Login"
        onPress={handleLogin} 
      />
    </View>
  );
};

export default Login;
