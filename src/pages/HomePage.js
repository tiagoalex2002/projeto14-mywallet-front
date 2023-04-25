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
  const auth = JSON.parse(info);


  function Logout() {
    const requisition = axios.delete(`${process.env.REACT_APP_API_URL}/`, { headers: { Authorization: `Bearer ${auth}` } })
    requisition.then(navigate("/"))
  }

  useEffect(() => {
    const requisition = axios.get(`${process.env.REACT_APP_API_URL}/home`, { headers: { Authorization: `Bearer ${auth}` } });
    requisition.then((response) => {
      console.log(response)
      setNome(response.data[2].name);
      setExits(response.data[1][0]);
      setEntries(response.data[0][0]);
      let operacoes=[];
  for(let i=0; i< entries.length; i++){
    operacoes.push(entries[i]);
  }
  for(let i=0; i< exits.length; i++){
    operacoes.push(exits[i]);
  }
  for (let i = 0; i < operacoes.length; i++) {
                let maior = i;
                for (let j = i + 1; j < operacoes.length; j++) {
                    if (operacoes[j].time > operacoes[maior].time) {
                        maior = j;
                    }
                }
                let aux = operacoes[i];
                operacoes[i] = operacoes[maior];
                operacoes[maior] = aux;
            }

  setOperations(operacoes);
    })
  },[])
  
 
  


  let entriesValues=0;
  let exitsValues=0;
  let overall=0;

  for (let i = 0; i < entries.length; i++) {
    entriesValues = entriesValues + Number(entries[i].valor);
  }
  for (let i = 0; i < exits.length; i++) {
    exitsValues = exitsValues + Number(exits[i].valor);
  }

  overall = entriesValues - exitsValues;
  console.log(overall)

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {nome}</h1>
        <BiExit onClick={Logout} />
      </Header>

      <TransactionsContainer>
        <ul>{operations?.map((i) => <ListItemContainer><div>
          <span>{i.date}</span>
          <strong>{i.description}</strong></div>
          <Value color={i.identificacao === 1 ? "positivo" : "negativo"}>{i.valor}</Value></ListItemContainer>)}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={overall >= 0 ? "positivo" : "negativo"}>{overall? overall :"R$0,00"}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <Link to="/nova-transacao/entrada"><button>
          <AiOutlinePlusCircle />
          <p>Nova <br />entrada</p>
        </button></Link>
        <Link to="/nova-transacao/saida"><button>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
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