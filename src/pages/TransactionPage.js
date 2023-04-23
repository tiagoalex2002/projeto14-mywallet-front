import styled from "styled-components"
import axios from "axios"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import TransactionContext from "../Contexts/TransactionContext"

export default function TransactionsPage() {

  const navigate= useNavigate()

  const params= useParams();
  const info= localStorage.getItem("usuario")
  const informacoes=JSON.parse(info);
  const  auth=informacoes.token;

  let transaction;
  if(params == "entrada"){
    transaction= "entrada"
  }
  else if( params== "saida"){
    transaction= "saida"
  }



  const {valor, setValor, description, setDescription}= useContext(TransactionContext)

  function Add(event){
    event.preventDefault()
    const body= {valor: valor, description: description}
    if(params =="entrada"){
      const requisition=axios.post("/nova-transacao/entrada", body, { headers: {Authorization: `Bearer ${auth}`}})
      requisition.then(navigate("/home"))
    }
    else if(params == "saida" ){
      const requisition=axios.post("/nova-transacao/saida", body, { headers: {Authorization: `Bearer ${auth}`}})
      requisition.then(navigate("/home"))
    }
  }
  return (
    <TransactionsContainer>
      <h1>Nova {params}</h1>
      <form onSubmit={Add}>
        <input placeholder="Valor" type="text" value={valor} onChange={e => setValor(e.target.value)}/>
        <input placeholder="Descrição" type="text" value={description} onChange={e => setDescription(e.target.value)}/>
        <button type="submit">Salvar {params}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
