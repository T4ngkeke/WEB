import React from "react"
import { Row, Col, Card, Form, Input, Button, message } from 'antd'
import { logo } from "../tools"
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const navigate = useNavigate()

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
            span: 4,
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
        </Form>
      </Card>

    </Col>
  </Row>
  )
}

export default Login
