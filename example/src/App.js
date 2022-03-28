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

const {DatePicker, CascadePicker, DateRangePicker} = Picker;

const treeData = [
    {
        label: '分类A',
        value: 'A',
        children: [
            {
                label: '分类A-1',
                value: 'A1',
                children: [
                    {
                        label: '分类A-1-1',
                        value: 'A11',
                    },
                    {
                        label: '分类A-1-2',
                        value: 'A12',
                    },
                ],
            },
            {
                label: '分类A-2',
                value: 'A2',
                children: [
                    {
                        label: '分类A-2-1',
                        value: 'A21',
                    },
                    {
                        label: '分类A-2-2',
                        value: 'A22',
                    },
                ],
            },
        ],
    },
    {
        label: '分类B',
        value: 'B',
        children: [
            {
                label: '分类B-1',
                value: 'B1',
                children: [
                    {
                        label: '分类B-1-1',
                        value: 'B11',
                    },
                    {
                        label: '分类B-1-2',
                        value: 'B12',
                    },
                ],
            },
            {
                label: '分类B-2',
                value: 'B2',
                children: [
                    {
                        label: '分类B-2-1',
                        value: 'B21',
                    },
                    {
                        label: '分类B-2-2',
                        value: 'B22',
                    },
                ],
            },
        ],
    },
    {
        label: '分类C',
        value: 'C',
        children: [
            {
                label: '分类C-1',
                value: 'C1',
                children: [
                    {
                        label: '分类C-1-1',
                        value: 'C11',
                    },
                    {
                        label: '分类C-1-2',
                        value: 'C12',
                    },
                ],
            },
            {
                label: '分类C-2',
                value: 'C2',
                children: [
                    {
                        label: '分类C-2-1',
                        value: 'C21',
                    },
                    {
                        label: '分类C-2-2',
                        value: 'C22',
                    },
                ],
            },
        ],
    },
    {
        label: '分类D',
        value: 'D',
        children: [
            {
                label: '分类D-1',
                value: 'D1',
                children: [
                    {
                        label: '分类D-1-1',
                        value: 'D11',
                    },
                    {
                        label: '分类D-1-2',
                        value: 'D12',
                    },
                ],
            },
            {
                label: '分类D-2',
                value: 'D2',
                children: [
                    {
                        label: '分类D-2-1',
                        value: 'D21',
                    },
                    {
                        label: '分类D-2-2',
                        value: 'D22',
                    },
                ],
            },
        ],
    },
];

const App = () => {
    return <Form data={{time: ['Tues', 'am'], range: [new Date('2013-07-01'), new Date('2021-10-01')]}}
                 onSubmit={(data) => {
                     console.log(data);
                 }}>
        <List header="基本信息">
            <DateRangePicker.Item name="range" label="日期范围" precision="year"/>
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
            <DatePicker.Item name="date" label="日期"/>
            <CascadePicker.Item name="cascade" label="级联选择" options={treeData}/>
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

