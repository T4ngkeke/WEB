import React from "react"
import { Row, Col, Card, Form, Input, Button, message,Modal } from 'antd'
import { logo } from "../tools"
import { useNavigate } from 'react-router-dom'
import { useState } from "react"

const Login = () => {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [modalText, setModalText] = useState('Content of the modal');
  const [myForm] = Form.useForm() //get form element
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    // setModalText('The modal will be closed after two seconds');
    myForm.submit()  //manually trigger form.submit
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (<Row>
    <Col
      md={{
        span: 8,
        push: 8
      }}
      xs={{
        span: 22,
        push: 1
      }}
    >
      <img src={logo}
        style={{
          display: "block",
          margin: '20px auto',
          borderRadius: '16px',
          width: '200px',
        }} alt='login logo' />
      <Card title='MyCloud'>
        <Form labelCol={{
          md: {
            span: 6,
          }
        }}
          onFinish={(v) => {
            console.log(v)
            message.success('Succes login')
            navigate('/admin/personal_info')
          }}
        >
          <Form.Item
            label='User name'
            name='userName'
            rules={[
              {
                required: true,
                message: 'Please enter username'
              }
            ]}
          >
            <Input placeholder="Please enter username" />
          </Form.Item>
          <Form.Item
            label='Password'
            name='password'
            rules={[
              {
                required: true,
                message: 'Please enter password'
              }
            ]}>
            <Input.Password placeholder="Please enter password" />
          </Form.Item>
          <Button htmlType="submit" type='primary' style={{
            display: 'block',
            margin: '8px auto',
            width: '10vw',
          }}> Submit</Button>
          <Button type="link" htmlType="button" style={{
            margin:'2px auto',
            width:'1vw'
          }}
          onClick={showModal}>
          Create new account
        </Button>
        
        
        
        
        
        
        
        <Modal
        title="Inscription"
        maskClosable={false}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        destroyOnClose   //clear all when close Modal
      >
        <p>
        <Form
          preserve={false}  //necessary for clear data when close Modal
          
          onFinish={(v) => { 
            message.success('Success submit')
            console.log(v)
          }}
          labelCol={{ span: 7 }}
          form={myForm} //define form to get form content
          style={{
            maxWidth: 600,
          }}
          scrollToFirstError
        >
          <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item
          name="nickname"
          label="Nickname"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: 'Please input your nickname!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          name="residence"
          label="Habitual Residence"
          rules={[
            {
              required: true,
              message: 'Please enter your habitual residence!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        </Form>
        </p>
      </Modal>
      </Form>
      </Card>
        
    </Col>
  </Row>
  )
}

export default Login
