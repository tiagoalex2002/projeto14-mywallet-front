import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext } from "react"
import SignUpContext from "../Contexts/SignUpContext"
import axios from "axios"


export default function SignUpPage() {
  const navigate = useNavigate
  const { email } = useContext(SignUpContext)
  const { setEmail } = useContext(SignUpContext)
  const { name } = useContext(SignUpContext)
  const { setName } = useContext(SignUpContext)
  const { repeat } = useContext(SignUpContext)
  const { setRepeat } = useContext(SignUpContext)
  const { password } = useContext(SignUpContext)
  const { setPassword } = useContext(SignUpContext)

  function Signing(event) {
    event.preventDefault();
    if (password === repeat) {
      const body = { name: name, email: email, password: password }
      const requisition = axios.post("http://localhost:5000/cadastro", body);
      requisition.then(navigate("/"))
      requisition.catch((error) => { console.log(error.message) })
    }
    else {
      alert("Senhas não coincidem, por favor, insira a mesma senha no campo de confirmar a senha")
    }

  }

  return (

    <SingUpContainer>
      <form onSubmit={Signing}>
        <MyWalletLogo />
        <input placeholder="Nome" type="text" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <input placeholder="Confirme a senha" type="password" value={repeat} onChange={e => setRepeat(e.target.value)} />
        <button type="submit">Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
