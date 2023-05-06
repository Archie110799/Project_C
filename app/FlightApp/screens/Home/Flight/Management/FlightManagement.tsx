import React, {useEffect, useRef, useState} from 'react';
import {RootState, useAppDispatch} from '../../../../redux/store';
import {useSelector} from 'react-redux';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItem,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';
import TextCustom from '../../../../components/common/TextCustom/TextCustom';
import {Styles} from './FlightManagement.styles';
import {getListFlightAsync} from '../../../../redux/flight/flight.service';
import {
  clearFlight,
  selectFlight,
} from '../../../../redux/flight/flight.reducer';
import {CommonStyles} from '../../../../utils/styles';
import {ImageSource} from '../../../../assets/images';
import ButtonSubmit from '../../../../components/common/ButtonSubmit/ButtonSubmit';
import {Routes} from '../../../../navigators/Routes';
import moment from 'moment';

interface IProps {
  navigation?: any;
  route?: any;
}

interface IState {
  isLoadEndList: boolean;
}

const defaultValue: IState = {
  isLoadEndList: false,
};

const FlightManagement: React.FC<IProps> = props => {
  const {navigation, route} = props;
  const dispatch = useAppDispatch();
  const {flights, error} = useSelector((state: RootState) => state.flight);
  const flatlistRef = useRef<FlatList<any>>(null);
  const [state, setState] = useState<IState>(defaultValue);
  const {isLoadEndList} = state;

  useEffect(() => {
    getListFlight();
  }, []);

  const getListFlight = () => {
    const values = route?.params?.req;
    const roundTrip = route?.params?.roundTrip;
    const formatDateFrom = moment(values.dateFrom).format('DDMMYYYY');
    const formatDateTo = moment(values.dateTo).format('DDMMYYYY');
    const textTimeFrom = `${values.from.value}${values.to.value}${formatDateFrom}`;
    const textTimeTo = `-${values.to.value}${values.from.value}${formatDateTo}`;
    const textReq = `${textTimeFrom}${roundTrip ? textTimeTo : ''}-${
      values.adults
    }-${values.children}-${values.babies}`;
    console.log({textReq});

    dispatch(
      getListFlightAsync(textReq, () => {
        setState(prev => {
          return {
            ...prev,
            isLoadEndList: true,
          };
        });
      }),
    );
  };

  const onRefresh = () => {
    getListFlight();
  };

  const handleSearch = () => {
    getListFlight();
  };

  const handlePressItem = (item: any) => {
    dispatch(selectFlight(item));
    navigation.navigate(Routes.home.order, {
      req: route?.params?.req,
    });
  };

  const _renderItem: ListRenderItem<any> = ({item}) => {
    const from = item[0];
    const timeFrom = item[1];
    const code = item[2];
    const to = item[3];
    const timeTo = item[4];
    const price = item[5];
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
            <TextCustom>{from}</TextCustom>
            <TextCustom
              style={[CommonStyles.text__font__20, CommonStyles.text__bold]}>
              {timeFrom}
            </TextCustom>
          </View>
          <View
            style={[
              CommonStyles.content__center,
              CommonStyles.padding__horizontal__5,
            ]}>
            <TextCustom
              style={[CommonStyles.text__font__20, CommonStyles.text__bold]}>
              {code}
            </TextCustom>
          </View>
          <View
            style={[
              CommonStyles.content__center,
              CommonStyles.padding__horizontal__5,
            ]}>
            <TextCustom>{to}</TextCustom>
            <TextCustom
              style={[CommonStyles.text__font__20, CommonStyles.text__bold]}>
              {timeTo}
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
              {price}
            </TextCustom>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={Styles.container}>
      {!!error && (
        <TextCustom style={[Styles.text__title, CommonStyles.text__danger]}>
          {'Đã xảy ra lỗi. Vui lòng tải lại trang!'}
        </TextCustom>
      )}

      {!isLoadEndList && <ActivityIndicator size="large" color={'red'} />}

      {!flights?.length && isLoadEndList && (
        <ButtonSubmit
          style={[CommonStyles.border__white, CommonStyles.margin__top__10]}
          styleText={CommonStyles.color__white}
          title="Tải lại trang"
          onPress={handleSearch}
        />
      )}

      {isLoadEndList && (
        <FlatList
          style={CommonStyles.height__500}
          ref={flatlistRef}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
          data={flights}
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
        />
      )}
    </View>
  );
};

export default FlightManagement;
