import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import {
  getProposals,
  isWalletConnected,
} from './Blockchain.services'
import Header from './components/Header'
import Home from './views/Home'
import Proposal from './views/Proposal'
import { useGlobalState } from './store'
import AppFooter from './views/Footer'
import BeforeLoginPage from './views/BeforeLoginPage'
import AdminPage from './views/AdminPage'
import SignupPage from './views/SignupPage'

const App = () => {
  const [loaded, setLoaded] = useState(false)
  const [connectedAccount] = useGlobalState('connectedAccount');
  const [user] = useGlobalState('user');
  useEffect(async () => {
    console.log("connectedAccount: " + connectedAccount);
    await isWalletConnected()
    // getInfo()
    getProposals()
    setLoaded(true)
    // console.log("isWalletConnected")
    // console.log(await isWalletConnected())
  }, [])
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-[#212936] dark:text-gray-300">
      <Header />
      {loaded && connectedAccount && user ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proposal/:id" element={<Proposal />} />
          {user && user.isAdmin && <Route path="/admin" element={<AdminPage />} />}
        </Routes> 
      ) : 
      loaded && connectedAccount && !user ? (
        <SignupPage />
      ) :
      <BeforeLoginPage />}

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <AppFooter />
    </div>
  )
}

export default App
