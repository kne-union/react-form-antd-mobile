import {Checkbox as _Checkbox, List} from 'antd-mobile';
import {hooks, hoc} from '@kne/react-form-helper';
import React from "react";

const {useOnChange, useCheckedToValue} = hooks;
const {withChecked} = hoc;

const WithCheckbox = withChecked(_Checkbox);

const Checkbox = (props) => {
    const checkedProps = useCheckedToValue(props);
    const render = useOnChange(checkedProps);
    return render(WithCheckbox);
};

Checkbox.Item = (props) => {
    return <List.Item title={props.label}>
        <Checkbox {...props} labelHidden/>
    </List.Item>
};

export default Checkbox;
