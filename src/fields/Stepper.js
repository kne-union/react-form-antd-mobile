import React from 'react';
import {Stepper, List} from 'antd-mobile';
import {hooks} from '@kne/react-form-helper';

const {useDecorator} = hooks;

const StepperField = (props) => {
    const render = useDecorator(Object.assign({placeholder: `请输入${props.label}`}, props));
    return render(Stepper);
};

StepperField.Item = (props) => {
    return <List.Item title={props.label}>
        <StepperField {...props} labelHidden/>
    </List.Item>
};

export default StepperField;
