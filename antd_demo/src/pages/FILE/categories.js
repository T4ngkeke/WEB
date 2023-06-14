import React, { useState,useEffect } from "react"
import { Card, Button, Form, Input, Table, Space, Modal, message } from 'antd'
import { PlusOutlined, SearchOutlined } from "@ant-design/icons"
import MyUploader from "../../components/MyUploader"
import axios from "axios"

const Categories = () => {
  const [isShow, setIsShow] = useState(false)  //controle Uploading Modal present/hide
  const [myForm] = Form.useForm() //get form element
  const [filesData,setFilesData]=useState([])


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
              <Input placeholder="Please enter key word" />
            </Form.Item>
            <Button
              htmlType="submit"
              type='primary'
              icon={<SearchOutlined />}
            />
          </Form>
          
          <Table columns={[
            {
              title: 'Name',
              dataIndex:'file_name'
            }, {
              title: 'Type',
              width: 180,
              dataIndex:'file_extension'
            }, {
              title: 'Date',
              dataIndex:'file_date'
            }, {
              title: 'Size',
              dataIndex:'file_size'
            }
          ]} 
        dataSource={filesData}
          />
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
