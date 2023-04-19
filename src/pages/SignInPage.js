import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import LoginContext from "../Contexts/LoginContext"
import { useContext } from "react"

export default function SignInPage() {
  const {email}= useContext(LoginContext)
  const {setEmail}= useContext(LoginContext)
  const {password}= useContext(LoginContext)
  const {setPassword}= useContext(LoginContext)
  return (
    <SingInContainer>
      <form>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value) }/>
        <input placeholder="Senha" type="password" autocomplete="new-password" value={password} onChange={e => setPassword(e.target.value)} />
        <button>Entrar</button>
      </form>

      <Link t="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
