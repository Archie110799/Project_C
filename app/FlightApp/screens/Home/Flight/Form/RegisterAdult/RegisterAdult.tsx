import React, {useEffect} from 'react';
import InputCustom from '../../../../../components/common/InputCustom/InputCustom';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {RadioButton} from 'react-native-paper';
import {View} from 'react-native';
import {CommonStyles} from '../../../../../utils/styles';
import TextCustom from '../../../../../components/common/TextCustom/TextCustom';
import {validationCCID} from '../../../../../utils/regex';
import InputDatePicker from '../../../../../components/common/InputDatePicker/InputDatePicker';
import ButtonSubmit from '../../../../../components/common/ButtonSubmit/ButtonSubmit';

interface IProps {
  onSubmitForm: (values: IAdult) => void;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Dữ liệu không được để trống').trim(),
  ccid: Yup.string()
    .required('Dữ liệu không được để trống')
    .trim()
    .matches(validationCCID, 'Định dạng không hợp lệ'),
});

const initValue: IAdult = {
  name: '',
  birthDate: new Date(),
  gender: '0',
  ccid: '',
};

const RegisterAdultForm: React.FC<IProps> = props => {
  const {onSubmitForm} = props;
  const handleSubmitForm = (values: IAdult) => {
    console.log('handleSubmitForm', values);
    onSubmitForm(values);
  };
  return (
    <Formik
      initialValues={initValue}
      validationSchema={validationSchema}
      onSubmit={values => {
        handleSubmitForm(values);
      }}>
      {({
        values,
        handleChange,
        errors,
        setFieldTouched,
        touched,
        handleSubmit,
        submitForm,
        setFieldValue,
      }) => {
        return (
          <>
            <InputCustom
              isRequired={true}
              placeholder="Nhập họ và tên..."
              lable="Họ và tên"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={() => setFieldTouched('name')}
              error={touched.name && errors.name ? errors.name : undefined}
            />
            <InputCustom
              placeholder="Nhập căn cước công dân..."
              lable="ID"
              value={values.ccid}
              onChangeText={handleChange('ccid')}
              onBlur={() => setFieldTouched('ccid')}
              error={touched.ccid && errors.ccid ? errors.ccid : undefined}
              keyboardType="numeric"
            />

            <InputDatePicker
              lable="Ngày sinh"
              value={values.birthDate as Date}
              onChange={value => {
                setFieldValue('birthDate', value);
              }}
              maximumDate={new Date()}
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
              styleText={[CommonStyles.text__bold, CommonStyles.text__font__20]}
              title="Tiếp theo"
              onPress={handleSubmit}
            />
          </>
        );
      }}
    </Formik>
  );
};

export default RegisterAdultForm;
