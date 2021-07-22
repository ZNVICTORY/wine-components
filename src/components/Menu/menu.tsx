import React from 'react';
import classNames from 'classnames';

type MenuMode = 'horizontal' | 'vertical'; // 联合类型

export interface MenuProps {
      defaultIndex?: number;
      className?: string;
      mode?:MenuMode;
      style?:React.CSSProperties;
      onSelect? : (selectIndex: number) => void;
}

const Menu: React.FC<MenuProps> = (props) => {
      const {className, children, mode, defaultIndex, style} = props;
      const classes = classNames('viking-menu', className, {
            "menu-vertical": mode === 'vertical'
      });
      return <ul className={classes} style={style}>
            {children}
      </ul>;
};

Menu.defaultProps = {
      defaultIndex: 0,
      mode: 'vertical'
}

export default Menu;
 