import React from "react";

import { render, fireEvent } from "@testing-library/react";
import Button, {ButtonProps, ButtonSize, ButtonType} from './button';

// firwEvent 触发事件
// test("test button first", () => {
//       const wrapper = render(<Button>test</Button>);
//       const element = wrapper.queryAllByText("test");
//       expect(element).toBeTruthy(); 
//       // expect(element).toBeInTheDocument();
//       // expect(element).toBeEmptyDOMElement();
// })

const defaultProps = {
      onClick: jest.fn()
}
const testProps = {
      btnType: 'primary',
      size: 'lg',
      className: 'customied'
}
const disableProps = {
      disabled: true,
      onClick: jest.fn()
}
describe("test Button component", () => {
      it("should render the default button", () => {
            const wrapper = render(<Button {...defaultProps}>test</Button>);
            const element = wrapper.getByText("test") as HTMLButtonElement;
            expect(element.disabled).toBeFalsy();
            expect(element).toBeInTheDocument();
            expect(element.tagName).toEqual("BUTTON");
            expect(element).toHaveClass("btn btn-default");  // 验证按钮 是否含有 对应到类名
            fireEvent.click(element);  // 调用按钮的点击事件
            expect(defaultProps.onClick).toHaveBeenCalled(); // 验证按钮的点击事件 是否被调用 到
      });
      it("should render the compoent based on different Props", () => {
            const wrapper = render(<Button size="lg" btnType="primary" className="ttttttt">test</Button>);
            const element = wrapper.getByText("test");
            expect(element).toBeInTheDocument();
            expect(element).toHaveClass("btn-primary btn-lg customied")
      });
      it("should render a lint when btnType equals link and href is provided", () => {
            const wrapper = render(<Button btnType={'link'} href="http://test">link</Button>);
            const element = wrapper.getByText("link");
            expect(element).toBeInTheDocument();
            expect(element.tagName).toEqual("A");
            expect(element).toHaveClass("btn btn-link");
      });
      it("shoud render disabled button when disabled is true", ()=> {
            const wrapper = render(<Button {...disableProps}>test</Button>);
            const element = wrapper.getByText("test") as HTMLButtonElement;
            expect(element).toBeInTheDocument(); 
            expect(element.disabled).toBeTruthy();
            fireEvent.click(element);
            expect(disableProps.onClick).not.toHaveBeenCalled()
      });
})