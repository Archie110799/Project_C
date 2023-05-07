import React, {useEffect} from 'react';
import {RootState, useAppDispatch} from '../../../../redux/store';
import {useSelector} from 'react-redux';
import {Routes} from '../../../../navigators/Routes';
import {TouchableOpacity, View} from 'react-native';
import TextCustom from '../../../../components/common/TextCustom/TextCustom';
import {Styles} from './UserManagement.styles';
import {UserPermision} from '../../../../utils/constain';
import {CommonStyles} from '../../../../utils/styles';

interface IProps {
  navigation?: any;
}
const UserManagement: React.FC<IProps> = props => {
  const {navigation} = props;
  const {user} = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user?.type === UserPermision.CUSTOMER) {
      console.log('CUSTOMER');
    } else {
      console.log('ADMIN');
    }
  }, [user]);

  const _renderItem = (text?: string, handleEvent?: () => void) => {
    return (
      <TouchableOpacity
        onPress={handleEvent}
        style={[
          CommonStyles.border__danger,
          CommonStyles.margin__bottom__20,
          CommonStyles.bg__white,
          CommonStyles.content__center,
          CommonStyles.padding__20,
        ]}>
        <TextCustom style={Styles.text__title}>{text}</TextCustom>
      </TouchableOpacity>
    );
  };

  const _renderOptionAdmin = () => {
    return (
      <>
        {_renderItem('Quản lý khách hàng', () => {
          navigation.navigate(Routes.user.list);
        })}
        {_renderItem('Quản lý chuyến bay', () => {
          navigation.navigate(Routes.order.list);
        })}
      </>
    );
  };

  return (
    <View style={Styles.container}>
      {user?.type === UserPermision.ADMIN
        ? _renderOptionAdmin()
        : _renderItem('Xem chuyến bay', () => {
            navigation.navigate(Routes.order.list);
          })}
    </View>
  );
};

export default UserManagement;
