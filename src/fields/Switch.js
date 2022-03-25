import React from 'react';
import {List, Switch as _Switch} from 'antd-mobile';
import {hooks, hoc} from '@kne/react-form-helper';

const {useOnChange, useCheckedToValue} = hooks;
const {withChecked} = hoc;
const WithSwitch = withChecked(_Switch);

const Switch = (props) => {
    const checkedProps = useCheckedToValue(props);
    const render = useOnChange(checkedProps);
    return render(WithSwitch);
};

Switch.Item = (props) => {
    return <List.Item title={props.label}>
        <Switch {...props} labelHidden/>
    </List.Item>
};

export default Switch;
