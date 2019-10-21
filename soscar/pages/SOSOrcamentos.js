import React from "react";
import {StyleSheet} from "react-native";
import { Container,Content, Thumbnail, Button, Text, Input } from 'native-base';


export default function SOSOrcamento(props) {
    const { navigation } = props;
    const budget = navigation.getParam('budget');

    return (
        <Container>
            <Content style={styles.container}>
                <Thumbnail source={{ uri: budget.avatar }} />
                <Text style={styles.title}>{budget.title}</Text>
                <Text style={styles.subtitle}>{budget.description}</Text>
                <Text style={styles.subtitle}>R${budget.value}</Text>
                <Text style={styles.subtitle}>{budget.duration} horas</Text>
                <Button style={styles.button} full>
                    <Text>Orçamento {budget.status}</Text>
                </Button>
                <Button style={styles.button} full onPress={()=> navigation.goBack()}>
                    <Text>Cancelar Orçamento</Text>
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
        marginTop: 80,
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