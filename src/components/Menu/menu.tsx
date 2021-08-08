import React, {createContext, useState} from 'react';
import classNames from 'classnames';

import { MenuItemProps } from './menuItem';
type MenuMode = 'horizontal' | 'vertical'; // 联合类型
type onSelectCallBack = (selectIndex: string) => void;
export interface MenuProps {
      defaultIndex: string ;
      className?: string;
      mode?:MenuMode;
      style?:React.CSSProperties;
      onSelect? : onSelectCallBack;
      defaultOpenSubMenu?: string[]
}
export interface IMenuContext {
      index: string;
      onSelect?: onSelectCallBack;
      mode?:MenuMode,
      defaultOpenSubMenu?: string[]
}
export const MenuContext = createContext<IMenuContext>({index: '0'});




const Menu: React.FC<MenuProps> = (props) => {
      const {className, children, mode, defaultIndex, style, onSelect, defaultOpenSubMenu} = props;

      const [currentActive, setActive] = useState(defaultIndex);

      const classes = classNames('viking-menu', className, {
            "menu-vertical": mode === 'vertical',
            "menu-horizontal": mode !== 'vertical'
      });
      const handleClick = (index: string) => {
            setActive(index);
            if(onSelect) {
                  onSelect(index);
            }
      }
      const passContext: IMenuContext = {
            index: currentActive ? currentActive : '0',
            onSelect: handleClick,
            mode,
            defaultOpenSubMenu
      }

      const renderChildren = () => {
            return React.Children.map(children, (child, index) => {
                  const childElement = child as React.FunctionComponentElement<MenuItemProps>;
                  const { displayName } = childElement.type;
                  if( displayName === 'MenuItem' || displayName === 'SubMenu') {
                        return React.cloneElement(childElement, {
                              index: `${index}`
                        });
                  } else {
                        console.error("Menu has a child which is not MenuItem Component");
                        return;
                  }
            })
      }
      return <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passContext}>
                  {renderChildren()}
            </MenuContext.Provider>
      </ul>;
};

Menu.defaultProps = {
      defaultIndex: '0',
      mode: 'vertical',
      defaultOpenSubMenu: []
}

export default Menu;
 