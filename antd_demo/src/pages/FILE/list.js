import React from "react"
import { useLocation } from "react-router-dom"
import { Descriptions,Button, Space } from 'antd';
import { DownloadOutlined , EditOutlined, DeleteOutlined} from '@ant-design/icons'
const FileList = () => {
  const location=useLocation()
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
    >
      Download <DownloadOutlined />
    </Button>
    <Space />
    <Button type="primary" 
    style={{ background: "green", borderColor: "white" }}
    >
      Rename <EditOutlined />
    </Button>

    <Button type="primary" 
    style={{ background: "red", borderColor: "white" }}
    >
      Delete <DeleteOutlined />
    </Button>

    </>
  )
}

export default FileList
