import React, {useEffect} from 'react';
import {RootState, useAppDispatch} from '../../../redux/store';
import {loginAction} from '../../../redux/user/user.service';
import {View} from 'react-native';
import {CommonStyles} from '../../../utils/styles';
import InputCustom from '../../../components/common/InputCustom/InputCustom';
import TextCustom from '../../../components/common/TextCustom/TextCustom';
import {Styles} from './Login.styles';
import ButtonSubmit from '../../../components/common/ButtonSubmit/ButtonSubmit';
import {Routes} from '../../../navigators/Routes';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {validationSpacePassword} from '../../../utils/regex';
import {useSelector} from 'react-redux';
import {clearErrorUser} from '../../../redux/user/user.reducer';

interface IProps {
  navigation?: any;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Dữ liệu không được để trống').trim(),
  password: Yup.string()
    .required('Dữ liệu không được để trống')
    .matches(validationSpacePassword, 'Định dạng không hợp lệ'),
});

const initValue: IRequestLogin = {
  name: '',
  password: '',
};

const Login: React.FC<IProps> = props => {
  const {navigation} = props;
  const dispatch = useAppDispatch();
  const {error} = useSelector((state: RootState) => state.user);

  const handleLogin = (values: IRequestLogin) => {
    dispatch(
      loginAction(values, async data => {
        navigation.replace(Routes.home.main);
      }),
    );
  };

  useEffect(() => {
    dispatch(clearErrorUser());
  }, []);

  return (
    <Formik
      initialValues={initValue}
      validationSchema={validationSchema}
      onSubmit={(values, {setFieldValue, setSubmitting}) => {
        handleLogin(values);
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
              placeholder="Nhập tên tài khoản..."
              lable="Tài khoản"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={() => setFieldTouched('name')}
              error={touched.name && errors.name ? errors.name : undefined}
            />
            <InputCustom
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
            {error && (
              <TextCustom style={CommonStyles.text__danger}>
                {error?.message}
              </TextCustom>
            )}

            <TextCustom
              isLink={true}
              to={{
                screen: Routes.auth.register,
                params: {
                  text: 'Đăng ký tài khoản',
                },
              }}
              style={CommonStyles.text__link}>
              {'Đăng ký tài khoản'}
            </TextCustom>

            <ButtonSubmit
              style={CommonStyles.margin__top__20}
              styleText={[CommonStyles.text__bold, CommonStyles.text__font__20]}
              title="Đăng nhập"
              onPress={handleSubmit}
            />
          </View>
        );
      }}
    </Formik>
  );
};

export default Login;
