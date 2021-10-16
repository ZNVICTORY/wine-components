import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Upload } from './upload';
import { UploadFile } from "./upload";

const checkFileSize = (file: File) => {
    if((Math.round(file.size) / 1024) > 50) {
        alert("file is too lage");
        return false
    }
    return true;
}
const filePromise = (file: File ) => {
    const file_doc = new File([file], 'new_name_test.docx', { type: file.type })
    return Promise.resolve(file_doc)
}

const SimpleUpload = () => {
    const defaultFileList: UploadFile[] = [
  { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
]
    return (<Upload
        action={"https://jsonplaceholder.typicode.com/posts"}
        defaultFileList={defaultFileList}
        onProgress={(percent, file) => {
            action("Progress")
        }}
        onSuccess={(resp, file) => {
            action('success')
        }}
        onError={(error, file) => {
            action('error')
        }}
        onChange={action('change')}
        // beforeUpload={checkFileSize}
        beforeUpload={filePromise}
        />)
}

storiesOf('Upload Component', module).add('Upload', SimpleUpload)