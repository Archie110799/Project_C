import React, {useEffect, useRef, useState} from 'react';
import {CommonStyles} from '../../../utils/styles';
import {Alert, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import TextCustom from '../../../components/common/TextCustom/TextCustom';
import {ListRenderItem} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../../redux/store';
import {RefreshControl} from 'react-native';
import {FlatList} from 'react-native';
import {
  getListOrderFlightAsync,
  getListOrderFlightByUserAsync,
} from '../../../redux/order/order.service';
import {UserPermision} from '../../../utils/constain';
import {Styles} from './OrderList.styles';
import {formatDate} from '../../../utils/date';

interface IProps {
  navigation?: any;
  route?: any;
}

const OrderList: React.FC<IProps> = props => {
  const flatlistRef = useRef<FlatList<any>>(null);
  const {orders, error} = useSelector((state: RootState) => state.order);
  const {user} = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const getListFlight = () => {
    if (user?.type === UserPermision.CUSTOMER) {
      user?._id && dispatch(getListOrderFlightByUserAsync(user?._id));
    } else {
      dispatch(getListOrderFlightAsync());
    }
  };

  useEffect(() => {
    getListFlight();
  }, []);

  const onRefresh = () => {
    getListFlight();
  };

  const handlePressItem = (item: IOrder) => {
    showAlert(item);
  };

  const showAlert = (item: IOrder) => {
    const title = 'Chi tiết';
    const message = `Tên: ${item?.name}\nEmail: ${item?.email}\nSố điện thoại:${
      item?.phone
    }\nGiới tính: ${!item?.gender ? 'Nam' : 'Nữ'}\nNgười lớn: ${
      item?.adults?.length
    }\nTrẻ em: ${item?.babies}\nEm bé: ${item?.children}\n`;
    const options = [{text: 'Ẩn'}];
    return Alert.alert(title, message, options);
  };

  const _renderItem: ListRenderItem<IOrder> = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => handlePressItem(item)}
        style={[
          CommonStyles.flex__1,
          CommonStyles.border__danger,
          CommonStyles.margin__bottom__10,
          CommonStyles.padding__horizontal__10,
          CommonStyles.padding__vertical__20,
          CommonStyles.bg__white,
        ]}>
        <View style={CommonStyles.flex__row}>
          <View
            style={[
              CommonStyles.content__center,
              CommonStyles.padding__horizontal__5,
            ]}>
            <TextCustom>{item?.from}</TextCustom>
            <TextCustom
              style={[CommonStyles.text__font__20, CommonStyles.text__bold]}>
              {item?.dateFrom}
            </TextCustom>
          </View>
          <View
            style={[
              CommonStyles.content__center,
              CommonStyles.padding__horizontal__5,
            ]}>
            <TextCustom>{item?.to}</TextCustom>
            <TextCustom
              style={[CommonStyles.text__font__20, CommonStyles.text__bold]}>
              {item?.dateTo}
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
              {item?.price}
            </TextCustom>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={Styles.container}>
      <FlatList
        style={CommonStyles.height__500}
        ref={flatlistRef}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
        data={orders}
        onEndReachedThreshold={0.1}
        scrollEventThrottle={1}
        renderItem={_renderItem}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default OrderList;
