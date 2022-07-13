import {Checkbox as _Checkbox} from 'antd-mobile';
import {hooks, hoc} from '@kne/react-form-helper';
import React from "react";
import withItem from "../common/withItem";

const {useOnChange, useCheckedToValue} = hooks;
const {withChecked} = hoc;

const WithCheckbox = withChecked(_Checkbox);

const Checkbox = (props) => {
    const checkedProps = useCheckedToValue(props);
    const render = useOnChange(checkedProps);
    return render(WithCheckbox);
};

Checkbox.Item = withItem(Checkbox);

export default Checkbox;
