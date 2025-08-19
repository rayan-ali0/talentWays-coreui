import './tailwind.css'
import { Route,Routes } from 'react-router-dom'
import { ManageDispute } from './Pages/ManageDispute'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<ManageDispute />} />
      </Routes>
    </>
  )
}

export default App
