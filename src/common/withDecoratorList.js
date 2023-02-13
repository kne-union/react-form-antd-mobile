import React, {useEffect, useRef, useState} from 'react';
import {List} from "antd-mobile";
import {hooks} from "@kne/react-form-helper";
import withLayer from './withLayer';
import useEvent from "@kne/use-event";
import classnames from "classnames";
import withFetchList from './withFetchList';

const {useOnChange} = hooks;

const withDecoratorList = (LabelComponent, hasFetch) => (WrappedComponent) => {
    const createPopup = withLayer(WrappedComponent);

    const FieldComponent = ({emitter, ...props}) => {
        const showPopup = (e, otherProps) => {
            e && e.stopPropagation();
            createPopup(Object.assign({}, props, otherProps));
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
        const render = useOnChange(Object.assign({placeholder: `请选择${props.label}`}, props));
        return render(FieldComponent);
    };

    Field.defaultProps = {};

    Field.Item = (props) => {
        const emitter = useEvent();
        const listProps = props.labelHidden === true ? {} : {title: props.label};
        return <List.Item {...listProps} className={classnames(listProps.className, {
            'is-req': typeof props.rule === 'string' && (props.rule || '').split(' ').indexOf('REQ') > -1
        })} onClick={() => {
            emitter.emit('show');
        }}>
            <Field {...props} labelHidden emitter={emitter}/>
        </List.Item>
    };

    if (hasFetch) {
        const FetchField = withFetchList(FieldComponent);

        Field.Fetch = FetchField;

        Field.FetchItem = (props) => {
            const emitter = useEvent();
            return <List.Item title={props.label} className={classnames(props.className, {
                'is-req': typeof props.rule === 'string' && (props.rule || '').split(' ').indexOf('REQ') > -1
            })} onClick={() => {
                emitter.emit('show');
            }}>
                <FetchField {...props} labelHidden emitter={emitter}/>
            </List.Item>
        };
    }
    return Field;
};

export default withDecoratorList;
