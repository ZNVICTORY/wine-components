import React, { FC } from "react";
import { UploadFile } from "./upload";
import Icon from '../Icon/icon';
import Progress from "../Progress/Progress";

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
                        <span>
                            { item.status === 'uploading' && <Icon icon="spinner" spin theme="primary" />}
                            { item.status === 'success' && <Icon icon="check-circle" theme="success" />}
                            { item.status === 'error' && <Icon icon="times-circle" theme="danger" />}
                        </span>
                        <span className="file-actions">
                            <Icon icon="times" onClick={() => onRemove(item)} />
                        </span>
                        { item.status === 'uploading' && 
                            <Progress percent={item.percent || 0} />}
                    </li>
                })
            }
    </ul>
}

export default UploadList;