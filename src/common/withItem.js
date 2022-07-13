import React from 'react';
import {List} from "antd-mobile";

const withItem = (WrappedComponent) => (props) => {
    const listProps = props.labelHidden === true ? {} : {title: props.label};
    return <List.Item {...listProps}>
        <WrappedComponent {...props} labelHidden/>
    </List.Item>
};

export default withItem;
