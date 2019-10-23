import React, {useState, useEffect} from "react";
import {StyleSheet, Keyboard, PermissionsAndroid, Alert, View} from "react-native";
import { Container,Content, Button, Text, Input } from 'native-base';
import location from "../services/location";
import api from "../services/api";

export default function Cadastro(props) {
    const { navigation } = props;

    const [locationPermission, setLocationPermission] = useState(false);

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

    const [services, setServices] = useState([]);
    const [newService, setNewService] = useState('');

    function addNewService(){
        setServices([...services, newService]);
        setNewService('');
    }

    function requestLocationPermission() {
        return new Promise(async (resolve, reject) => {
            try {
                const checked = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
                if (!checked) {
                    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        resolve(true);
                    }
                } else {
                    resolve(true);
                }
            } catch (err) {
                resolve(false);
            }
        });
    }

    useEffect(() => {
        async function locationPermissionAlert() {
            const permission = await requestLocationPermission();
            if (permission == true) {
                setLocationPermission(permission);
            }else{
                locationPermissionAlert();
            }
        }

        locationPermissionAlert();
    }, []);

    async function handleRegister() {
        Keyboard.dismiss();
        setText('Carregando...');
        try {

            if(locationPermission == false){
                showAlert('Localização', 'Você precisa liberar a permissão de localização.')
                setText('Criar Minha Conta');
            }else{
                const lastKnownLocation = await location.getLastKnownLocation();

                const newMechanical = {
                    name: razaoSocial,
                    description: descricao,
                    password: senha,
                    tel: tel,
                    email:email,
                    picture: 'https://www.empregamecanico.com.br/assets/images/logos/logo-214248f77e80c0f1107f57adb02080fc.jpg',
                    cnpj: cnpj,
                    services: services,
                    evaluation:{
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
    
                console.tron.log(newMechanical);
                const response = await api.post("/mechanicals", newMechanical);
                
                const { mechanical, token } = response.data;
                setText('Criar Minha Conta');
                navigation.navigate("tab", {mechanical, token});
            }

            
        } catch (e) {
            setText('Criar Minha Conta');
            
                showAlert("Algo deu errado", "Falha ao registrar, tente novamente.");
            
        }
    }
  
    function showAlert(title, message) {
        Alert.alert(
            title,
            message,
            [
                {
                    text: "Entendi"
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

                <Text style={[styles.label, {marginTop:30}]}>Endereço</Text>
                <Input style={styles.input} keyboardType="phone-pad" placeholder="CEP" value={cep} onChangeText={setCep}></Input>
                <Input style={styles.input} keyboardType="default" placeholder="UF" value={uf} onChangeText={setUf}></Input>
                <Input style={styles.input} keyboardType="default" placeholder="Cidade" value={cidade} onChangeText={setCidade}></Input>
                <Input style={styles.input} keyboardType="default" placeholder="Bairro" value={bairro} onChangeText={setBairro}></Input>
                <Input style={styles.input} keyboardType="default" placeholder="Endereço" value={endereco} onChangeText={setEndereco}></Input>
                <Input style={styles.input} keyboardType="phone-pad" placeholder="Numero" value={numero} onChangeText={setNumero}></Input>

                <Text style={[styles.label, {marginTop:30}]}>Adicionar Serviços</Text>
                <View style={styles.buttons}>
                 {services.map((service, index) => {
                     return (
                        <Button key={index} style={[styles.button, {margin: 5, marginBottom: 10}]} rounded>
                            <Text>{service}</Text>
                        </Button>
                     )
                 })}
                </View>
                <Input style={styles.input} keyboardType="default" placeholder="Serviço" value={newService} onChangeText={setNewService} onSubmitEditing={addNewService}></Input>
                <Button style={styles.button} full onPress={addNewService}>
                    <Text>Adicionar Serviço</Text>
                </Button>

                <Text style={styles.label}>Enviar Registro</Text>
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
    buttons:{
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    button: {
        paddingVertical: 15,
        borderRadius: 5,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:10,
        marginBottom:60
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