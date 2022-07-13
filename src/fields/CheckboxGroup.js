import React, {useCallback} from 'react';
import {Checkbox, Space} from 'antd-mobile';
import {hooks} from '@kne/react-form-helper';
import withFetchList from '../common/withFetchList';
import withItem from "../common/withItem";

const {useOnChange} = hooks;

const CheckboxGroup = ({onChange, children, options, ...props}) => {
    const handler = useCallback((value) => {
        onChange && onChange(value);
    }, [onChange]);
    return <Checkbox.Group {...props} onChange={handler}>
        <Space direction='vertical'>
            {children || options.map(({label, value, others}) => <Checkbox {...others} value={value}
                                                                           key={value}>{label}</Checkbox>)}
        </Space>
    </Checkbox.Group>
};

const _CheckboxGroup = (props) => {
    const render = useOnChange(props);
    return render(CheckboxGroup);
};

_CheckboxGroup.Checkbox = Checkbox;

_CheckboxGroup.Item = withItem(_CheckboxGroup);

_CheckboxGroup.Fetch = withFetchList(CheckboxGroup);

_CheckboxGroup.FetchItem = withItem(_CheckboxGroup.Fetch);

export default _CheckboxGroup;
