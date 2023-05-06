import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {Styles} from './Main.styles';
import {CommonStyles} from '../../../utils/styles';
import {Routes} from '../../../navigators/Routes';
import {RootState, useAppDispatch} from '../../../redux/store';
import CheckboxCustom from '../../../components/common/CheckboxCustom/CheckboxCustom';
import InputDatePicker from '../../../components/common/InputDatePicker/InputDatePicker';
import ButtonSubmit from '../../../components/common/ButtonSubmit/ButtonSubmit';
import * as Yup from 'yup';
import {Formik} from 'formik';
import DropdownCustom from '../../../components/common/DropdownCustom/DropdownCustom';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {getListProvinceAsync} from '../../../redux/province/province.service';

interface IProps {
  navigation?: any;
}

interface IState {
  roundTrip: boolean;
}

const defaultValue: IState = {
  roundTrip: false,
};

const validationSchema = Yup.object({
  dateFrom: Yup.string().required('Dữ liệu không được để trống'),
  dateTo: Yup.string().required('Dữ liệu không được để trống'),
  from: Yup.object().required('Dữ liệu không được để trống'),
  to: Yup.object().required('Dữ liệu không được để trống'),
  adults: Yup.number().required('Dữ liệu không được để trống'),
  children: Yup.number().required('Dữ liệu không được để trống'),
  babies: Yup.number().required('Dữ liệu không được để trống'),
});
interface IFormSearch {
  dateFrom: any;
  dateTo: any;
  from: any;
  to: any;
  adults: number;
  children: number;
  babies: number;
}

const Main: React.FC<IProps> = props => {
  const {navigation} = props;
  const {provinces} = useSelector((state: RootState) => state.province);
  const initValueForm: IFormSearch = {
    dateFrom: new Date(),
    dateTo: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    from: provinces?.length ? provinces[0] : undefined,
    to: provinces?.length ? provinces[1] : undefined,
    adults: 1,
    children: 0,
    babies: 0,
  };
  const dispatch = useAppDispatch();
  const [state, setState] = useState(defaultValue);
  const {roundTrip} = state;

  useEffect(() => {
    dispatch(getListProvinceAsync());
  }, []);

  const handleSearch = (values: IFormSearch) => {
    navigation.navigate(Routes.home.list, {
      req: values,
      roundTrip: roundTrip,
    });
  };

  return (
    <Formik
      initialValues={initValueForm}
      validationSchema={validationSchema}
      onSubmit={(values, {setFieldValue, setSubmitting}) => {
        handleSearch(values);
      }}>
      {({
        values,
        handleChange,
        errors,
        setFieldTouched,
        setFieldValue,
        touched,
        handleSubmit,
      }) => {
        const _renderCheckBoxGroup = () => {
          return (
            <View style={[CommonStyles.flex__row, {height: 40}]}>
              <CheckboxCustom
                title={'Một chiều'}
                checked={!roundTrip}
                onClick={() =>
                  setState(prev => {
                    return {
                      ...prev,
                      roundTrip: false,
                    };
                  })
                }
              />
              <CheckboxCustom
                title={'Khứ hồi'}
                checked={roundTrip}
                onClick={() =>
                  setState(prev => {
                    return {
                      ...prev,
                      roundTrip: true,
                    };
                  })
                }
              />
            </View>
          );
        };

        const _renderSelectAddress = () => {
          return (
            <View
              style={[CommonStyles.flex__row, CommonStyles.margin__top__10]}>
              <View
                style={[CommonStyles.flex__1, CommonStyles.margin__right__5]}>
                <DropdownCustom
                  title="Điểm đi"
                  data={provinces?.filter(
                    item => JSON.stringify(item) !== JSON.stringify(values.to),
                  )}
                  defaultValue={values.from}
                  onSelect={(selectedItem, index) => {
                    setFieldValue('from', selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem?.lable;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item?.lable;
                  }}
                  dropdownStyle={{
                    width: '45%',
                  }}
                />
              </View>
              <View
                style={[CommonStyles.flex__1, CommonStyles.margin__left__5]}>
                <DropdownCustom
                  title="Điểm đến"
                  data={provinces?.filter(
                    item =>
                      JSON.stringify(item) !== JSON.stringify(values.from),
                  )}
                  defaultValue={values.to}
                  onSelect={(selectedItem, index) => {
                    setFieldValue('to', selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem?.lable;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item?.lable;
                  }}
                  dropdownStyle={{
                    width: '45%',
                  }}
                />
              </View>
            </View>
          );
        };

        const _renderCustomer = () => {
          return (
            <View style={[CommonStyles.flex__row]}>
              <View style={[CommonStyles.flex__1]}>
                <DropdownCustom
                  title="Người lớn"
                  data={[0, 1, 2, 3, 4]}
                  defaultValue={values.adults}
                  onSelect={(selectedItem, index) => {
                    setFieldValue('adults', selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                />
              </View>
              <View
                style={[
                  CommonStyles.flex__1,
                  CommonStyles.margin__horizontal__10,
                ]}>
                <DropdownCustom
                  title="Trẻ em"
                  data={[0, 1, 2, 3, 4]}
                  defaultValue={values.children}
                  onSelect={(selectedItem, index) => {
                    setFieldValue('children', selectedItem);
                    console.log(selectedItem, index);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                />
              </View>
              <View style={CommonStyles.flex__1}>
                <DropdownCustom
                  title="Em bé"
                  data={[0, 1, 2, 3, 4]}
                  defaultValue={values.babies}
                  onSelect={(selectedItem, index) => {
                    setFieldValue('babies', selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
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
                value={values.dateFrom}
                onChange={value => {
                  setFieldValue('dateFrom', value);
                }}
                minimumDate={new Date()}
              />
              {roundTrip && (
                <InputDatePicker
                  lable="Ngày về"
                  value={values.dateTo}
                  onChange={value => {
                    setFieldValue('dateTo', value);
                  }}
                  minimumDate={values.from.add(1, 'day')}
                />
              )}
            </View>
          );
        };

        return (
          <SafeAreaView style={Styles.container}>
            <View
              style={[
                CommonStyles.border__white,
                CommonStyles.bg__white,
                CommonStyles.padding__20,
                CommonStyles.margin__bottom__10,
              ]}>
              {_renderCheckBoxGroup()}
              {_renderSelectTime()}
            </View>
            <View
              style={[
                CommonStyles.border__white,
                CommonStyles.bg__white,
                CommonStyles.padding__20,
                CommonStyles.margin__bottom__10,
              ]}>
              {_renderSelectAddress()}
              {_renderCustomer()}
            </View>

            <ButtonSubmit
              style={[CommonStyles.border__white, CommonStyles.margin__top__10]}
              styleText={CommonStyles.color__white}
              title="Tìm kiếm"
              onPress={handleSubmit}
            />
          </SafeAreaView>
        );
      }}
    </Formik>
  );
};

export default Main;
