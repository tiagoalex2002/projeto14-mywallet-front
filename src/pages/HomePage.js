import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { Link } from "react-router-dom"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useEffect } from "react"
import axios from "axios"
import { useContext } from "react"
import HomeContext from "../Contexts/HomeContext"
import { useNavigate } from "react-router-dom"

export default function HomePage() {

  const navigate = useNavigate()


  const { nome, setNome, operations, setOperations, exits, setExits, entries, setEntries } = useContext(HomeContext)

  const info = localStorage.getItem("usuario")
  const informacoes = JSON.parse(info);
  const auth = informacoes.token;

  function Logout() {
    const requisition = axios.delete("http://localhost:5000/", { headers: { Authorization: `Bearer ${auth}` } })
    requisition.then(navigate("/"))
  }

  useEffect(() => {
    const requisition = axios.get("http://localhost:5000/home", { headers: { Authorization: `Bearer ${auth}` } });
    requisition.then((response) => {
      setNome(response.data.user.name);
      setOperations(response.data.operations);
      setExits(response.data.exits);
      setEntries(response.data.entries)
    })
  }, [])

  let entriesValues;
  let exitsValues;
  let overall;

  for (let i = 0; i < entries.length; i++) {
    entriesValues = entriesValues + entries[i].valor;
  }
  for (let i = 0; i < exits.length; i++) {
    exitsValues = exitsValues + exits[i].valor;
  }

  overall = entriesValues - exitsValues;

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {nome}</h1>
        <BiExit oncClick={Logout} />
      </Header>

      <TransactionsContainer>
        <ul>{operations?.map((i) => <ListItemContainer><div>
          <span>{i.date}</span>
          <strong>{i.descriptions}</strong></div>
          <Value color={i.identificacao === 1 ? "positivo" : "negativo"}>{i.valor}</Value></ListItemContainer>)}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={overall >= 0 ? "positivo" : "negativo"}>{overall}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <Link to="/nova-transacao/entrada"><button>
          <AiOutlinePlusCircle />
          <p>Nova <br />entrada</p>
        </button></Link>
        <Link to="/nova-transacao/saida"><button>
          <AiOutlineMinusCircle />
          <p>Nova <br />entrada</p>
        </button></Link>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`