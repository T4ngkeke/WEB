import {
  MenuFoldOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Button, Dropdown, Layout, Menu, message, theme } from 'antd'
import { useState } from 'react'
import { logo } from "../tools"
import { useNavigate } from 'react-router-dom'

const { Header, Sider, Content } = Layout
const MyLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const items = [
    {
      label: 'Exit',
      key: 'logOut',
    },
  ]
  const onClick = ({ key }) => {
    if (key === 'logOut') {
      navigate('/')
    }
    else {
      message.info('Not developped')
    }
  }
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  return (
    <Layout style={{ width: '100vw', height: '100vh' }}
      id='components-layout-demo-custom-trigger'
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" >
          <img src={logo} alt='uploader' />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['/']}
          onClick={({ key }) => {
            // alert(key)
            navigate(key)

          }}
          items={[
            {
              key: '/admin/personal_info',
              icon: <UserOutlined />,
              label: 'Personal page',
            },
            {
              key: '/admin/upload',
              icon: <UploadOutlined />,
              label: 'Upload',
              children: [
                {
                  label: 'File categories',
                  key: '/admin/upload/file_categories',
                },
                {
                  label: 'File Info',
                  key: '/admin/upload/file_info',
                }
              ]
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuFoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <span className='app-title'>MyCloud</span>
          <Dropdown menu={{ items, onClick }}>
            <img
              src={logo}
              alt='logout logo'
              style={{
                width: '30px',
                borderRadius: '50%',
                float: 'right',
                marginTop: '16px',
                marginRight: '20px',
              }} />
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
export default MyLayout
