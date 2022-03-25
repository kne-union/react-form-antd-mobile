import React from 'react';
import {TextArea, List} from 'antd-mobile';
import {hooks} from '@kne/react-form-helper';

const {useDecorator} = hooks;

const TextAreaField = (props) => {
    const render = useDecorator(Object.assign({placeholder: `请输入${props.label}`}, props));
    return render(TextArea);
};

TextAreaField.Item = (props) => {
    return <List.Item title={props.label}>
        <TextAreaField {...props} labelHidden/>
    </List.Item>
};

export default TextAreaField;
