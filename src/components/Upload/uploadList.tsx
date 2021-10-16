import React, { FC } from "react";
import { UploadFile } from "./upload";
import Icon from '../Icon/icon';

interface UploadListProps {
    fileList: UploadFile[],
    onRemove: (file: UploadFile) => void;
}

export const UploadList: FC<UploadListProps> = (props) => {
    const {
        fileList,
        onRemove
    } = props;
    console.log(fileList, 'fileList')
    return <ul className="viking-upload-list">
            {
                fileList.map(item => {
                    return <li className="viking-upload-list-item" key={item.uid}>
                        <span className={`file-name file-name-${item.status}`}>
                            <Icon icon="file-alt" theme="secondary" />
                            {item.name}
                        </span>
                    </li>
                })
            }
    </ul>
}

export default UploadList;