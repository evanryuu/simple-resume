import BlocksContainer from './components/EditBlock/EditorContainer'
import EditDrawer from './editContentDrawer'
import EditStyleDrawer from './editStyleDrawer'
import Preview from './pages/home/preview'
import { useAppStore } from './store'

import './App.css'

function App() {
  const {
    showEdit, setShowEdit, showEditStyle, setShowEditStyle,
  } = useAppStore()

  return (
    <>
      <EditDrawer
        open={showEdit}
        onClose={() => setShowEdit(false)}
      >
        <BlocksContainer />
      </EditDrawer>
      <EditStyleDrawer
        open={showEditStyle}
        onClose={() => setShowEditStyle(false)}
      />
      <Preview />
    </>
  )
}

export default App
