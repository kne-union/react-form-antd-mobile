import React from 'react';
import {Input, List} from 'antd-mobile';
import {hooks} from '@kne/react-form-helper';

const {useDecorator} = hooks;

const InputField = (props) => {
    const render = useDecorator(Object.assign({placeholder: `请输入${props.label}`}, props));
    return render(Input);
};

InputField.Item = (props) => {
    return <List.Item title={props.label}>
        <InputField {...props} labelHidden/>
    </List.Item>
};

export default InputField;
