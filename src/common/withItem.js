import React from 'react';
import classnames from 'classnames';
import {List} from "antd-mobile";

const withItem = (WrappedComponent) => (props) => {
    console.log(props);
    const listProps = props.labelHidden === true ? {} : {title: props.label};
    return <List.Item {...listProps} className={classnames(listProps.className, {
        'is-req': typeof props.rule === 'string' && (props.rule || '').split(' ').indexOf('REQ') > -1
    })}>
        <WrappedComponent {...props} labelHidden/>
    </List.Item>
};

export default withItem;
