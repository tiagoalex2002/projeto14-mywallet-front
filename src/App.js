import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import { useState } from "react"
import SignUpContext from "./Contexts/SignUpContext"
import LoginContext from "./Contexts/LoginContext"

export default function App() {

  const [name, setName]= useState("")
  const [email, setEmail]= useState("")
  const [password, setPassword]= useState("")
  const [repeat, setRepeat]= useState("")
  const SignUpValue={name:name,setName:setName, email:email, setEmail:setEmail, password:password, setPassword: setPassword, repeat: repeat, setRepeat: setRepeat}

  const [senha, setSenha]=useState("")
  const [mail, setMail]=useState("")
  const LoginValue={email: mail, setEmail: setMail, password: senha , setPassword: setSenha}

  return (
    <PagesContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginContext.Provider value={LoginValue}><SignInPage /></LoginContext.Provider>} />
          <Route path="/cadastro" element={<SignUpContext.Provider value={SignUpValue}><SignUpPage /></SignUpContext.Provider>} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/nova-transacao/:tipo" element={<TransactionsPage />} />
        </Routes>
      </BrowserRouter>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
