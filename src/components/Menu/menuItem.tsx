import React, {useContext} from "react";
import classNames from "classnames";
import {MenuContext} from './menu';
export interface MenuItemProps {
    index?: number | string;
    disabled?:boolean;
    className?:string;
    style?:React.CSSProperties;
}

const MenuItem:React.FC<MenuItemProps> = (props) => {
     const {index, disabled, className, style, children} = props;
     const context = useContext(MenuContext);
     console.log(context.mode, 'item')
      const classes = classNames('menu-item', className, {
            'is-disabled': disabled,
            'is-active': index === context.index
      });
      const handleClick = () => {
            if(context.onSelect && !disabled && typeof index === 'string') {
                  context.onSelect(index);
            }
      }
      return (
            <li className={classes} style={style} onClick={handleClick}>
                  {children}
            </li>
      );
}

MenuItem.defaultProps = {
      index: 0,
      disabled: false
}
MenuItem.displayName = 'MenuItem';

export default MenuItem;