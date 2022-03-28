import React, {useEffect, useRef, useState} from 'react';
import {List} from "antd-mobile";
import {hooks} from "@kne/react-form-helper";
import withLayer from './withLayer';
import useEvent from "@kne/use-event";
import classnames from "classnames";

const {useDecorator} = hooks;

const withDecoratorList = (LabelComponent) => (WrappedComponent) => {
    const createPopup = withLayer(WrappedComponent);

    const FieldComponent = ({emitter, ...props}) => {
        const showPopup = (e) => {
            e && e.stopPropagation();
            createPopup(props);
        };
        const showPopupRef = useRef(showPopup);
        showPopupRef.current = showPopup;

        useEffect(() => {
            const token = emitter && emitter.addListener('show', () => showPopupRef.current());
            return () => {
                token && token.remove();
            };
        }, [emitter]);

        return <LabelComponent {...props} showPopup={showPopup}/>
    };

    FieldComponent.defaultProps = {
        render: ({label, placeholder, onClick}) => {
            return <span className={classnames({
                "react-form__placeholder": !label
            })} onClick={onClick}>{label || placeholder}</span>
        }
    };

    const Field = (props) => {
        const render = useDecorator(Object.assign({placeholder: `请选择${props.label}`}, props));
        return render(FieldComponent);
    };

    Field.defaultProps = {};

    Field.Item = (props) => {
        const emitter = useEvent();
        return <List.Item title={props.label} onClick={() => {
            emitter.emit('show');
        }}>
            <Field {...props} labelHidden emitter={emitter}/>
        </List.Item>
    };

    return Field;
};

export default withDecoratorList;
