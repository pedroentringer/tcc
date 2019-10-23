import React, { useState, useEffect } from "react";
import { View } from 'react-native';
import { Container,  Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import moment from "moment";

import api from "../services/api";
import location from "../services/location";



export default function SOS(props) {
    const { navigation } = props;
    const mechanical = navigation.getParam('mechanical');
    const token = navigation.getParam('token');

    const [sos, setSos] = useState([]);
    const [message, setMessage] = useState('Buscando todos os SOS');

    useEffect(() => {
        getSos();
    }, []);

    async function getSos() {
        try{
            const lastKnownLocation = await location.getLastKnownLocation();
            const response = await api.get(`/tools/sos/?lat=${lastKnownLocation.coords.latitude}&long=${lastKnownLocation.coords.longitude}`)
            const { sos } = response.data;
            setSos(sos);

            if(sos.length == 0){
                setMessage('Nenhum SOS nessa região');
            }
        }catch(err){
            setMessage('Falha ao buscar SOS');
            showAlert('Falha ao buscar SOS', 'Não foi possível buscar os novos SOS no momento.');
        }
    }

    function showAlert(title, message) {
        Alert.alert(
            title,
            message,
            [
                { text: "Tentar novamente", onPress: getSos }
            ],
            { cancelable: true }
        );
    }

    function renderItems(){
        return sos.map( (item, index) => {
            return (
                <ListItem avatar key={index} onPress={()=> {
                    navigation.navigate('SOSView', {sos: item, mechanical: mechanical, token: token})
                }}>
              <Left>
                <Thumbnail source={{ uri: item.vehicle.picture }} />
              </Left>
              <Body>
                <Text>{item.title}</Text>
                <Text note style={{marginBottom:5}}>{item.description}</Text>
              </Body>
              <Right>
                <Text note>{moment(item.createdAt).format('HH:mm')}</Text>
              </Right>
            </ListItem>
            )
        })
    };

    return (
        <Container>
        <Content>
          <List>
          { sos.length > 0 ? renderItems() : (
              <View>
                  <Text>{message}</Text>
              </View>
          )}
          </List>
        </Content>
      </Container>
    );
}
