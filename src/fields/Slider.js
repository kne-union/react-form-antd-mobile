import React from 'react';
import {Slider} from 'antd-mobile';
import {hooks} from '@kne/react-form-helper';
import withItem from "../common/withItem";

const {useOnChange} = hooks;

const SliderField = (props) => {
    const render = useOnChange(props);
    return render(Slider);
};

SliderField.Item = withItem(SliderField);

export default SliderField;
