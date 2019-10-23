import React, { useState } from "react";
import {StyleSheet, Alert} from "react-native";
import { Container,Content, Thumbnail, Button, Text, Input } from 'native-base';
import {NavigationApps,actions,googleMapsTravelModes, mapsTravelModes} from "react-native-navigation-apps";

import api from "../services/api";



export default function SOSView(props) {
    const { navigation } = props;
    const sos = navigation.getParam('sos');
    const mechanical = navigation.getParam('mechanical');
    const token = navigation.getParam('token');
;
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');

    const [text, setText] = useState('Enviar Orçamento');


    async function enviarOrcamento(){
        setText('Enviando...');
        try{
            const novoOrcamento = {
                mechanical: mechanical._id,
                description: description,
                duration: duration,
                price: price,
                status: 'P'
            }
            const response = await api.post(`/users/${sos.userId}/sos/${sos._id}/budgets`, novoOrcamento, { headers: { token: token }});
            setText('Enviar Orçamento');
            showAlert('Orçamento Enviando', 'Seu orçamento foi enviado, você será avisado caso seu orçamento seja aprovado.');
        }catch(e){
            setText('Enviar Orçamento');
            showAlert('Falha', 'Não foi possível enviar o orçamento');
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
                <Thumbnail source={{ uri: sos.vehicle.picture }} />
                <Text style={styles.title}>{sos.title}</Text>
                <Text style={styles.subtitle}>{sos.description}</Text>

                <Text style={styles.label}>Ver no mapa</Text>
                <NavigationApps
                    iconSize={50}
                    row
                    address={`@${sos.local.coordinates[1]},${sos.local.coordinates[0]}`}
                    waze={{
                        address:`@${sos.local.coordinates[1]},${sos.local.coordinates[0]}`,
                        lat:sos.local.coordinates[1],
                        lon:sos.local.coordinates[0],
                        action: actions.navigateByAddress
                    }}
                    googleMaps={{
                        search: `@${sos.local.coordinates[1]},${sos.local.coordinates[0]}`,
                        lat:sos.local.coordinates[1],
                        lon:sos.local.coordinates[0],
                        action: actions.navigateByAddress,
                        travelMode:googleMapsTravelModes.driving
                    }} 
                    maps={{
                        search: `@${sos.local.coordinates[1]},${sos.local.coordinates[0]}`,
                        lat:sos.local.coordinates[1],
                        lon:sos.local.coordinates[0],
                        action: actions.navigateByAddress,
                        travelMode:mapsTravelModes.driving
                    }} 
                />

                <Text style={styles.label}>Enviar Orçamento</Text>
                <Input style={styles.input} placeholder="Descrição" value={description} onChangeText={setDescription}></Input>
                <Input style={styles.input} placeholder="Valor em Reais" value={price} onChangeText={setPrice}></Input>
                <Input style={styles.input} placeholder="Duração em horas" value={duration} onChangeText={setDuration}></Input>

                <Button style={styles.button} full onPress={enviarOrcamento}>
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