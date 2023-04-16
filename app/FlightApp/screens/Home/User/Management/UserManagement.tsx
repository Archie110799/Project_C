import React, {useEffect} from 'react';
import {RootState, useAppDispatch} from '../../../../redux/store';
import {useSelector} from 'react-redux';
import {fetchUser} from '../../../../redux/user/user.service';
import {clearUser} from '../../../../redux/user/user.reducer';
import {Routes} from '../../../../navigators/Routes';
import {View} from 'react-native';
import TextCustom from '../../../../components/common/TextCustom/TextCustom';
import {Styles} from './UserManagement.styles';

interface IProps {
  navigation?: any;
}
const UserManagement: React.FC<IProps> = props => {
  const {navigation} = props;
  const {user} = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(fetchUser('1'));
  //   return () => {
  //     dispatch(clearUser());
  //   };
  // }, []);

  useEffect(() => {
    user && console.log(user);
  }, [user]);

  return (
    <View style={Styles.container}>
      <TextCustom style={Styles.text__title}>User</TextCustom>
    </View>
  );
};

export default UserManagement;