import React from 'react';
import { fireEvent, render, RenderResult, cleanup , wait} from '@testing-library/react';

import Menu , {MenuProps} from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';


const testProps: MenuProps = {
      defaultIndex: '0',
      onSelect: jest.fn(),
      className: 'test',
      mode: 'horizontal'
}
const testVerporps: MenuProps = {
      defaultIndex: '0',
      onSelect: jest.fn(),
      mode: 'vertical'
}
const generateMenus = (props: MenuProps) => (
      <Menu {...props}>
            <MenuItem>active</MenuItem>
            <MenuItem disabled>disabled</MenuItem>
            <MenuItem>xxxx</MenuItem>
            <SubMenu title="dropdown">
                  <MenuItem>test2</MenuItem>
            </SubMenu>
      </Menu>
);

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElemet:HTMLElement;
const createStylefile  = () => {
      const cssFile: string = `
      .viking-submenu {
            display: none;
      }
      .viking-submenu.menu-opened {
            display: block;
      }
      `
      const style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = cssFile;
      return style;
}

describe('Menu test', () => {
      beforeEach(() => {
            wrapper = render(generateMenus(testProps));
            wrapper.container.append(createStylefile())
            menuElement = wrapper.getByTestId("test-menu");
            activeElement = wrapper.getByText("active");
            disabledElemet = wrapper.getByText("disabled");
      });
      it('should render corrent menu and menuItem based on default props', () => {
            expect(menuElement).toBeInTheDocument();
            expect(menuElement).toHaveClass("viking-menu test");
            // expect(menuElement.getElementsByTagName("li").length).toEqual(5);
            expect(menuElement.querySelectorAll(":scope > li").length).toEqual(4)
            expect(activeElement).toHaveClass("menu-item is-active");
            expect(disabledElemet).toHaveClass("menu-item is-disabled")
      });
      it("clicks items should change active and callback right callback", () => {
            const thirdItem = wrapper.getByText('xxxx');
            fireEvent.click(thirdItem);
            expect(thirdItem).toHaveClass("is-active");
            expect(activeElement).not.toHaveClass("is-active");
            expect(testProps.onSelect).toHaveBeenCalledWith("2");
            fireEvent.click(disabledElemet);
            expect(disabledElemet).not.toHaveClass("is-active");
            expect(testProps.onSelect).not.toHaveBeenCalledWith("1");
      });
      it("should render vertical mode when mode to set vertical", () => {
            cleanup();
            const wrapper = render(generateMenus(testVerporps));
            const menuElement = wrapper.getByTestId("test-menu");
            expect(menuElement).toHaveClass("menu-vertical");
      })
      it("should show dropdown items when hover on Submenu", async () => {
            // expect(wrapper.queryByText("test2")).toBeVisible();
            const dropdownElement = wrapper.getByText("dropdown");
            fireEvent.mouseEnter(dropdownElement);
            await wait(() => {
                  expect(wrapper.queryByText("test2")).toBeVisible()}
            );
            fireEvent.click(wrapper.getByText("test2"));
            expect(testProps.onSelect).toHaveBeenCalledWith("3-0")
            fireEvent.mouseLeave(dropdownElement);
            await wait(() => {
                  expect(wrapper.queryByText("test2")).not.toBeVisible()
            });
            // expect()
            // expect(wrapper.queryByText("test1")).not.toBeVisible();
      })
})