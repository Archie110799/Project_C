import React, {useEffect, useRef} from 'react';
import {RootState, useAppDispatch} from '../../../../redux/store';
import {useSelector} from 'react-redux';
import {Alert, ListRenderItem, TouchableOpacity, View} from 'react-native';
import TextCustom from '../../../../components/common/TextCustom/TextCustom';
import {Styles} from './UserList.styles';
import {CommonStyles} from '../../../../utils/styles';
import {FlatList} from 'react-native';
import {RefreshControl} from 'react-native';
import {
  deleteUserAsync,
  getListUserAsync,
} from '../../../../redux/user/user.service';
import ButtonSubmit from '../../../../components/common/ButtonSubmit/ButtonSubmit';
import {Routes} from '../../../../navigators/Routes';

interface IProps {
  navigation?: any;
}
const UserList: React.FC<IProps> = props => {
  const {navigation} = props;
  const flatlistRef = useRef<FlatList<any>>(null);
  const dispatch = useAppDispatch();
  const {users, user} = useSelector((state: RootState) => state.user);

  const getListUser = () => {
    dispatch(getListUserAsync());
  };

  useEffect(() => {
    getListUser();
  }, []);

  const onRefresh = () => {
    getListUser();
  };

  const handlePressItem = (item: IUser) => {
    showConfirmationAlert(item);
  };

  const handleGotoRegister = () => {
    navigation.navigate(Routes.user.form);
  };

  const handleGotoUpdate = (user: IUser) => {
    navigation.navigate(Routes.user.form, {
      user,
    });
  };

  const handleDeleteUser = (userId?: string | number) => {
    userId && dispatch(deleteUserAsync(userId));
  };

  const showConfirmationAlert = (item: IUser) => {
    const title = 'Chi tiết';
    const message = `Tên: ${item?.name}\nEmail: ${item?.email}\nSố điện thoại:${
      item?.phone
    }\nGiới tính: ${!item?.gender ? 'Nam' : 'Nữ'}`;
    let options = [];
    if (item?._id !== user?._id) {
      options = [
        {text: 'Ẩn'},
        {text: 'Cập nhật', onPress: () => handleGotoUpdate(item)},
        {text: 'Xoá', onPress: () => handleDeleteUser(item?._id)},
      ];
    } else {
      options = [{text: 'Ẩn'}];
    }
    return Alert.alert(title, message, options);
  };

  const _renderItem: ListRenderItem<IUser> = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => handlePressItem(item)}
        style={[
          CommonStyles.flex__1,
          CommonStyles.border__danger,
          CommonStyles.margin__bottom__10,
          CommonStyles.padding__horizontal__10,
          CommonStyles.padding__vertical__20,
          CommonStyles.bg__main,
        ]}>
        <View style={CommonStyles.flex__row}>
          <View
            style={[
              CommonStyles.content__center,
              CommonStyles.padding__horizontal__5,
            ]}>
            <TextCustom style={CommonStyles.text__bold}>
              {item?.name}
            </TextCustom>
            <TextCustom style={[CommonStyles.text__font__20]}>
              {item?.email}
            </TextCustom>
          </View>
          <View
            style={[
              CommonStyles.content__center,
              CommonStyles.padding__horizontal__5,
            ]}>
            <TextCustom
              style={[CommonStyles.text__font__20, CommonStyles.text__bold]}>
              {item?.phone}
            </TextCustom>
          </View>
          <View
            style={[
              CommonStyles.content__center,
              CommonStyles.padding__horizontal__20,
            ]}>
            <TextCustom
              style={[
                CommonStyles.text__font__20,
                CommonStyles.text__bold,
                CommonStyles.text__danger,
              ]}>
              {'Chi tiết'}
            </TextCustom>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={Styles.container}>
      <ButtonSubmit
        style={CommonStyles.margin__top__20}
        styleText={[CommonStyles.text__bold, CommonStyles.text__font__20]}
        title="Thêm mới"
        onPress={handleGotoRegister}
      />
      <FlatList
        style={[CommonStyles.height__500, CommonStyles.padding__10]}
        ref={flatlistRef}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
        data={users}
        onEndReachedThreshold={0.1}
        scrollEventThrottle={1}
        renderItem={_renderItem}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default UserList;
