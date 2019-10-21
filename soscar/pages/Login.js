import React from "react";
import { View,  TouchableOpacity, StyleSheet } from "react-native";
import { Container,Content, Card, CardItem, Body, Button, Text, Input } from 'native-base';

export default function Login(props) {
    const { navigation } = props;


    return (
        <Container style={styles.container}>
            <Text style={styles.title}>SOSCAR - Mecânicos</Text>
            <Text style={styles.subtitle}>Acesse sua conta para começar a resgatar os SOS's</Text>
            <Content>

            <Card style={styles.card}>
            <CardItem>
              <Body>
                <Input placeholder="Telefone"></Input>
                <Input placeholder="Senha"></Input>
              </Body>
            </CardItem>
          </Card>
          <Button full onPress={()=> navigation.navigate('tab')}>
            <Text>Entrar</Text>
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
  