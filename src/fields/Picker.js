import React, {useState, useMemo, useEffect} from 'react';
import {Picker, CascadePicker, DatePicker, List} from 'antd-mobile';
import {hooks} from '@kne/react-form-helper';
import classnames from "classnames";

const {useDecorator} = hooks;

const createPickerField = (WrappedComponent) => {
    const PickerInput = ({render, visible, setVisible, columns, placeholder, onChange, value, ...props}) => {
        const label = useMemo(() => {
            if (!value) {
                return '';
            }
            return value.map((value, index) => {
                const item = (columns[index] || []).find((item) => item.value === value);
                if (item) {
                    return item.label || item.value;
                }
                return '';
            }).filter((item) => !!item).join(',');
        }, [value, columns]);
        return render({
            label,
            value,
            placeholder,
            onClick: () => {
                setVisible(true);
            },
            children: <WrappedComponent {...props} title={placeholder} columns={columns} visible={visible}
                                        onConfirm={(value) => {
                                            onChange(value);
                                            setVisible(false);
                                        }} onClose={() => {
                setVisible(false);
            }} value={value}/>
        });
    };

    PickerInput.defaultProps = {
        render: ({label, placeholder, onClick, children}) => {
            return <span className={classnames({
                "react-form__placeholder": !label
            })} onClick={onClick}>{label || placeholder}{children}</span>
        }
    };

    const PickerField = (props) => {
        const [visible, setVisible] = useState(false);
        const render = useDecorator(Object.assign({placeholder: `请选择${props.label}`, visible, setVisible}, props));
        return render(PickerInput);
    };

    PickerField.defaultProps = {};

    PickerField.Item = (props) => {
        const [visible, setVisible] = useState(false);
        return <List.Item title={props.label} onClick={() => {
            setVisible(true);
        }}>
            <PickerField {...props} labelHidden visible={visible} setVisible={setVisible}/>
        </List.Item>
    };

    return PickerField;
};

const PickerField = createPickerField(Picker);

PickerField.CascadePicker = createPickerField(CascadePicker);

PickerField.DatePicker = createPickerField(DatePicker);

export default PickerField;
