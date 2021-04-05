import React,{useState} from 'react';
import api from './services';
import './App.css';
import 'antd/dist/antd.css';
import { Input,Space,Typography,Modal } from 'antd';
const { Title } = Typography;
const { Search } = Input;

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data,setData] = useState();

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSearch = async (value)=>{
   const res =  await api.get(`${value}/json/`).then(()=>{
     console.log('bom')
   }).catch(()=>{console.log('ruim')}); 
   setData(res.data);
   showModal();
  }
  return (
    <div className="App">
      <Space style={ window.innerWidth>450?{position:'absolute',left:'60%',top:'45%',display:'flex', justifyContent:'center',alignItems:'center'}:{position:'absolute',left:'5%',top:'26%',display:'flex', justifyContent:'center',alignItems:'center'}} direction="vertical">
        <Title style={window.innerWidth>450?{fontSize:30,color:"#DB4644"}:{fontSize:26,color:"#F2DC16"}}>Consulte seu CEP aqui</Title>
        <Search maxLength={9} style={{width:250}} placeholder="Digite o CEP" onSearch={onSearch} enterButton />
      </Space>
      {data!==undefined
      ?
      <Modal title="Endereço" visible={isModalVisible}  onCancel={handleCancel} footer={[]}>
        <p>CEP: <strong>{data.cep}</strong></p>
        <p>Logradouro: <strong>{data.logradouro}</strong></p>
        <p>Complemento: <strong>{data.complemento}</strong></p>
        <p>Bairro: <strong>{data.bairro}</strong></p>
        <p>Localidade: <strong>{data.localidade}</strong></p>
        <p>UF: <strong>{data.uf}</strong></p>
      </Modal>
      :
      <></>
    }
    </div>  
  );
}

export default App;
