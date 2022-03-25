import Form, {
    Input,
    Picker,
    Rate,
    TextArea,
    Selector,
    Checkbox,
    RadioGroup,
    CheckboxGroup,
    CheckList,
    Switch,
    Stepper,
    Slider,
    SubmitButton
} from '@kne/react-form-antd-mobile';
import {List} from 'antd-mobile';

const App = () => {
    return <Form data={{time: ['Tues', 'am']}} onSubmit={(data) => {
        console.log(data);
    }}>
        <List header="基本信息">
            <Input.Item name="name" label="姓名" rule="REQ LEN-10"/>
            <Picker.Item name="time" label="时间" columns={[
                [
                    {label: '周一', value: 'Mon'},
                    {label: '周二', value: 'Tues'},
                    {label: '周三', value: 'Wed'},
                    {label: '周四', value: 'Thur'},
                    {label: '周五', value: 'Fri'},
                ],
                [
                    {label: '上午', value: 'am'},
                    {label: '下午', value: 'pm'},
                ],
            ]}/>
            <Rate.Item name="score" label="评分"/>
            <TextArea.Item name="des" label="描述"/>
            <Selector.Item name="selector" label="选择" options={[
                {
                    label: '选项一',
                    value: '1',
                },
                {
                    label: '选项二',
                    value: '2',
                },
                {
                    label: '选项三',
                    value: '3',
                },
            ]}/>
            <RadioGroup.Item name="radio" label="单选" options={[
                {
                    label: '选项一',
                    value: '1',
                },
                {
                    label: '选项二',
                    value: '2',
                },
                {
                    label: '选项三',
                    value: '3',
                },
            ]}/>
            <CheckboxGroup.Item name="checkbox" label="多选" options={[
                {
                    label: '选项一',
                    value: '1',
                },
                {
                    label: '选项二',
                    value: '2',
                },
                {
                    label: '选项三',
                    value: '3',
                },
            ]}/>
            <Checkbox.Item name="checkbox2" label="选择">水电费速度</Checkbox.Item>
            <CheckList.Item name="checkList" label="列表选择" options={[
                {
                    label: '选项一',
                    value: '1',
                },
                {
                    label: '选项二',
                    value: '2',
                },
                {
                    label: '选项三',
                    value: '3',
                },
            ]}/>
            <Switch.Item name="open" label="开关"/>
            <Stepper.Item name="stepper" label="数字"/>
            <Slider.Item name="slider" label="范围"/>
        </List>
        <SubmitButton>提交</SubmitButton>
    </Form>
};

export default App;

