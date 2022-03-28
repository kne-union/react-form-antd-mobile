import React from 'react';
import {Selector, List} from 'antd-mobile';
import {hooks} from '@kne/react-form-helper';
import withFetchList from '../common/withFetchList';

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

SelectorField.Fetch = withFetchList(Selector);

SelectorField.FetchItem = (props) => {
    return <List.Item title={props.label}>
        <SelectorField.Fetch {...props} labelHidden/>
    </List.Item>
};

export default SelectorField;
