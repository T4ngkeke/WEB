import { InboxOutlined } from '@ant-design/icons'
import { message, Upload } from 'antd'
const { Dragger } = Upload
const props = {
  customRequest: (componentsData) => {
    let formData = new FormData();
    formData.append("file", componentsData.file);

    fetch("/api/upload", {
        method: "POST",
        body: formData,
        headers: {  
        }
    }).then(function(response) {
        if (response.status == 200) {
            window.location.reload();
        } else {
            alert("An error occurred while uploading the file.");
        }
    });    
  }
}
const MyUploader = () => (
  <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibited from uploading company data or other
      banned files.
    </p>
  </Dragger>
)
export default MyUploader
