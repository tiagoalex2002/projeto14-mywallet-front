import { BrowserRouter, Routes, Route, useActionData } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import { useState } from "react"
import SignUpContext from "./Contexts/SignUpContext"
import LoginContext from "./Contexts/LoginContext"
import TransactionContext from "./Contexts/TransactionContext"
import HomeContext from "./Contexts/HomeContext"

export default function App() {


  const [name, setName]= useState("")
  const [email, setEmail]= useState("")
  const [password, setPassword]= useState("")
  const [repeat, setRepeat]= useState("")
  const SignUpValue={name:name,setName:setName, email:email, setEmail:setEmail, password:password, setPassword: setPassword, repeat: repeat, setRepeat: setRepeat}

  const [senha, setSenha]=useState("")
  const [mail, setMail]=useState("")
  const LoginValue={email: mail, setEmail: setMail, password: senha , setPassword: setSenha}

  const [valor, setValor]= useState("")
  const [description, setDescription]= useState("")
  const TransactionValue={valor: valor, setValor: setValor, description: description, setDescription: setDescription}

  const [nome, setNome]= useState("")
  const [operations, setOperations]= useState([])
  const [entries, setEntries]= useState([])
  const [exits, setExits]= useState([])
  const HomeValue={nome: nome, setNome: setNome, operations: operations, setOperations: setOperations, entries: entries, setEntries: setEntries, exits: exits, setExits: setExits}

  return (
    <PagesContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginContext.Provider value={LoginValue}><SignInPage /></LoginContext.Provider>} />
          <Route path="/cadastro" element={<SignUpContext.Provider value={SignUpValue}><SignUpPage /></SignUpContext.Provider>} />
          <Route path="/home" element={<HomeContext.Provider value={HomeValue}><HomePage /></HomeContext.Provider>} />
          <Route path="/nova-transacao/:tipo" element={<TransactionContext.Provider value={TransactionValue}><TransactionsPage /></TransactionContext.Provider>} />
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
