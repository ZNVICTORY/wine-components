import React, { FC } from "react";
import { ThemeProps } from "../Icon/icon";

export interface IProgressProps {
    percent: number | undefined;
    strokeHeight?: number;
    showText?: string;
    styles?:React.CSSProperties;
    theme?: ThemeProps
}

export const Progress: FC<IProgressProps> = (props) => {
    const {
        percent,
        strokeHeight,
        showText,
        styles,
        theme
    } 
    = props;
    return (
        <div className="viking-progress-bar">
            <div className="viking-progress-bar-outer" style={{height: `${strokeHeight}px`}}>
                <div 
                    className={`viking-progress-bar-inner color-${theme}`}
                    style={{width: `${percent}%`}}
                >
                    {showText && <span className={"inner-text"} >{`${percent}%`}</span>}
                </div>
            </div> 
        </div>
    )
}

export default Progress;