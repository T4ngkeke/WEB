import MyLayout from "./components/MyLayout"
import { Routes, Route } from 'react-router-dom'
import User from "./pages/user"
import Categories from "./pages/FILE/categories"
import FileList from "./pages/FILE/list"

const App = () => {
  return (
    <MyLayout>
      <Routes>
        <Route path='personal_info' element={<User />} />
        <Route path='upload/file_info' element={<FileList />} />
        <Route path='upload/file_categories' element={<Categories />} />

      </Routes>
    </MyLayout>
  )
}

export default App