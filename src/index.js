import Form from './Form';

import Checkbox$ from './fields/Checkbox';
import CheckboxGroup$ from './fields/CheckboxGroup';
import CheckList$ from './fields/CheckList';
import ImageUploader$ from './fields/ImageUploader';
import Input$ from './fields/Input';
import Picker$ from './fields/Picker';
import RadioGroup$ from './fields/RadioGroup';
import Rate$ from './fields/Rate';
import Selector$ from './fields/Selector';
import Slider$ from './fields/Slider';
import Stepper$ from './fields/Stepper';
import Switch$ from './fields/Switch';
import TextArea$ from './fields/TextArea';

export * from './Form';
export default Form;
export {default as preset} from './preset';
export {default as withDecoratorList} from './common/withDecoratorList';
export {default as ResetButton} from './ResetButton';
export {default as SubmitButton} from './SubmitButton';
export {default as CancelButton} from './CancelButton';

export const Checkbox = Checkbox$;
export const CheckboxGroup = CheckboxGroup$;
export const CheckList = CheckList$;
export const ImageUploader = ImageUploader$;
export const Input = Input$;
export const Picker = Picker$;
export const RadioGroup = RadioGroup$;
export const Rate = Rate$;
export const Selector = Selector$;
export const Slider = Slider$;
export const Stepper = Stepper$;
export const Switch = Switch$;
export const TextArea = TextArea$;

export const fields = { Checkbox, CheckboxGroup, CheckList, ImageUploader, Input, Picker, RadioGroup, Rate, Selector, Slider, Stepper, Switch, TextArea };