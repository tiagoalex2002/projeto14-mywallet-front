import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import LoginContext from "../Contexts/LoginContext"
import { useContext } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function SignInPage() {
  const navigate = useNavigate()

  const { email } = useContext(LoginContext)
  const { setEmail } = useContext(LoginContext)
  const { password } = useContext(LoginContext)
  const { setPassword } = useContext(LoginContext)

  function Login(event) {
    event.preventDefault()
    const body = { email: email, password: password }
    const requisition = axios.post(`${process.env.REACT_APP_API_URL}/`, body)
    requisition.then((response) => {
      console.log(response)
      const user = JSON.stringify(response.data);
      localStorage.setItem("usuario", user);
      navigate("/home")
    })
    requisition.catch((err) => alert(err.message))
  }
  return (
    <SingInContainer>
      <form onSubmit={Login}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">
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
