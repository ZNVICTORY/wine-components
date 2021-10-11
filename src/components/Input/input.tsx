import React, {createContext, ReactElement, useState, InputHTMLAttributes, FC, ChangeEvent} from 'react';
import classNames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Icon from '../Icon/icon';
/**
 * Input
 * ```
 * <Input 
 *    disabled
 *    size="lg|zm"
 *    icon="fontawsome 支持的图标"
 *    prepand="input 前缀"
 *    apppand="input 后缀"
 *    {...restProps}
 * />
 * ```
 */

type InputSize = 'lg' | 'sm';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    /** 是否禁用 Input */
    disabled?: boolean;
    /** 设置Input 大小，支持lg 或 sm */
    size?: InputSize;
    /** 添加图标 */
    icon?: IconProp;
    /** 添加前缀 */
    prepand?: string | ReactElement;
    /** 添加后缀 */
    apppand?: string | ReactElement;
    /** 回调函数 */
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
/**
 * Input 输入框
 * ```
 * import { Input } from 'components'
 * ```
 * 支持 HTMLInput 的 所有属性
 */
export const Input: FC<InputProps> = (props) => { 
    const {
        disabled,
        size,
        icon,
        prepand,
        apppand,
        style,
        ...restProps
    } = props;
    const fixControlledValue = (value: any) => {
        if(value === 'null' || typeof value === 'undefined') return ''
        return value;
    }
    if('value' in props) {
        delete restProps.defaultValue
        restProps.value = fixControlledValue(props.value);
    }
   
    const cnames = classNames('viking-input-wrapper',{
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepand || apppand,
        'input-group-prepand': !!prepand,
        'input-group-appand': !!apppand
    })
    return (
        <div className={cnames} style={style}> 
            {prepand && <div className="viking-input-group-prepand">{prepand}</div>}
            {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`} /></div>}
            <input className="viking-input-inner" disabled={disabled} {...restProps} />
            {apppand && <div className="viking-input-group-appand">{apppand}</div>}
        </div>
    )
} 

export default Input;