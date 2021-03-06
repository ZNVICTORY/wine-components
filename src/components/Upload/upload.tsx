import React, { ChangeEvent, FC, useRef, useState } from "react";
import axios from 'axios';
import Button from "../Button/button";
import UploadList from "./uploadList";
import Dragger from "../Dragger/dragger";

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';

export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status? : UploadFileStatus;
    percent?: number;
    raw? : File;
    response?: any;
    error?:  any;
}

export interface IUploadProps {
    action: string;
    defaultFileList?: UploadFile[],
    beforeUpload?: (file: File) => boolean | Promise<File>
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?:(data: any, file: File) => void;
    onError?:(error: any, file: File) => void;
    onChange?:(file: File) => void;
    onRemove?: (file: UploadFile) => void;
    headers?: {[key: string]: any};
    name?: string;
    data?: {[key: string]: any};
    withCredentials?: boolean;
    accept?:string;
    multiple?:boolean,
    drag?: boolean
}

export const Upload:FC<IUploadProps> = (props) => {

    const { 
        action,
        defaultFileList,
        beforeUpload,
        onProgress,
        onSuccess,
        onError,
        onChange,
        onRemove,
        headers,
        name,
        data,
        withCredentials,
        accept,
        multiple,
        children,
        drag
     } = props;

     const fileInput = useRef<HTMLInputElement>(null);
     const [ fileList, setFileList ] = useState<UploadFile[]>(defaultFileList || []);
     const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
         setFileList((prevList) => {
             console.log(prevList, updateFile, 'kokok')
            return prevList.map(file => {
                if(file.uid === updateFile.uid) {
                    return {
                        ...file,
                        ...updateObj
                    }
                } else {
                    return file;
                }
            })
         })
     }
     const handleClick = () => {
         if(fileInput.current) {
             fileInput.current.click();
         }
     }
     const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if(!files) return;
            UploadFiles(files)
            if(fileInput.current) {
                fileInput.current.value = ''
            }
     }
     const handleRemove = (file: UploadFile) => {
            setFileList(prevList => {
                return prevList.filter(item => item.uid !== file.uid)
            })
            if(onRemove) {
                onRemove(file)
            }
     }
     const UploadFiles = (files: FileList) => {
         let postFiles = Array.from(files);
         postFiles.forEach(file => {
             if(!beforeUpload) {
                postFile(file)
             } else {
                 const result = beforeUpload(file);
                 if(result && result instanceof Promise) {
                     result.then(processFile => {
                         postFile(processFile)
                     })
                 } else if(result !== false) {
                     postFile(file); 
                 }
             }
         })
     }
    
     const postFile = (file: File) => {
         let _file: UploadFile = {
             uid: Date.now() + 'upload-file',
             name: file.name,
             size: file.size,
             status: 'ready',
             percent: 0,
             raw: file,
         }
        // setFileList([_file, ...fileList])
        setFileList(prev => {
            return [_file, ...prev]
        })
        const formData = new FormData();
        formData.append(name || "file", file);
        if(data) {
            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            })
        }
        axios.post(action, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data'
            },
            withCredentials,
            onUploadProgress: (e) => {
                let percentage = Math.round((e.loaded * 100) / e.total ) || 0;
                if(percentage) {
                    updateFileList(_file, { percent: percentage, status: 'uploading' });
                    console.log(fileList)
                    if(onProgress) {
                        onProgress(percentage, file);
                    }
                }
            }
        }).then(resp => {
            if(onSuccess) {
                updateFileList(_file, { percent: 100, status: 'success', response: resp });
                console.log(fileList)
                onSuccess(resp, file)
            }
            if(onChange) {
                onChange(file)
            }
        }).catch(err => {
            if(onError) {
                updateFileList(_file, { percent: 100, status: 'error', error: err });
                console.log(fileList)
                onError(err, file)
            }
            if(onChange) {
                onChange(file)
            }
        })
     }

    return (
        <div className="viking-upload-component" onClick={handleClick}>
            {/* <Button 
                btnType="primary"
                onClick={handleClick}
            >upload file</Button> */}
            {drag ? 
            <Dragger onFile={(files) => {UploadFiles(files)}}>
              {children}
            </Dragger>:
            children
          }
            <input 
                ref={fileInput}
                onChange={handleFileChange}
                className="viking-file-input" 
                type="file" 
                style={{display: 'none'}}
                accept={accept}
                multiple={multiple}
            />
            <UploadList fileList={fileList} onRemove={handleRemove} />
        </div>
    )
}
Upload.defaultProps = {
    name: 'file'
}

export default Upload;