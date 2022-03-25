import React from 'react';
import {Rate, List} from 'antd-mobile';
import {hooks} from '@kne/react-form-helper';

const {useOnChange} = hooks;

const RateField = (props) => {
    const render = useOnChange(props);
    return render(Rate);
};

RateField.Item = (props) => {
    return <List.Item title={props.label}>
        <RateField {...props} labelHidden/>
    </List.Item>
};;

export default RateField;
