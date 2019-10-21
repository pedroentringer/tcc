import React from "react";
import {StyleSheet} from "react-native";
import { Container,Content, Thumbnail, Button, Text, Input } from 'native-base';


export default function Cadastro(props) {
    const { navigation } = props;

    return (
        <Container>
            <Content style={styles.container}>
                <Text style={styles.label}>Preencha o formulário</Text>
                <Input style={styles.input} placeholder="Razão Social"></Input>
                <Input style={styles.input} placeholder="CNPJ"></Input>
                <Input style={styles.input} placeholder="CEP"></Input>
                <Input style={styles.input} placeholder="UF"></Input>
                <Input style={styles.input} placeholder="Cidade"></Input>
                <Input style={styles.input} placeholder="Bairro"></Input>
                <Input style={styles.input} placeholder="Endereço"></Input>

                <Button style={styles.button} full onPress={()=> navigation.goBack()}>
                    <Text>Criar Minha Conta</Text>
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