import React from 'react';
import { fireEvent, render, RenderResult, cleanup } from '@testing-library/react';

import Menu , {MenuProps} from './menu';
import MenuItem from './menuItem';


const testProps: MenuProps = {
      defaultIndex: 0,
      onSelect: jest.fn(),
      className: 'test'
}
const testVerporps: MenuProps = {
      defaultIndex: 0,
      onSelect: jest.fn(),
      mode: 'vertical'
}
const generateMenus = (props: MenuProps) => (
      <Menu {...props}>
            <MenuItem>active</MenuItem>
            <MenuItem disabled>disabled</MenuItem>
            <MenuItem>xxxx</MenuItem>
            {/* <li>hello</li> */}
      </Menu>
);

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElemet:HTMLElement;

describe('Menu test', () => {
      beforeEach(() => {
            wrapper = render(generateMenus(testProps));
            menuElement = wrapper.getByTestId("test-menu");
            activeElement = wrapper.getByText("active");
            disabledElemet = wrapper.getByText("disabled");
      });
      it('should render corrent menu and menuItem based on default props', () => {
            expect(menuElement).toBeInTheDocument();
            expect(menuElement).toHaveClass("viking-menu test");
            expect(menuElement.getElementsByTagName("li").length).toEqual(3);
            expect(activeElement).toHaveClass("menu-item is-active");
            expect(disabledElemet).toHaveClass("menu-item is-disabled")
      });
      it("clicks items should change active and callback right callback", () => {
            const thirdItem = wrapper.getByText('xxxx');
            fireEvent.click(thirdItem);
            expect(thirdItem).toHaveClass("is-active");
            expect(activeElement).not.toHaveClass("is-active");
            expect(testProps.onSelect).toHaveBeenCalledWith(2);
            fireEvent.click(disabledElemet);
            expect(disabledElemet).not.toHaveClass("is-active");
            expect(testProps.onSelect).not.toHaveBeenCalledWith(1);
      });
      it("should render vertical mode when mode to set vertical", () => {
            cleanup();
            const wrapper = render(generateMenus(testVerporps));
            const menuElement = wrapper.getByTestId("test-menu");
            expect(menuElement).toHaveClass("menu-vertical");
      })
})