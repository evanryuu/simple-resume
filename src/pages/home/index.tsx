import reactLogo from '@/assets/react.svg'
import { useCountStore } from '@/store'

function Home() {
  const countStore = useCountStore()
  return (
    <>
      <div>
        This is home page
      </div>
      <div className="App">
        <div>
          <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button type="button" onClick={() => countStore.increment()}>
            count is
            {' '}
            {countStore.count}
          </button>
          <p>
            Edit
            {' '}
            <code>src/App.tsx</code>
            {' '}
            and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </>
  )
}

export default Home
