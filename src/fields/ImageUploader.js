import {ImageUploader as ImageUploaderField} from 'antd-mobile';
import {hooks} from '@kne/react-form-helper';
import {globalParams} from '../preset';

const {useOnChange} = hooks;

const ImageUploader = (props) => {
    const render = useOnChange(Object.assign({}, props, {
        upload: globalParams.field.imageUploader.upload
    }));
    return render(ImageUploaderField);
};

ImageUploader.defaultProps = {
    value: []
};

export default ImageUploader;
