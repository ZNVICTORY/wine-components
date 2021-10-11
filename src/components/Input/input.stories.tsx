import React, {useState} from "react";
import Input from './input';
import { storiesOf } from "@storybook/react";
import { action } from '@storybook/addon-actions';

const defaultInput = () => (
    <Input style={{width: '300px'}} placeholder={"placeholder"} onChange={action("change")} />
)
const InputGroupSize = () => {
    return (
        <>
        <Input size="lg"  style={{width: '300px'}} placeholder={"lg"} />
        <Input size="sm"  style={{width: '300px'}} placeholder={"sm"} />
        </>
    )
}
const ControllInput = () => {
    const [ value, setVal] = useState('')
    return (
        <>
            <Input style={{width: '200px'}} placeholder={"受控属性"} value={value} onChange={(e) => {
                action(e.target.value);
                setVal(e.target.value);
            }} />
        </>
    )
}



storiesOf('Input Component', module)
    .add('Input', defaultInput)
    .add("不同尺寸的Input", InputGroupSize)
    .add("受控Input", ControllInput)