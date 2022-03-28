import React, {useCallback} from 'react';
import {List, Radio, Space} from 'antd-mobile';
import {hooks} from '@kne/react-form-helper';
import withFetchList from "../common/withFetchList";

const {useOnChange} = hooks;

const RadioGroup = ({onChange, children, options, ...props}) => {
    const handler = useCallback((value) => {
        onChange && onChange(value);
    }, [onChange]);
    return <Radio.Group {...props} onChange={handler}>
        <Space direction='vertical'>
            {children || options.map(({label, value, ...others}) => <Radio {...others} value={value}
                                                                           key={value}>{label}</Radio>)}
        </Space>
    </Radio.Group>
};

const _RadioGroup = (props) => {
    const render = useOnChange(props);
    return render(RadioGroup);
};

_RadioGroup.Radio = Radio;

_RadioGroup.Item = (props) => {
    return <List.Item title={props.label}>
        <_RadioGroup {...props} labelHidden/>
    </List.Item>
};

_RadioGroup.Fetch = withFetchList(RadioGroup);

_RadioGroup.FetchItem = (props) => {
    return <List.Item title={props.label}>
        <_RadioGroup.Fetch {...props} labelHidden/>
    </List.Item>
};

export default _RadioGroup;
