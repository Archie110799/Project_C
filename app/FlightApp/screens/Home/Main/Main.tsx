import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  FlatList,
  ListRenderItem,
  LogBox,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import TextCustom from '../../../components/common/TextCustom/TextCustom';
import {Styles} from './Main.styles';
import {CommonStyles} from '../../../utils/styles';
import ButtonSubmit from '../../../components/common/ButtonSubmit/ButtonSubmit';
import {Routes} from '../../../navigators/Routes';
import {RootState, useAppDispatch} from '../../../redux/store';
import {useSelector} from 'react-redux';
import {fetchUser} from '../../../redux/user/user.service';
import {clearUser} from '../../../redux/user/user.reducer';
import {getListFlightAsync} from '../../../redux/flight/flight.service';
import {clearFlight} from '../../../redux/flight/flight.reducer';
import DropdownCustom from '../../../components/common/DropdownCustom/DropdownCustom';
import CheckboxCustom from '../../../components/common/CheckboxCustom/CheckboxCustom';
import {
  DropdownList,
  DropdownNumber,
  PickerDate,
} from 'react-native-ultimate-modal-picker';
import InputDatePicker from '../../../components/common/InputDatePicker/InputDatePicker';

interface IProps {
  navigation?: any;
}

interface IState {
  listItem: any;
  isLoadEndList: boolean;
}

const defaultValue: IState = {
  listItem: [
    ['Hà Nội', '05:10', 'VJ199', 'Hồ Chí Minh', '07:20', '967,000', 'VND'],
    ['Hà Nội', '06:00', 'VJ121', 'Hồ Chí Minh', '08:10', '967,000', 'VND'],
    ['Hà Nội', '20:00', 'VJ155', 'Hồ Chí Minh', '22:10', '967,000', 'VND'],
    ['Hà Nội', '21:00', 'VJ159', 'Hồ Chí Minh', '23:10', '967,000', 'VND'],
  ],
  isLoadEndList: false,
};

const Main: React.FC<IProps> = props => {
  const {navigation} = props;
  const dispatch = useAppDispatch();
  const flatlistRef = useRef<FlatList<any>>(null);
  const [state, setState] = useState<IState>(defaultValue);
  const [date, setDate] = useState(new Date());
  const {listItem, isLoadEndList} = state;
  const {flights} = useSelector((state: RootState) => state.flight);
  const provinces = [
    {label: 'Hà Nội (HAN)', value: 'HAN'},
    {label: 'Hồ Chí Minh (SGN)', value: 'SGN'},
    {label: 'Đà Nẵng (DAD)', value: 'DAD'},
    {label: 'Hải Phòng (HPH)', value: 'HPH'},
    {label: 'PleiKu (PXU)', value: 'PXU'},
  ];

  const handleLogout = () => {
    console.log('login');
    navigation.navigate(Routes.auth.login);
  };

  useEffect(() => {
    // dispatch(getListFlightAsync());
    // LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    return () => {
      // dispatch(clearFlight());
    };
  }, []);

  const getListFlight = () => {};

  const onRefresh = () => {
    getListFlight();
  };

  const handlePressItem = () => {
    console.log('handlePressItem');
  };

  const _renderItem: ListRenderItem<any> = ({item}) => {
    return (
      <TouchableOpacity onPress={handlePressItem} style={CommonStyles.flex__1}>
        <TextCustom>
          {typeof item === 'number' ? item : item?.join('・')}
        </TextCustom>
      </TouchableOpacity>
    );
  };

  const _renderCheckBoxGroup = () => {
    return (
      <View style={CommonStyles.flex__row}>
        <CheckboxCustom title={'Một chiều'} checked={true} />
        <CheckboxCustom title={'Khứ hồi'} />
      </View>
    );
  };

  const _renderSelectAddress = () => {
    return (
      <View style={[CommonStyles.flex__row]}>
        <View style={[CommonStyles.flex__1]}>
          <DropdownList
            title="Điểm đi"
            defaultValue={'DAD'}
            items={provinces}
            onChange={(value: string) => console.log(value)}
          />
        </View>
        <View style={[CommonStyles.flex__1]}>
          <DropdownList
            title="Điểm đến"
            items={provinces}
            defaultValue={'HAN'}
            onChange={(value: string) => console.log(value)}
          />
        </View>
      </View>
    );
  };

  const _renderCustomer = () => {
    return (
      <View style={[CommonStyles.flex__row]}>
        <View style={[CommonStyles.flex__1]}>
          <DropdownNumber
            defaultValue="1"
            title="Người lớn"
            onChange={(value: string) => console.log(value)}
          />
        </View>
        <View style={[CommonStyles.flex__1]}>
          <DropdownNumber
            defaultValue="0"
            title="Trẻ em"
            onChange={(value: string) => console.log(value)}
          />
        </View>
        <View style={CommonStyles.flex__1}>
          <DropdownNumber
            defaultValue="0"
            title="Em bé"
            onChange={(value: string) => console.log(value)}
          />
        </View>
      </View>
    );
  };

  const _renderSelectTime = () => {
    return (
      <View>
        <InputDatePicker
          lable="Ngày di"
          value={date}
          onChange={date => {
            setDate(date);
          }}
        />
        <InputDatePicker
          lable="Ngày ve"
          value={date}
          onChange={date => {
            setDate(date);
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={Styles.container}>
      <TextCustom style={Styles.text__title}>Main</TextCustom>
      <ButtonSubmit
        style={CommonStyles.margin__bottom__5}
        title="Logout"
        onPress={handleLogout}
      />
      {_renderCheckBoxGroup()}
      {_renderSelectAddress()}
      {_renderCustomer()}
      {_renderSelectTime()}
      <FlatList
        style={CommonStyles.height__500}
        ref={flatlistRef}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
        data={listItem}
        onEndReachedThreshold={0.1}
        scrollEventThrottle={1}
        renderItem={_renderItem}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          <>
            {isLoadEndList && (
              <View
                onStartShouldSetResponder={() => true}
                style={[CommonStyles.height__500]}>
                <TextCustom style={[CommonStyles.text__center]}>
                  List empty
                </TextCustom>
              </View>
            )}
          </>
        }
        ListHeaderComponent={() => <></>}
        ListFooterComponent={() => <></>}
      />
    </SafeAreaView>
  );
};

export default Main;
