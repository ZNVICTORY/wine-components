import React, { FC, AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import classNames from "classnames";

// button size 枚举
// export enum ButtonSize {
//     Large = 'lg',
//     Small = 'sm'
// }
// type Large = 'lg';
// type Small = 'sm';
// button type 枚举
// export enum ButtonType {
//     Primary = 'primary',
//     Default = 'default',
//     Danger = 'danger',
//     Link = 'link'
// }

export type ButtonType = 'primary' | 'default' | 'danger' | 'link';
export type ButtonSize = 'lg' |'sm';
// 声明一个 接口
interface BaseButtonProps {
    /**
     * Button 类名
     */
    className?: string;
    /** Button的禁用 */
    disabled?: boolean;
    /**Button  的尺寸 */
    size?: ButtonSize;
    /** Button  的 类型 */
    btnType?: ButtonType;
    /** Button链接的 */
    href?: string;
    children?: ReactNode;
    
}
// 组合类型
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

/**
 * 常用元素组件Button 按钮
 * ## 引用方法
 * ```js
 * import { Button } from ‘components’;
 * <Button>test</Button>
 * ```
 */
export const Button: FC<ButtonProps> = (props) => {
    const {
        btnType,
        size,
        className,
        disabled,
        children,
        href,
        ...restProps
    } = props;
    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === 'link') && disabled
    });

    if( btnType === 'link' && href ) {
        return (
            <a

                className={classes}
                href={href}
                {...restProps}
            >
                {children}
            </a>
        )
    } else {
        return (
            <button 
                className={classes} 
                disabled={disabled}
                {...restProps}
            >
                {children}
            </button>
        )
    }
}

Button.defaultProps = {
    disabled: false,
    btnType: 'default'
}

export default Button;