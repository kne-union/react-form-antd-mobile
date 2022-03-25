import React from 'react';
import {Slider, List} from 'antd-mobile';
import {hooks} from '@kne/react-form-helper';

const {useOnChange} = hooks;

const SliderField = (props) => {
    const render = useOnChange(props);
    return render(Slider);
};

SliderField.Item = (props) => {
    return <List.Item title={props.label}>
        <SliderField {...props} labelHidden/>
    </List.Item>
};

export default SliderField;
