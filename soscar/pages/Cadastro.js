import React, {useState} from "react";
import {StyleSheet} from "react-native";
import { Container,Content, Thumbnail, Button, Text, Input } from 'native-base';
import location from "../services/location";


export default function Cadastro(props) {
    const { navigation } = props;

    const [text, setText] = useState('Criar Minha Conta');
    const [razaoSocial, setRazaoSocial] = useState('');
    const [descricao, setDescricao] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [cep, setCep] = useState('');
    const [uf, setUf] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');

    async function handleRegister() {
        Keyboard.dismiss();
        setText('Carregando...');
        try {

            const lastKnownLocation = await location.getLastKnownLocation();

            const newMechanical = {
                name: razaoSocial,
                description: descricao,
                tel: tel,
                picture: 'https://blog.etonini.com.br/wp-content/uploads/2018/01/134576-responsabilidades-das-oficinas-mecanicas-o-que-eu-preciso-saber-999x640.jpg',
                cnpj: cnpj,
                elevation:{
                    quantity: 0,
                    number: '5.0'
                },
                address:{
                    uf: uf,
                    city: cidade,
                    neighborhood: bairro,
                    address: endereco,
                    number: numero,
                    zipcode: cep,
                    local: {
                        type: "Point",
                        coordinates: [lastKnownLocation.coords.longitude, lastKnownLocation.coords.latitude]
                    }
                }
            };

            const response = await api.post("/mechanicals", newMechanical);
            const { mechanical, token } = response.data;
  
            setText('Criar Minha Conta');
            navigation.navigate("tab", {mechanical, token});
        } catch (e) {
            setText('Criar Minha Conta');
            if (e.response.data.message) {
                showAlert("Algo deu errado", e.response.data.message);
            } else {
                showAlert("Algo deu errado", "Falha ao registrar, tente novamente.");
            }
        }
    }
  
    function showAlert(title, message) {
        Alert.alert(
            title,
            message,
            [
                {
                    text: "Tentar Novamente"
                }
            ],
            { cancelable: false }
        );
    }

    return (
        <Container>
            <Content style={styles.container}>
                <Text style={styles.label}>Preencha o formulário</Text>
                <Input style={styles.input} keyboardType="default" placeholder="Razão Social" value={razaoSocial} onChangeText={setRazaoSocial}></Input>
                <Input style={styles.input} keyboardType="default" placeholder="Breve Descrição" value={descricao} onChangeText={setDescricao}></Input>
                <Input style={styles.input} keyboardType="phone-pad" placeholder="CNPJ" value={cnpj} onChangeText={setCnpj}></Input>
                <Input style={styles.input} keyboardType="phone-pad" placeholder="Telefone" value={tel} onChangeText={setTel}></Input>
                <Input style={styles.input} keyboardType="default" placeholder="Email" value={email} onChangeText={setEmail}></Input>
                <Input style={styles.input} keyboardType="default" secureTextEntry={true} placeholder="Senha" value={senha} onChangeText={setSenha}></Input>

                <Text style={styles.label}>Endereço</Text>
                <Input style={styles.input} keyboardType="phone-pad" placeholder="CEP" value={cep} onChangeText={setCep}></Input>
                <Input style={styles.input} keyboardType="default" placeholder="UF" value={uf} onChangeText={setUf}></Input>
                <Input style={styles.input} keyboardType="default" placeholder="Cidade" value={cidade} onChangeText={setCidade}></Input>
                <Input style={styles.input} keyboardType="default" placeholder="Bairro" value={bairro} onChangeText={setBairro}></Input>
                <Input style={styles.input} keyboardType="default" placeholder="Endereço" value={endereco} onChangeText={setEndereco}></Input>
                <Input style={styles.input} keyboardType="phone-pad" placeholder="Numero" value={numero} onChangeText={setNumero}></Input>

                <Button style={styles.button} full onPress={handleRegister}>
                    <Text>{text}</Text>
                </Button>
            </Content>
        </Container>
    );
}


const styles = StyleSheet.create({
    container:{
        padding: 26,
        backgroundColor: '#f4f5f7'
    },
    title: {
      fontSize: 30,
      textAlign:'left',
      fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        textAlign:'left',
    },
    label:{
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    button: {
        paddingVertical: 15,
        borderRadius: 5,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:10,
    },
    input:{
        backgroundColor: '#ffffff',
        paddingLeft: 15,
        paddingRight: 15,
        paddingVertical: 10,
        borderRadius: 5,
        elevation: 1,
        marginTop: 5
    }
  })