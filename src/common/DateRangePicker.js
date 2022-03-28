import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Picker} from 'antd-mobile';
import range from 'lodash/range';
import get from 'lodash/get';
import dayjs from 'dayjs';

const precisionToLength = (precision) => {
    return ({'year': 1, 'month': 2, 'day': 3})[precision] || 3;
};

const useRange = ({max, min, value, renderLabel, soFar, precision}) => {
    const currentDate = dayjs(value), currentYear = currentDate.year(), currentMonth = currentDate.month();
    const minDate = dayjs(min), minYear = minDate.year(), minMonth = minDate.month(), minDay = minDate.date();
    const maxDate = dayjs(max), maxYear = maxDate.year(), maxMonth = maxDate.month(), maxDay = maxDate.date();
    const yearList = useMemo(() => {
        const list = range(minYear, maxYear + 1).map((value) => {
            return {
                value,
                label: renderLabel('year', value)
            };
        });
        soFar && list.push({
            value: -1,
            label: '至今'
        });
        return list;
    }, [minYear, maxYear, renderLabel, soFar]);
    const minRangeMonth = minYear === currentYear ? minMonth : 0,
        maxRangeMonth = maxYear === currentYear ? maxMonth + 1 : 12;
    const monthList = useMemo(() => {
        return range(minRangeMonth, maxRangeMonth).map((value) => {
            return {
                value: value,
                label: renderLabel('month', value + 1)
            };
        });
    }, [minRangeMonth, maxRangeMonth, renderLabel]);
    const minRangeDay = minYear === currentYear && minMonth === currentMonth ? minDay : 1;
    const maxRangeDay = maxYear === currentYear && maxMonth === currentMonth ? maxDay + 1 : (() => {
        if (currentMonth === 1 && currentYear % 4 === 0) {
            return 30;
        }
        if (currentMonth === 1 && currentYear % 4 !== 0) {
            return 29;
        }
        if ([1, 3, 5, 7, 8, 10, 12].indexOf(currentMonth) >= 1) {
            return 32;
        }
        return 31;
    })();
    const dayList = useMemo(() => {
        return range(minRangeDay, maxRangeDay).map((value) => {
            return {
                value,
                label: renderLabel('day', value)
            };
        });
    }, [minRangeDay, maxRangeDay, renderLabel]);
    const length = precisionToLength(precision);
    return value === 'sofar' ? [yearList, [], []].slice(0, length) : [yearList, monthList, dayList].slice(0, length);
};

const dateToColumns = (value, length = 3) => {
    const startValue = get(value, '0'), endValue = get(value, '1'), output = [];
    if (!startValue || !endValue) {
        const now = dayjs(), year = now.year(), month = now.month(), day = now.date();
        return [...[year, month, day].slice(0, length), ...[year, month, day].slice(0, length)];
    }
    const startDate = dayjs(startValue);
    output.push(...[startDate.year(), startDate.month(), startDate.date()].slice(0, length));
    if (endValue === 'sofar') {
        output.push(-1);
    } else {
        const endDate = dayjs(endValue);
        output.push(...[endDate.year(), endDate.month(), endDate.date()].slice(0, length));
    }
    return output;
};

const columnsToDate = (value) => {
    if (value[0] === -1) {
        return 'sofar';
    }
    let output = dayjs(new Date(0));
    ['year', 'month', 'date'].forEach((key, index) => {
        if (value[index] !== void (0)) {
            output = output[key](value[index]);
        } else {
            return;
        }
    });
    return output.toDate();
};

const DateRangePicker = ({
                             max,
                             min,
                             precision,
                             soFar,
                             renderLabel,
                             value: currentValue,
                             onConfirm,
                             ...props
                         }) => {
    const length = precisionToLength(precision);
    const [value, setValue] = useState(dateToColumns(currentValue, length));
    const {startValue, endValue} = useMemo(() => {
        return {
            startValue: columnsToDate(value.slice(0, length)),
            endValue: columnsToDate(value.slice(length))
        };
    }, [value, length]);

    const startList = useRange({
        max, min, value: startValue, renderLabel, precision
    });
    const endList = useRange({
        max, min: startValue || min, value: endValue, renderLabel, soFar, precision
    });

    const columns = useMemo(() => startList.concat(endList), [startList, endList]);
    return <Picker {...props} columns={columns} value={value} afterShow={() => {
        setValue(dateToColumns(currentValue, length));
    }} onSelect={(value) => {
        setValue(value);
    }} onConfirm={() => {
        onConfirm && onConfirm([columnsToDate(value.slice(0, length)), columnsToDate(value.slice(length))]);
    }}/>
};

DateRangePicker.defaultProps = {
    renderLabel: (type, data) => {
        return data;
    },
    value: [new Date(), new Date()],
    soFar: true,
    precision: 'day',
    min: new Date('1949-10-01'),
    max: new Date()
};

export default DateRangePicker;
