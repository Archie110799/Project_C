import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import TextCustom from '../../../components/common/TextCustom/TextCustom';
import {Styles} from './Main.styles';
import {CommonStyles} from '../../../utils/styles';
import {Routes} from '../../../navigators/Routes';
import {RootState, useAppDispatch} from '../../../redux/store';
import CheckboxCustom from '../../../components/common/CheckboxCustom/CheckboxCustom';
import {DropdownList, DropdownNumber} from 'react-native-ultimate-modal-picker';
import InputDatePicker from '../../../components/common/InputDatePicker/InputDatePicker';
import ButtonSubmit from '../../../components/common/ButtonSubmit/ButtonSubmit';

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
  const [state, setState] = useState<IState>(defaultValue);
  const [date, setDate] = useState(new Date());
  const {listItem, isLoadEndList} = state;
  const provinces = [
    {label: 'Hà Nội (HAN)', value: 'HAN'},
    {label: 'Hồ Chí Minh (SGN)', value: 'SGN'},
    {label: 'Đà Nẵng (DAD)', value: 'DAD'},
    {label: 'Hải Phòng (HPH)', value: 'HPH'},
    {label: 'PleiKu (PXU)', value: 'PXU'},
  ];

  const _renderCheckBoxGroup = () => {
    return (
      <View style={[CommonStyles.flex__row, {height: 40}]}>
        <CheckboxCustom title={'Một chiều'} checked={true} />
        <CheckboxCustom title={'Khứ hồi'} />
      </View>
    );
  };

  const _renderSelectAddress = () => {
    return (
      <View style={[CommonStyles.flex__row, CommonStyles.margin__top__10]}>
        <View style={CommonStyles.flex__1}>
          <DropdownList
            title="Điểm đi"
            defaultValue={'DAD'}
            items={provinces}
            onChange={(value: string) => console.log(value)}
          />
        </View>
        <View style={CommonStyles.flex__1}>
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
          lable="Ngày đi"
          value={date}
          onChange={date => {
            setDate(date);
          }}
        />
        <InputDatePicker
          lable="Ngày về"
          value={date}
          onChange={date => {
            setDate(date);
          }}
        />
      </View>
    );
  };

  const handleSearch = () => {
    navigation.navigate(Routes.home.list);
  };

  return (
    <SafeAreaView style={Styles.container}>
      {_renderCheckBoxGroup()}
      {_renderSelectTime()}
      {_renderSelectAddress()}
      {_renderCustomer()}

      <ButtonSubmit
        style={CommonStyles.margin__top__20}
        title="Search"
        onPress={handleSearch}
      />
    </SafeAreaView>
  );
};

export default Main;
