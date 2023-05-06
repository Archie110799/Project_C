import React from 'react';
import {useAppDispatch} from '../../../../redux/store';
import {Routes} from '../../../../navigators/Routes';
import {Alert, View} from 'react-native';
import TextCustom from '../../../../components/common/TextCustom/TextCustom';
import {Styles} from './UserForm.styles';
import {CommonStyles} from '../../../../utils/styles';
import * as Yup from 'yup';
import {
  validationEmail,
  validationPassword,
  validationPhone,
  validationSpacePassword,
} from '../../../../utils/regex';
import {
  registerAction,
  updateUserAsync,
} from '../../../../redux/user/user.service';
import InputCustom from '../../../../components/common/InputCustom/InputCustom';
import {RadioButton} from 'react-native-paper';
import ButtonSubmit from '../../../../components/common/ButtonSubmit/ButtonSubmit';
import DropdownCustom from '../../../../components/common/DropdownCustom/DropdownCustom';
import {Formik} from 'formik';

interface IProps {
  navigation?: any;
  route?: any;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Dữ liệu không được để trống').trim(),
  password: Yup.string()
    .required('Dữ liệu không được để trống')
    .matches(validationPassword, 'Định dạng không hợp lệ')
    .matches(validationSpacePassword, 'Định dạng không hợp lệ'),
  confirmPassword: Yup.string()
    .required('Dữ liệu không được để trống')
    .oneOf([Yup.ref('password'), ''], 'Mật khẩu không trùng khớp'),
  email: Yup.string().trim().matches(validationEmail, 'Định dạng không hợp lệ'),
  phone: Yup.string()
    .required('Dữ liệu không được để trống')
    .trim()
    .matches(validationPhone, 'Định dạng không hợp lệ'),
});

const UserForm: React.FC<IProps> = props => {
  const {navigation, route} = props;
  const dispatch = useAppDispatch();
  const userProps = route?.params?.user;

  const initValue: IRequestRegister = userProps
    ? {
        ...userProps,
        confirmPassword: '',
      }
    : {
        name: 'user1',
        password: 'User1@flight',
        confirmPassword: 'User1@flight',
        email: 'user1@gmail.com',
        gender: '0',
        phone: '0123456789',
        type: 1,
      };

  const handleRegister = (values: IRequestRegister) => {
    if (userProps) {
      dispatch(
        updateUserAsync(userProps?._id, values, () => {
          showAlert();
        }),
      );
    } else {
      dispatch(
        registerAction(values, () => {
          showAlert();
        }),
      );
    }
  };

  const showAlert = () =>
    Alert.alert(
      userProps ? 'Cập nhật' : 'Đăng ký',
      `${userProps ? 'Cập nhật' : 'Đăng ký'}thành công.`,
      [
        {
          text: 'OK',
          onPress: () => navigation.replace(Routes.user.list),
        },
      ],
    );

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
        setFieldValue,
      }) => {
        return (
          <View style={[Styles.container, CommonStyles.margin__top__10]}>
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

            <DropdownCustom
              title="Loại"
              data={['ADMIN', 'CUSTOMER']}
              defaultValue={!values.type ? 'ADMIN' : 'CUSTOMER'}
              onSelect={(selectedItem, index) => {
                setFieldValue('type', selectedItem === 'ADMIN' ? 0 : 1);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />

            <RadioButton.Group
              onValueChange={handleChange('gender')}
              value={values.gender.toString()}>
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
              styleText={[CommonStyles.text__bold, CommonStyles.text__font__20]}
              title={userProps ? 'Cập nhật' : 'Tạo mới'}
              onPress={handleSubmit}
            />
          </View>
        );
      }}
    </Formik>
  );
};

export default UserForm;
