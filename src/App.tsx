import BlocksContainer from './components/EditBlock/EditorContainer'
import EditDrawer from './editDrawer'
import Preview from './preview'
import { useAppStore } from './store'

import './App.css'

function App() {
  const { showEdit, setShowEdit } = useAppStore()

  return (
    <>
      <EditDrawer
        open={showEdit}
        onClose={() => setShowEdit(false)}
      >
        <BlocksContainer />
      </EditDrawer>
      <Preview />
    </>
  )
}

export default App
