import React, {useMemo} from 'react';
import {Picker, CascadePicker, DatePicker} from 'antd-mobile';
import withDecoratorList from '../common/withDecoratorList';
import DateRangePicker from '../common/DateRangePicker';
import dayjs from 'dayjs';

const withOnConfirm = (WrappedComponent) => ({onChange, ...props}) => {
    return <WrappedComponent {...props} title={props.placeholder} onConfirm={(value) => {
        onChange(value);
    }}/>
};

const PickerField = withDecoratorList(({render, placeholder, showPopup, value, columns}) => {
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
        onClick: showPopup
    });
})(withOnConfirm(Picker));

PickerField.CascadePicker = withDecoratorList(({render, placeholder, showPopup, value, options}) => {
    const label = useMemo(() => {
        if (!value) {
            return '';
        }
        const output = [];
        let columns = options;
        for (let item of value) {
            const obj = columns.find(({value}) => value === item);
            if (!obj) {
                break;
            }
            output.push(obj.label || obj.value);
            columns = obj.children || [];
        }

        return output.filter((item) => !!item).join(',');
    }, [value, options]);
    return render({
        label,
        value,
        placeholder,
        onClick: showPopup
    });
})(withOnConfirm(CascadePicker));

PickerField.DatePicker = withDecoratorList(({render, placeholder, showPopup, value, format}) => {
    const label = useMemo(() => {
        if (!value) {
            return '';
        }
        return dayjs(value).format(format);
    }, [value]);
    return render({
        label,
        value,
        placeholder,
        onClick: showPopup
    });
})(withOnConfirm(DatePicker));

PickerField.DatePicker.defaultProps = {
    format: 'YYYY-MM-DD',
    renderLabel: (type, data) => {
        switch (type) {
            case 'year':
                return data + '年'
            case 'month':
                return data + '月'
            case 'day':
                return data + '日'
            case 'hour':
                return data + '时'
            case 'minute':
                return data + '分'
            case 'second':
                return data + '秒'
            default:
                return data
        }
    }
};


PickerField.DateRangePicker = withDecoratorList(({render, placeholder, showPopup, value, format}) => {
    const label = useMemo(() => {
        if (!value) {
            return '';
        }
        return value.map((value) => value === 'sofar' ? '至今' : dayjs(value).format(format)).join('~');
    }, [value]);

    return render({
        label,
        value,
        placeholder,
        onClick: showPopup
    });
})(withOnConfirm(DateRangePicker));

PickerField.DateRangePicker.defaultProps = {
    format: 'YYYY-MM-DD',
    renderLabel: (type, data) => {
        switch (type) {
            case 'year':
                return data + '年'
            case 'month':
                return data + '月'
            case 'day':
                return data + '日'
            case 'hour':
                return data + '时'
            case 'minute':
                return data + '分'
            case 'second':
                return data + '秒'
            default:
                return data
        }
    }
};

export default PickerField;
