import React, {createContext, useState} from 'react';
import classNames from 'classnames';

import { MenuItemProps } from './menuItem';
type MenuMode = 'horizontal' | 'vertical'; // 联合类型
type onSelectCallBack = (selectIndex: number) => void;
export interface MenuProps {
      defaultIndex: number;
      className?: string;
      mode?:MenuMode;
      style?:React.CSSProperties;
      onSelect? : onSelectCallBack;
}
export interface IMenuContext {
      index: number;
      onSelect?: onSelectCallBack;
}
export const MenuContext = createContext<IMenuContext>({index: 0});




const Menu: React.FC<MenuProps> = (props) => {
      const {className, children, mode, defaultIndex, style, onSelect} = props;

      const [currentActive, setActive] = useState(defaultIndex);

      const classes = classNames('viking-menu', className, {
            "menu-vertical": mode === 'vertical',
      });
      const handleClick = (index: number) => {
            setActive(index);
            if(onSelect) {
                  onSelect(index);
            }
      }
      const passContext: IMenuContext = {
            index: currentActive ? currentActive : 0,
            onSelect: handleClick
      }

      const renderChildren = () => {
            return React.Children.map(children, (child, index) => {
                  const childElement = child as React.FunctionComponentElement<MenuItemProps>;
                  const { displayName } = childElement.type;
                  if( displayName === 'MenuItem') {
                        return React.cloneElement(childElement, {
                              index
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
      defaultIndex: 0,
      mode: 'vertical'
}

export default Menu;
 