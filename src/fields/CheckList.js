import React, {useMemo, useState} from "react";
import {CheckList, Popup, NavBar, Button} from "antd-mobile";
import withDecoratorList from '../common/withDecoratorList';

const CheckListPopup = ({
                            value,
                            visible,
                            onConfirm,
                            onClose,
                            afterClose,
                            placeholder,
                            onChange,
                            options,
                            children,
                            ...props
                        }) => {
    const [pickerValue, setPickerValue] = useState(value);
    return <Popup bodyClassName="react-form__popup" visible={visible} onConfirm={onConfirm} onClose={onClose}
                  afterClose={afterClose} position="right">
        <NavBar backArrow={<Button color='primary' fill='none'>返回</Button>}
                right={<Button color='primary' fill='none' onClick={() => {
                    onChange(pickerValue);
                    onClose();
                }}>确定</Button>} onBack={() => {
            onClose();
        }}>{placeholder}</NavBar>
        <CheckList {...props} options={options} onChange={(value) => {
            setPickerValue(value);
        }} value={pickerValue}>
            {children || options.map(({label, value, ...others}) => <CheckList.Item {...others} value={value}
                                                                                    key={value}>{label}</CheckList.Item>)}
        </CheckList>
    </Popup>;
};

const CheckListInput = ({render, options, placeholder, value, showPopup}) => {
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
        onClick: showPopup
    });
};

const CheckListField = withDecoratorList(CheckListInput, true)(CheckListPopup);

export default CheckListField;
