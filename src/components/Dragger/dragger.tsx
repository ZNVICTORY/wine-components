import React, { FC, useState, DragEvent } from "react";
import classNames from "classnames";

export interface IDraggerProps {
    onFile: (files: FileList) => void;
}

export const Dragger:FC<IDraggerProps> = (props) => {
    const { onFile, children } = props;
    const [ dragOver, setDragOver ] = useState(false);

    const kclass = classNames("viking-uploader-dragger", {
        'is-dragover': dragOver
    })
    const handleOnDragOver = (e: DragEvent<HTMLElement>, over: boolean) => {
        e.preventDefault();
        setDragOver(over)
    } 
    const handleDrop = (e: DragEvent<HTMLElement> ) => {
        e.preventDefault()
        setDragOver(false);
        onFile(e.dataTransfer.files)
    }
    return (
        <div 
            className={kclass}
            onDragOver={(e) => handleOnDragOver(e, true)}
            onDragLeave={(e) => handleOnDragOver(e, false)}
            onDrop={handleDrop}
        >
            {children}
        </div>
    )
}

export default Dragger;