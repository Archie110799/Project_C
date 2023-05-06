import React, {useEffect, useState} from 'react';
import {RootState, useAppDispatch} from '../../../../redux/store';
import {useSelector} from 'react-redux';
import {Routes} from '../../../../navigators/Routes';
import {Alert, ScrollView, View} from 'react-native';
import TextCustom from '../../../../components/common/TextCustom/TextCustom';
import {Styles} from './FlightOrder.styles';
import {CommonStyles} from '../../../../utils/styles';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {validationEmail, validationPhone} from '../../../../utils/regex';
import InputCustom from '../../../../components/common/InputCustom/InputCustom';
import {RadioButton, Text} from 'react-native-paper';
import ButtonSubmitGroup from '../../../../components/common/ButtonSubmitGroup/ButtonSubmitGroup';
import ButtonSubmit from '../../../../components/common/ButtonSubmit/ButtonSubmit';
import RegisterAdultForm from '../Form/RegisterAdult/RegisterAdult';
import moment from 'moment';
import {formatDate} from '../../../../utils/date';
import {createOrderFlightAsync} from '../../../../redux/order/order.service';

interface IProps {
  navigation?: any;
  route?: any;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Dữ liệu không được để trống').trim(),
  email: Yup.string().trim().matches(validationEmail, 'Định dạng không hợp lệ'),
  phone: Yup.string()
    .required('Dữ liệu không được để trống')
    .trim()
    .matches(validationPhone, 'Định dạng không hợp lệ'),
});

const FlightOrder: React.FC<IProps> = props => {
  const {navigation, route} = props;
  const {flightSelected} = useSelector((state: RootState) => state.flight);
  const {user} = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const req = route?.params?.req;
  const [currentStep, setCurrentStep] = useState(0);

  const initValue: IRequestOrder = {
    userId: user?._id,
    name: '',
    email: '',
    gender: '0',
    phone: '',
    from: flightSelected[0],
    to: flightSelected[3],
    price: flightSelected[5],
    adults: [],
    children: req.children,
    babies: req.babies,
    dateFrom: `${moment(req.dateFrom).format('DD-MM-YYYY')} ${
      flightSelected[1]
    }`,
    dateTo: `${moment(req.dateTo).format('DD-MM-YYYY')} ${flightSelected[4]}`,
  };

  const handleNextStep = () => {
    setCurrentStep(prev => {
      return (prev += 1);
    });
  };

  const handleBackStep = () => {
    setCurrentStep(prev => {
      return prev > 0 ? (prev -= 1) : prev;
    });
  };

  const handleCreateOrder = (_info: IRequestOrder) => {
    dispatch(
      createOrderFlightAsync(_info, () => {
        showAlert();
      }),
    );
  };

  const showAlert = () =>
    Alert.alert('Đăng ký', 'Đăng ký thành công.', [
      {
        text: 'OK',
        onPress: () => navigation.replace(Routes.order.list),
      },
    ]);

  const _renderInfoFlight = () => {
    const from = flightSelected[0];
    const timeFrom = flightSelected[1];
    const code = flightSelected[2];
    const to = flightSelected[3];
    const timeTo = flightSelected[4];
    const price = flightSelected[5];
    return (
      <View
        style={[
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
      </View>
    );
  };

  return (
    <View style={Styles.container}>
      {_renderInfoFlight()}
      <Formik
        initialValues={initValue}
        validationSchema={validationSchema}
        onSubmit={values => {
          handleCreateOrder(values);
        }}>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          handleSubmit,
          setFieldValue,
        }) => {
          const _renderFormAdules = () => {
            if (req?.adults) {
              return [...Array(req?.adults).keys()].map(item => {
                return (
                  <RegisterAdultForm
                    key={`RegisterAdultForm-${item}`}
                    onSubmitForm={(newValues: IAdult) => {
                      const newArray = [...values?.adults];
                      newArray[item] = {
                        ...newValues,
                        birthDate: moment(newValues?.birthDate).format(
                          'DD-MM-YYYY',
                        ),
                      };
                      setFieldValue('adults', newArray);
                      handleNextStep();
                    }}
                  />
                );
              });
            } else {
              return <></>;
            }
          };

          const _renderInfoCustomerOrder = () => {
            return (
              <View
                style={[
                  CommonStyles.border__danger,
                  CommonStyles.margin__bottom__10,
                  CommonStyles.padding__horizontal__10,
                  CommonStyles.padding__vertical__20,
                  CommonStyles.bg__white,
                ]}>
                <View style={CommonStyles.flex__row}>
                  <View style={[CommonStyles.padding__horizontal__5]}>
                    <TextCustom
                      style={[
                        CommonStyles.text__font__20,
                        CommonStyles.text__bold,
                      ]}>
                      {values.name}
                    </TextCustom>
                    <TextCustom
                      style={[
                        CommonStyles.text__font__20,
                        CommonStyles.text__bold,
                      ]}>
                      {values.phone}
                    </TextCustom>
                    <TextCustom
                      style={[
                        CommonStyles.text__font__20,
                        CommonStyles.text__bold,
                      ]}>
                      {values.email}
                    </TextCustom>
                  </View>
                </View>
              </View>
            );
          };

          const _renderInfoConfirm = () => {
            if (req?.adults) {
              return [...Array(req?.adults).keys()].map(item => {
                return (
                  <View
                    key={`_renderInfoConfirm-${item}`}
                    style={[
                      CommonStyles.content__center,
                      CommonStyles.border__main,
                      CommonStyles.padding__20,
                    ]}>
                    <View style={[CommonStyles.flex__row]}>
                      <TextCustom
                        style={[
                          CommonStyles.flex__05,
                          CommonStyles.text__font__20,
                        ]}>
                        {values?.adults[item]?.name}
                      </TextCustom>
                      <TextCustom
                        style={[
                          CommonStyles.flex__05,
                          CommonStyles.text__font__20,
                        ]}>
                        {values?.adults[item]?.gender === '0' ? 'Nam' : 'Nữ'}
                      </TextCustom>
                    </View>
                    <View
                      style={[
                        CommonStyles.flex__row,
                        CommonStyles.justifyContent__spaceEvenly,
                        CommonStyles.flex__05,
                      ]}>
                      <TextCustom
                        style={[
                          CommonStyles.flex__05,
                          CommonStyles.text__font__20,
                        ]}>
                        {values?.adults[item]?.ccid}
                      </TextCustom>
                      <TextCustom
                        style={[
                          CommonStyles.flex__05,
                          CommonStyles.text__font__20,
                        ]}>
                        {values?.adults[item]?.birthDate}
                      </TextCustom>
                    </View>
                  </View>
                );
              });
            } else {
              return <></>;
            }
          };

          return (
            <ScrollView
              overScrollMode={'always'}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}>
              <View onStartShouldSetResponder={() => true}>
                {currentStep === 0 && (
                  <View
                    style={[
                      CommonStyles.bg__white,
                      CommonStyles.margin__top__10,
                      CommonStyles.padding__20,
                      CommonStyles.border__gray,
                    ]}>
                    <TextCustom style={Styles.text__title}>
                      Thông tin liên hệ
                    </TextCustom>
                    <InputCustom
                      isRequired={true}
                      placeholder="Nhập họ và tên..."
                      lable="Họ và tên"
                      value={values.name}
                      onChangeText={handleChange('name')}
                      onBlur={() => setFieldTouched('name')}
                      error={
                        touched.name && errors.name ? errors.name : undefined
                      }
                    />
                    <InputCustom
                      placeholder="Nhập email..."
                      lable="Email"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={() => setFieldTouched('email')}
                      error={
                        touched.email && errors.email ? errors.email : undefined
                      }
                    />
                    <InputCustom
                      isRequired={true}
                      placeholder="Nhập số điện thoại..."
                      lable="Số điện thoại"
                      value={values.phone}
                      onChangeText={handleChange('phone')}
                      onBlur={() => setFieldTouched('phone')}
                      error={
                        touched.phone && errors.phone ? errors.phone : undefined
                      }
                      keyboardType="numeric"
                    />

                    <RadioButton.Group
                      onValueChange={handleChange('gender')}
                      value={values.gender as string}>
                      <View
                        style={[
                          CommonStyles.flex__row,
                          CommonStyles.justifyContent__spaceEvenly,
                        ]}>
                        <View>
                          <TextCustom>Nam</TextCustom>
                          <RadioButton value={'0'} />
                        </View>
                        <View>
                          <TextCustom>Nữ</TextCustom>
                          <RadioButton value={'1'} />
                        </View>
                      </View>
                    </RadioButton.Group>

                    <ButtonSubmit
                      style={CommonStyles.margin__top__20}
                      styleText={[
                        CommonStyles.text__bold,
                        CommonStyles.text__font__20,
                      ]}
                      title="Tiếp theo"
                      onPress={handleNextStep}
                    />
                  </View>
                )}
                {currentStep > 0 && currentStep <= req?.adults && (
                  <View
                    style={[
                      CommonStyles.bg__white,
                      CommonStyles.margin__top__10,
                      CommonStyles.padding__20,
                      CommonStyles.border__gray,
                    ]}>
                    <TextCustom style={Styles.text__title}>
                      Thông tin khách hàng
                    </TextCustom>
                    {_renderFormAdules()}
                  </View>
                )}
                {currentStep > req?.adults && (
                  <View
                    style={[
                      CommonStyles.bg__white,
                      CommonStyles.margin__top__10,
                      CommonStyles.padding__20,
                      CommonStyles.border__gray,
                    ]}>
                    {_renderInfoCustomerOrder()}
                    {_renderInfoConfirm()}
                    <ButtonSubmit
                      style={CommonStyles.margin__top__20}
                      styleText={[
                        CommonStyles.text__bold,
                        CommonStyles.text__font__20,
                      ]}
                      title="Đặt vé"
                      onPress={handleSubmit}
                    />
                  </View>
                )}
              </View>
            </ScrollView>
          );
        }}
      </Formik>
    </View>
  );
};

export default FlightOrder;
