import React, {useEffect, useRef, useState} from 'react';
import {RootState, useAppDispatch} from '../../../../redux/store';
import {useSelector} from 'react-redux';
import {
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
import {clearFlight} from '../../../../redux/flight/flight.reducer';
import {CommonStyles} from '../../../../utils/styles';
import {ImageSource} from '../../../../assets/images';
import ButtonSubmit from '../../../../components/common/ButtonSubmit/ButtonSubmit';

interface IProps {
  navigation?: any;
}

interface IState {
  isLoadEndList: boolean;
}

const defaultValue: IState = {
  isLoadEndList: false,
};

const FlightManagement: React.FC<IProps> = props => {
  const {navigation} = props;
  const dispatch = useAppDispatch();
  const {flights, error} = useSelector((state: RootState) => state.flight);
  const flatlistRef = useRef<FlatList<any>>(null);
  const [state, setState] = useState<IState>(defaultValue);
  const {isLoadEndList} = state;

  useEffect(() => {
    getListFlight();
    return () => {
      dispatch(clearFlight());
    };
  }, []);

  const getListFlight = () => {
    dispatch(getListFlightAsync());
  };

  const onRefresh = () => {
    getListFlight();
  };

  const handleSearch = () => {
    getListFlight();
  };

  const handlePressItem = () => {
    console.log('handlePressItem');
  };

  const _renderItem: ListRenderItem<any> = ({item}) => {
    return (
      <TouchableOpacity
        onPress={handlePressItem}
        style={[
          CommonStyles.flex__1,
          CommonStyles.border__danger,
          CommonStyles.margin__bottom__10,
          CommonStyles.padding__horizontal__10,
          CommonStyles.padding__vertical__20,
          CommonStyles.bg__main
        ]}>
        <View style={CommonStyles.flex__row}>
          <View
            style={[
              CommonStyles.content__center,
              CommonStyles.padding__horizontal__5,
            ]}>
            <TextCustom>{typeof item === 'number' ? item : item[0]}</TextCustom>
            <TextCustom
              style={[CommonStyles.text__font__20, CommonStyles.text__bold]}>
              {typeof item === 'number' ? item : item[1]}
            </TextCustom>
          </View>
          <View
            style={[
              CommonStyles.content__center,
              CommonStyles.padding__horizontal__5,
            ]}>
            <TextCustom
              style={[CommonStyles.text__font__20, CommonStyles.text__bold]}>
              {typeof item === 'number' ? item : item[2]}
            </TextCustom>
          </View>
          <View
            style={[
              CommonStyles.content__center,
              CommonStyles.padding__horizontal__5,
            ]}>
            <TextCustom>{typeof item === 'number' ? item : item[3]}</TextCustom>
            <TextCustom
              style={[CommonStyles.text__font__20, CommonStyles.text__bold]}>
              {typeof item === 'number' ? item : item[4]}
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
              {typeof item === 'number' ? item : item[5]}
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
          {error}
        </TextCustom>
      )}

      {!flights?.length && (
        <ButtonSubmit
          style={[CommonStyles.border__white, CommonStyles.margin__top__10]}
          styleText={CommonStyles.color__white}
          title="Thử lại"
          onPress={handleSearch}
        />
      )}

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
    </View>
  );
};

export default FlightManagement;
