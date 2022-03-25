import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import {List} from 'antd-mobile';
import classnames from 'classnames';
import ReactForm from '@kne/react-form';
import {widget} from '@kne/react-form-helper';
import './assets/index.scss';

export * from '@kne/react-form';
export {hooks, widget, utils} from '@kne/react-form-helper';

const {ScrollToError, EnterSubmit, FormStore} = widget;

const Form = forwardRef(({
                             className,
                             cache,
                             enterSubmit,
                             scrollToError,
                             scrollProps,
                             children,
                             ...props
                         }, ref) => {
    const inner = children;
    return (
        <form className={classnames('react-form', className)} onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
        }}>
            <ReactForm {...props} ref={ref}>
                {cache ? <FormStore cache={cache}/> : null}
                {scrollToError ? <ScrollToError scrollProps={scrollProps}/> : null}
                {enterSubmit ? <EnterSubmit>
                    {inner}
                </EnterSubmit> : inner}
            </ReactForm>
        </form>
    );
});

Form.defaultProps = {
    scrollToError: true,
    enterSubmit: false,
    scrollProps: {
        block: 'center'
    }
};

Form.propTypes = {
    className: PropTypes.string,
    enterSubmit: PropTypes.bool,
    scrollToError: PropTypes.bool,
    scrollProps: PropTypes.shape({
        block: PropTypes.oneOf(['start', 'center', 'end', 'nearest']),
        behavior: PropTypes.oneOf(['auto', 'smooth']),
        inline: PropTypes.oneOf(['start', 'center', 'end', 'nearest'])
    })
};

export default Form;
