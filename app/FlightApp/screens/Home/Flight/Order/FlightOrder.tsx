import React, {useEffect} from 'react';
import {RootState, useAppDispatch} from '../../../../redux/store';
import {useSelector} from 'react-redux';
import {Routes} from '../../../../navigators/Routes';
import {View} from 'react-native';
import TextCustom from '../../../../components/common/TextCustom/TextCustom';
import {Styles} from './FlightOrder.styles';

interface IProps {
  navigation?: any;
}
const FlightOrder: React.FC<IProps> = props => {
  const {navigation} = props;
  const {flightSelected} = useSelector((state: RootState) => state.flight);
  const dispatch = useAppDispatch();

  useEffect(() => {
    flightSelected && console.log(flightSelected);
  }, [flightSelected]);

  return (
    <View style={Styles.container}>
      <TextCustom style={Styles.text__title}>FlightOrder</TextCustom>
    </View>
  );
};

export default FlightOrder;
