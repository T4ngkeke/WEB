import React, { useState,useEffect } from "react"
import { Card, Button, Form, Input, Table, Space, Modal, message } from 'antd'
import { PlusOutlined, SearchOutlined } from "@ant-design/icons"
import MyUploader from "../../components/MyUploader"
import axios from "axios"
import Column from "antd/es/table/Column"
import { useNavigate } from 'react-router-dom'

const Categories = () => {
  const [isShow, setIsShow] = useState(false)  //controle Uploading Modal present/hide
  const [myForm] = Form.useForm() //get form element
  const [filesData,setFilesData]=useState([])
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const navigate=useNavigate()
  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
        const filteredData = filesData.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
    }
    else{
        setFilteredResults(filesData)
    }
}

  function getData(){
    axios({
      method:"GET",
      url:"/files",
    })
    .then((response)=>setFilesData(response.data)).catch((error)=>{
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    })}
  
  
  
    
  return (
    <>
      <Card title='File List'
        extra={<Button type="primary" icon={<PlusOutlined onClick={() => {
          setIsShow(true)
        }} />}></Button>}
      >

        { useEffect(() => {getData();}, [])}
        


        <Space direction="vertical" style={{ width: '100%' }}>
          <Form layout="inline"
            onFinish={(v) => {
              message.success('Search succeed')
            }}
          >
            <Form.Item label='FileName' name='name'>
              <Input placeholder="Please enter key word"
              onChange={(e)=>searchItems(e.target.value)}
              
              />
            </Form.Item>
          </Form>

          {searchInput.length>1?(
            <Table 
            dataSource={filteredResults}>
              <Column 
               title="Name" dataIndex="file_name" key="file_name" 
              />
              <Column 
               title="Type" dataIndex="file_extension" key="file_extension" 
              />
              <Column 
               title="Date" dataIndex="file_date" key="file_date" 
              />
              <Column 
                title="Size" dataIndex="file_size" key="file_size" 
              />
              <Column
                title="Action"
                key="action"
                render={(_,dataIndex) => (
                    <a onClick={(v) => {
                      // console.log(text)
                      console.log(dataIndex)
                      message.success('View file')
                      navigate('/admin/upload/file_info',{state:{dataIndex}})
                      
                   }}>
                      View
                    </a>
              )}
            />
          </Table>
          ):( <Table 
            dataSource={filesData}>
              <Column 
               title="Name" dataIndex="file_name" key="file_name" 
              />
              <Column 
               title="Type" dataIndex="file_extension" key="file_extension" 
              />
              <Column 
               title="Date" dataIndex="file_date" key="file_date" 
              />
              <Column 
                title="Size" dataIndex="file_size" key="file_size" 
              />
              <Column
                title="Action"
                key="action"
                render={(_,dataIndex) => (
                    <a onClick={(v) => {
                      // console.log(text)
                      console.log(dataIndex)
                      message.success('View file')
                      navigate('/admin/upload/file_info',{state:{dataIndex}})
                      
                   }}>
                      View
                    </a>
              )}
            />
          </Table>)}

        </Space>
      </Card>
      <Modal
        title='Uploading'
        open={isShow}
        maskClosable={false} //click other layer => not close Modal
        onCancel={() => setIsShow(false)}
        onOk={() => {
          myForm.submit()  //manually trigger form.submit
        }}
        destroyOnClose   //clear all when close Modal
      >

        <Form
          preserve={false}  //necessary for clear data when close Modal
          onFinish={(v) => {  //提交表单且数据验证成功后回调事件
            message.success('success uploading')
            console.log(v)
          }}
          labelCol={{ span: 3 }}
          form={myForm} //define form to get form content
        >
          <Form.Item label='File'>
            <MyUploader />
          </Form.Item>
        </Form>

      </Modal>
    </>

  )
}

export default Categories
