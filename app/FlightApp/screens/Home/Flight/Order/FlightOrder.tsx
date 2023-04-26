import React, {useEffect} from 'react';
import {RootState, useAppDispatch} from '../../../../redux/store';
import {useSelector} from 'react-redux';
import {Routes} from '../../../../navigators/Routes';
import {ScrollView, View} from 'react-native';
import TextCustom from '../../../../components/common/TextCustom/TextCustom';
import {Styles} from './FlightOrder.styles';
import {CommonStyles} from '../../../../utils/styles';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {validationEmail, validationPhone} from '../../../../utils/regex';
import InputCustom from '../../../../components/common/InputCustom/InputCustom';
import {RadioButton} from 'react-native-paper';
import ButtonSubmitGroup from '../../../../components/common/ButtonSubmitGroup/ButtonSubmitGroup';
import ButtonSubmit from '../../../../components/common/ButtonSubmit/ButtonSubmit';

interface IProps {
  navigation?: any;
  route?: any;
}

const validationSchema = Yup.object({
  name: Yup.string().required('required').trim(),
  email: Yup.string().trim().matches(validationEmail, 'format invalid'),
  phone: Yup.string()
    .required('required')
    .trim()
    .matches(validationPhone, 'format invalid'),
});

const FlightOrder: React.FC<IProps> = props => {
  const {navigation, route} = props;
  const {flightSelected} = useSelector((state: RootState) => state.flight);
  const {user} = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const req = route?.params?.req;

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
    dateFrom: flightSelected[1],
    dateTo: flightSelected[4],
  };

  useEffect(() => {
    flightSelected && console.log(flightSelected);
  }, [flightSelected]);

  const handleCreateOrder = (_info: IRequestOrder) => {};

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
        }) => {
          const _renderFormAdules = () => {
            console.log();

            if (req?.adults) {
              return [...Array(req?.adults ?? 0).keys()].map(
                (item) => {
                  return (
                    <>
                      <TextCustom>
                        Thông tin khách hàng thứ {item + 1}
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
                          touched.email && errors.email
                            ? errors.email
                            : undefined
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
                          touched.phone && errors.phone
                            ? errors.phone
                            : undefined
                        }
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
                    </>
                  );
                },
              );
            }
            return <></>;
          };
          return (
            <ScrollView
              overScrollMode={'always'}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}>
              <View onStartShouldSetResponder={() => true}>
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
                </View>

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

                  {/* {error && (
                    <TextCustom style={CommonStyles.text__danger}>
                      {error?.message}
                    </TextCustom>
                  )} */}

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
              </View>
            </ScrollView>
          );
        }}
      </Formik>
    </View>
  );
};

export default FlightOrder;
