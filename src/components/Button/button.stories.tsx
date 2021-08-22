import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";
import { action } from '@storybook/addon-actions';
// import { withInfo } from '@storybook/addon-info';
import Button from "./button";

const defaultButton = () => (
    <Button onClick={action('clicked')}>default button</Button>
);
const buttonWithSize = () => (
    <Fragment>
        <Button size="lg">large Button</Button>
        <Button size="sm">sm Button</Button>
    </Fragment>
);
const buttonWithType = () => (
    <Fragment>
    <Button btnType="danger">danger Button</Button>
    <Button btnType="primary">primary Button</Button>
    <Button btnType="link" href="https://google.com">link button</Button>
    </Fragment>
);
storiesOf('Button Component', module)
    .add('Button', defaultButton)
    .add("不同尺寸的button", buttonWithSize)
    .add('不同类型的button', buttonWithType);