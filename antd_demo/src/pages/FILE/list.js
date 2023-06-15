import React from "react"
import { useLocation } from "react-router-dom"
import { Descriptions,Button, Space, Popconfirm ,message} from 'antd';
import { DownloadOutlined , EditOutlined, DeleteOutlined} from '@ant-design/icons'
const FileList = () => {
  const location=useLocation()
  const confirm = (e) => {
    console.log(e);
    delete_file(location.state.dataIndex.file_delete_path)
    

  };
  const cancel = (e) => {
    console.log(e);
  };

  function delete_file(path) {
        fetch(path, {
            method: 'GET'
        }).then(function(response) {
            if (response.status == 200) {
                window.location.href = 'http://localhost:3000/admin/upload/file_categories';
            } 
        });
}
  function rename_file(path) {
    let new_name = prompt("Please enter the new name for this file.");
    if (new_name) {
        fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                new_name: new_name
            })
        }).then(function(response) {
            if (response.status == 200) {
                window.location.href ='http://localhost:3000/admin/upload/file_categories';
            } else {
                alert("An error occurred while renaming the file.");
            }
        });
    }
    
}


  return (
    <>
    {/* <button onClick={()=>{
      console.log(location)
    }
    }>recieve
    </button> */}
    <Descriptions title="Document Info"layout='vertical'>
    <Descriptions.Item label="Name">{location.state.dataIndex.file_name}</Descriptions.Item>
    <Descriptions.Item label="Type">{location.state.dataIndex.file_extension}</Descriptions.Item>
    <Descriptions.Item label="Size">{location.state.dataIndex.file_size}</Descriptions.Item>
    <Descriptions.Item label="Upload Date">{location.state.dataIndex.file_date}</Descriptions.Item>
  </Descriptions>
    <p></p>
    <p></p>
    <p></p>

    <Button type="primary"
    style={{ background: "blue", borderColor: "white" }}
    onClick={()=>{
      window.location.href = 'http://localhost:5000'+location.state.dataIndex.file_download_path
    }
    }
    >
      Download <DownloadOutlined />
    </Button>
    <Space />

    <Button type="primary" 
    style={{ background: "green", borderColor: "white" }}
    onClick={()=>{
      rename_file(location.state.dataIndex.file_rename_path)
    }
    }
    >
      Rename <EditOutlined />
    </Button>

    <Popconfirm
    title="Delete the task"
    description="Are you sure to delete this task?"
    onConfirm={confirm}
    onCancel={cancel}
    okText="Yes"
    cancelText="No"
  >
    <Button type="primary" 
    style={{ background: "red", borderColor: "white" }}
    >
      Delete <DeleteOutlined />
    </Button>
    </Popconfirm>
    </>
  )
}

export default FileList
