import React from 'react';
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

interface IProps {
  navigation?: any;
}

const validationSchema = Yup.object({
  name: Yup.string().required('required').trim(),
  password: Yup.string()
    .required('required')
    .matches(validationSpacePassword, 'format invalid'),
});

const initValue: IRequestLogin = {
  name: 'admin',
  password: 'admin',
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
            <TextCustom style={Styles.text__title}>Welcome</TextCustom>
            <InputCustom
              placeholder="Enter your user name"
              lable="Username"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={() => setFieldTouched('name')}
              error={touched.name && errors.name ? errors.name : undefined}
            />
            <InputCustom
              type="password"
              placeholder="Enter your password"
              lable="Password"
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
            <ButtonSubmit
              style={CommonStyles.margin__top__20}
              styleText={[CommonStyles.text__bold, CommonStyles.text__font__20]}
              title="Login"
              onPress={handleSubmit}
            />
          </View>
        );
      }}
    </Formik>
  );
};

export default Login;
