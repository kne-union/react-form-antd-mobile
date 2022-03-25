import React, {useMemo, useState} from "react";
import {List, CheckList, Popup, NavBar, Button} from "antd-mobile";
import {hooks} from "@kne/react-form-helper";
import classnames from 'classnames';

const {useDecorator} = hooks;

const CheckListInput = ({render, visible, children, setVisible, options, placeholder, onChange, value, ...props}) => {
    const [pickerValue, setPickerValue] = useState(value);
    const label = useMemo(() => {
        if (!value) {
            return '';
        }
        return value.map((value) => {
            const item = (options || []).find((item) => item.value === value);
            if (item) {
                return item.label || item.value;
            }
            return '';
        }).filter((item) => !!item).join(',');
    }, [value, options]);
    return render({
        label,
        value,
        placeholder,
        onClick: () => {
            setVisible(true);
        },
        children: <Popup bodyClassName="react-form__popup" visible={visible} onClose={() => {
            setVisible(false);
        }} onMaskClick={() => {
            setVisible(false);
        }} position="right">
            <NavBar backArrow={<Button color='primary' fill='none'>返回</Button>}
                    right={<Button color='primary' fill='none' onClick={() => {
                        onChange(pickerValue);
                        setVisible(false);
                    }}>确定</Button>} onBack={() => {
                setVisible(false);
            }}>{placeholder}</NavBar>
            <CheckList {...props} options={options} onChange={(value) => {
                setPickerValue(value);
            }} value={pickerValue}>
                {children || options.map(({label, value, ...others}) => <CheckList.Item {...others} value={value}
                                                                                        key={value}>{label}</CheckList.Item>)}
            </CheckList>
        </Popup>
    });
};

CheckListInput.defaultProps = {
    render: ({label, placeholder, onClick, children}) => {
        return <span className={classnames({
            "react-form__placeholder": !label
        })} onClick={onClick}>{label || placeholder}{children}</span>
    }
};

const CheckListField = (props) => {
    const [visible, setVisible] = useState(false);
    const render = useDecorator(Object.assign({placeholder: `请选择${props.label}`, visible, setVisible}, props));
    return render(CheckListInput);
};

CheckListField.defaultProps = {};

CheckListField.Item = (props) => {
    const [visible, setVisible] = useState(false);
    return <List.Item title={props.label} onClick={() => {
        setVisible(true);
    }}>
        <CheckListField {...props} labelHidden visible={visible} setVisible={setVisible}/>
    </List.Item>
};

export default CheckListField;
