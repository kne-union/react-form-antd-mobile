import React from 'react';
import {Selector} from 'antd-mobile';
import {hooks} from '@kne/react-form-helper';
import withFetchList from '../common/withFetchList';
import withItem from "../common/withItem";

const {useOnChange} = hooks;

const SelectorField = (props) => {
    const render = useOnChange(props);
    return render(Selector);
};

SelectorField.Item = withItem(SelectorField);

SelectorField.Fetch = withFetchList(Selector);

SelectorField.FetchItem = withItem(SelectorField.Fetch);

export default SelectorField;
