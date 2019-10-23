import React, {useState} from "react";
import { StyleSheet, Alert, Keyboard } from "react-native";
import { Container,Content, Card, CardItem, Body, Button, Text, Input } from 'native-base';
import api from "../services/api";

export default function Login(props) {
    const { navigation } = props;
    
    const [text, setText] = useState('ENTRAR');
    const [tel, setTel] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin() {
      Keyboard.dismiss();
      setText('Carregando...');
      try {
          const response = await api.post("/loginMechanical", { tel, password });
          const { mechanical, token } = response.data;

          setText('ENTRAR');
          navigation.navigate("tab", {mechanical, token});
      } catch (e) {
        setText('ENTRAR');
          if (e.response.data.message) {
              showAlert("Algo deu errado", e.response.data.message);
          } else {
              showAlert("Algo deu errado", "Falha ao procurar seu registro, tente novamente.");
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
              },
              { text: "Criar Conta", onPress: () => navigation.navigate('Cadastro') }
          ],
          { cancelable: false }
      );
  }

    return (
        <Container style={styles.container}>
            <Text style={styles.title}>SOSCAR - Mecânicos</Text>
            <Text style={styles.subtitle}>Acesse sua conta para começar a resgatar os SOS's</Text>
            <Content>

            <Card style={styles.card}>
            <CardItem>
              <Body>
                <Input placeholder="Telefone" keyboardType='phone-pad' value={tel} onChangeText={setTel}></Input>
                <Input placeholder="Senha" keyboardType="default" secureTextEntry={true} value={password} onChangeText={setPassword} onSubmitEditing={handleLogin}></Input>
              </Body>
            </CardItem>
          </Card>
          <Button full onPress={handleLogin}>
            <Text>{text}</Text>
          </Button>
          <Button full info onPress={()=> navigation.navigate('Cadastro')} style={{marginTop: 20}}>
            <Text>Criar Minha Conta</Text>
          </Button>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingVertical: 120,
      backgroundColor: '#fafafa'
    },
    title: {
      fontSize: 30,
      textAlign:'center',
      fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 20,
        textAlign:'center',
    },
    card:{
        marginTop: 90,
        marginBottom: 20
    },
    button: {
        paddingVertical: 15,
        borderRadius: 5,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center'
    }
  })
  