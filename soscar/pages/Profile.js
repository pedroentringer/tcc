import React from "react";
import {StyleSheet, View} from "react-native";
import { Container,Content, Thumbnail, Button, Text, Input } from 'native-base';


export default function SOSView(props) {
    const { navigation } = props;
    const sos = navigation.getParam('sos');

    return (
        <Container>
            <Content style={styles.container}>
                <Thumbnail source={{ uri: 'https://www.hojeemdia.com.br/polopoly_fs/1.582269!/image/image.jpg_gen/derivatives/landscape_653/image.jpg' }} />
                <Text style={styles.title}>Oficina Ousada</Text>
                <Text style={styles.subtitle}>No Mercado desde 2008</Text>
                <Text style={styles.label}>Serviços</Text>
                <View style={styles.buttons}>
                <Button style={styles.button} rounded>
                    <Text>Pneus</Text>
                </Button>

                <Button style={styles.button} rounded>
                    <Text>Baterias</Text>
                </Button>
                <Button style={styles.button} rounded>
                    <Text>Som</Text>
                </Button>
                <Button style={styles.button} rounded>
                    <Text>Guincho</Text>
                </Button>
                <Button style={styles.button} rounded>
                    <Text>Vitamina B3</Text>
                </Button>
                <Button style={styles.button} rounded>
                    <Text>Suco de Uva</Text>
                </Button>
                <Button style={styles.button} rounded>
                    <Text>Vitamina de Laranja</Text>
                </Button>
                <Button style={styles.button} rounded>
                    <Text>Sorvete</Text>
                </Button>
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