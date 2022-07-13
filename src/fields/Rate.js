import React from 'react';
import {Rate} from 'antd-mobile';
import {hooks} from '@kne/react-form-helper';
import withItem from "../common/withItem";

const {useOnChange} = hooks;

const RateField = (props) => {
    const render = useOnChange(props);
    return render(Rate);
};

RateField.Item = withItem(RateField);

export default RateField;
