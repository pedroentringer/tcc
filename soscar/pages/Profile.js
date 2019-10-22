import React from "react";
import {StyleSheet, View} from "react-native";
import { Container,Content, Thumbnail, Button, Text, Input } from 'native-base';


export default function Profile(props) {
    const { navigation } = props;
    const mechanical = navigation.getParam('mechanical');

    return (
        <Container>
            <Content style={styles.container}>
                <Thumbnail source={{ uri: mechanical.avatar }} />
                <Text style={styles.title}>{mechanical.name}</Text>
                <Text style={styles.subtitle}>{mechanical.description}</Text>
                <Text style={styles.label}>Serviços</Text>
                <View style={styles.buttons}>
                 {mechanical.services.map((service, index) => {
                     return (
                        <Button key={index} style={styles.button} rounded>
                            <Text>{service}</Text>
                        </Button>
                     )
                 })}
                </View>
                
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
    buttons:{
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    button:{
        margin: 5
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