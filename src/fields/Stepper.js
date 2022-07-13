import React from 'react';
import {Stepper} from 'antd-mobile';
import {hooks} from '@kne/react-form-helper';
import withItem from "../common/withItem";

const {useDecorator} = hooks;

const StepperField = (props) => {
    const render = useDecorator(Object.assign({placeholder: `请输入${props.label}`}, props));
    return render(Stepper);
};

StepperField.Item = withItem(StepperField);

export default StepperField;
