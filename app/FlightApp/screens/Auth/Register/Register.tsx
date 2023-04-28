import React, {useEffect} from 'react';
import {RootState, useAppDispatch} from '../../../redux/store';
import {Alert, Platform, ToastAndroid, View} from 'react-native';
import {CommonStyles} from '../../../utils/styles';
import InputCustom from '../../../components/common/InputCustom/InputCustom';
import TextCustom from '../../../components/common/TextCustom/TextCustom';
import {Styles} from './Register.styles';
import {Routes} from '../../../navigators/Routes';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {
  validationEmail,
  validationPassword,
  validationPhone,
  validationSpacePassword,
} from '../../../utils/regex';
import {useSelector} from 'react-redux';
import {clearErrorUser} from '../../../redux/user/user.reducer';
import ButtonSubmitGroup from '../../../components/common/ButtonSubmitGroup/ButtonSubmitGroup';
import {RadioButton} from 'react-native-paper';
import {registerAction} from '../../../redux/user/user.service';

interface IProps {
  navigation?: any;
}

const validationSchema = Yup.object({
  name: Yup.string().required('required').trim(),
  password: Yup.string()
    .required('required')
    .matches(validationPassword, 'format invalid')
    .matches(validationSpacePassword, 'format invalid'),
  confirmPassword: Yup.string()
    .required('required')
    .oneOf([Yup.ref('password'), ''], 'password not match'),
  email: Yup.string().trim().matches(validationEmail, 'format invalid'),
  phone: Yup.string()
    .required('required')
    .trim()
    .matches(validationPhone, 'format invalid'),
});

const initValue: IRequestRegister = {
  name: 'user1',
  password: 'User1@flight',
  confirmPassword: 'User1@flight',
  email: 'user1@gmail.com',
  gender: '0',
  phone: '0123456789',
  type: 1,
};

const Register: React.FC<IProps> = props => {
  const {navigation} = props;
  const dispatch = useAppDispatch();
  const {error} = useSelector((state: RootState) => state.user);

  const handleRegister = (values: IRequestRegister) => {
    dispatch(
      registerAction(values, async data => {
        const msg = 'Đăng ký thành công';
        if (Platform.OS === 'android') {
          ToastAndroid.show('Đăng ký thành công', ToastAndroid.SHORT);
        } else {
          Alert.alert(msg);
        }
        navigation.replace(Routes.auth.login);
      }),
    );
  };

  useEffect(() => {
    dispatch(clearErrorUser());
  }, []);

  const handleCancel = () => {
    navigation.replace(Routes.auth.login);
  };

  return (
    <Formik
      initialValues={initValue}
      validationSchema={validationSchema}
      onSubmit={values => {
        handleRegister(values);
      }}>
      {({
        values,
        handleChange,
        errors,
        setFieldTouched,
        touched,
        handleSubmit,
      }) => {
        return (
          <View style={[Styles.container, CommonStyles.margin__top__10]}>
            <TextCustom style={Styles.text__title}>Xin chào</TextCustom>
            <InputCustom
              isRequired={true}
              placeholder="Nhập tên tài khoản..."
              lable="Tài khoản"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={() => setFieldTouched('name')}
              error={touched.name && errors.name ? errors.name : undefined}
            />
            <InputCustom
              isRequired={true}
              type="password"
              placeholder="Nhập mật khẩu của bạn..."
              lable="Mật khẩu"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={() => setFieldTouched('password')}
              error={
                touched.password && errors.password
                  ? errors.password
                  : undefined
              }
            />
            <InputCustom
              isRequired={true}
              type="password"
              placeholder="Nhập mật khẩu..."
              lable="Nhập lại mật khẩu"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={() => setFieldTouched('confirmPassword')}
              error={
                touched.confirmPassword && errors.confirmPassword
                  ? errors.confirmPassword
                  : undefined
              }
            />
            <InputCustom
              placeholder="Nhập email..."
              lable="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
              error={touched.email && errors.email ? errors.email : undefined}
            />
            <InputCustom
              isRequired={true}
              placeholder="Nhập số điện thoại..."
              lable="Số điện thoại"
              value={values.phone}
              onChangeText={handleChange('phone')}
              onBlur={() => setFieldTouched('phone')}
              error={touched.phone && errors.phone ? errors.phone : undefined}
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

            {error && (
              <TextCustom style={CommonStyles.text__danger}>
                {error?.message}
              </TextCustom>
            )}

            <ButtonSubmitGroup
              style={[
                CommonStyles.margin__top__20,
                [CommonStyles.margin__top__20, Styles.btn__cancel],
              ]}
              styleText={[
                Styles.btn__submmit,
                [Styles.btn__submmit, Styles.btn__cancel],
              ]}
              title={['Đăng ký', 'Huỷ bỏ']}
              onPress={[handleSubmit, handleCancel]}
            />
          </View>
        );
      }}
    </Formik>
  );
};

export default Register;
