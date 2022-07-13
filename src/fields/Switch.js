import React from 'react';
import {Switch as _Switch} from 'antd-mobile';
import {hooks, hoc} from '@kne/react-form-helper';
import withItem from "../common/withItem";

const {useOnChange, useCheckedToValue} = hooks;
const {withChecked} = hoc;
const WithSwitch = withChecked(_Switch);

const Switch = (props) => {
    const checkedProps = useCheckedToValue(props);
    const render = useOnChange(checkedProps);
    return render(WithSwitch);
};

Switch.Item = withItem(Switch);

export default Switch;
