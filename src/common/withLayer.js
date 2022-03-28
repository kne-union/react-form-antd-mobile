import ReactDOM from 'react-dom';
import React, {useEffect, useState} from 'react';

const renderToBody = (element) => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    function unmount() {
        const unmountResult = ReactDOM.unmountComponentAtNode(container)
        if (unmountResult && container.parentNode) {
            container.parentNode.removeChild(container)
        }
    }

    ReactDOM.render(element, container)
    return unmount
};

const withLayer = (WrappedComponent) => (props) => {
    const Layer = ({onConfirm, onClose, afterClose, ...props}) => {
        const [visible, setVisible] = useState(false);
        useEffect(() => {
            setVisible(true);
        }, []);
        return (
            <WrappedComponent
                {...props}
                visible={visible}
                onConfirm={(val, extend) => {
                    onConfirm && onConfirm(val, extend);
                }}
                onClose={() => {
                    onClose && onClose();
                    setVisible(false)
                }}
                afterClose={() => {
                    afterClose && afterClose();
                    unmount()
                }}
            />
        )
    };
    const unmount = renderToBody(<Layer {...props}/>);

    return unmount;
};

export default withLayer;
