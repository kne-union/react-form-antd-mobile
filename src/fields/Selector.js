import React from 'react';
import {Selector, List} from 'antd-mobile';
import {hooks} from '@kne/react-form-helper';

const {useOnChange} = hooks;

const SelectorField = (props) => {
    const render = useOnChange(props);
    return render(Selector);
};

SelectorField.Item = (props) => {
    return <List.Item title={props.label}>
        <SelectorField {...props} labelHidden/>
    </List.Item>
};

export default SelectorField;
