import React, { useState, useEffect } from "react";
import { Image, Alert } from "react-native";

import { Container, Scroll, Content, Title, Descricao, Card, CardTitle, Input, ButtonNextContent, Button, ButtonText, ViewPicker, Picker } from "./styles";

import IconNext from "../../assets/img/icon-nex-arrow.png";

import location from "../../services/location";
import api from "../../services/api";
import getRealm from "../../services/realm";
import Loading from "../../components/Loading";

export default function NovoSOS(props) {
    const { navigation } = props;

    const [titulo, setTitulo] = useState(navigation.getParam("sos", ""));
    const [descricao, setDescricao] = useState("");
    const [veiculoSelecionado, setVeiculoSelecionado] = useState("");
    const [veiculos, setVeiculos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getVeiculos() {
            const realm = await getRealm();
            const vehicles = await realm.objects("Vehicle");
            setVeiculos(vehicles);
        }

        getVeiculos();
    }, []);

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

    async function newSOS() {
        setIsLoading(true);
        try {
            const lastKnownLocation = await location.getLastKnownLocation();
            const realm = await getRealm();
            const user = await realm.objectForPrimaryKey("User", 1);
            const token = await realm.objectForPrimaryKey("Token", 1);

            const newSos = {
                vehicle: veiculoSelecionado,
                title: titulo,
                description: descricao,
                local: {
                    type: "Point",
                    coordinates: [lastKnownLocation.coords.longitude, lastKnownLocation.coords.latitude]
                },
                status: "P"
            };

            try {
                const response = await api.post(`/users/${user._id}/sos`, newSos, { headers: { token: token.token } });
                setIsLoading(false);
                navigation.navigate("Main");
                navigation.navigate("ListaSOS");
            } catch (e) {
                setIsLoading(false);
                const message = e.response.data.message || "Falha ao registar seu SOS, tente novamente.";
                showAlert("Algo deu errado", message);
            }
        } catch (e) {
            setIsLoading(false);
            showAlert("Ative o GPS", "Não conseguimos achar sua localização, por favor ative o GPS e tente novamente.");
        }
    }

    renderVeiculos = () => {
        return veiculos.map((veiculo, index) => {
            const label = `${veiculo.brand}/${veiculo.model}`;
            return <Picker.Item key={index} label={label} value={veiculo._id} />;
        });
    };

    return (
        <>
            {isLoading && <Loading />}
            <Container>
                <Scroll>
                    <Content>
                        <Title>Solicitar SOS</Title>
                        <Descricao>Se você está precisando de ajuda, veio ao lugar certo! Nos diga do que precisa que iremos acionar todos os nossos colaboradores.</Descricao>
                        <Card>
                            <CardTitle>Titulo do SOS</CardTitle>
                            <Input value={titulo} onChangeText={setTitulo} placeholder="Pneu furado" placeholderTextColor="#BDBDBD" autoCapitalize="none" autoCorrect={false} returnKeyType="next" />

                            <CardTitle>Descrição do SOS</CardTitle>
                            <Input
                                value={descricao}
                                onChangeText={setDescricao}
                                multiline={true}
                                numberOfLines={2}
                                placeholder="Meu pneu furou ao passar por um buraco enorme."
                                placeholderTextColor="#BDBDBD"
                                autoCapitalize="none"
                                autoCorrect={false}
                                returnKeyType="join"
                            />

                            <CardTitle>Veículo</CardTitle>
                            <ViewPicker>
                                <Picker selectedValue={veiculoSelecionado} onValueChange={(itemValue, itemIndex) => setVeiculoSelecionado(itemValue)}>
                                    {this.renderVeiculos()}
                                </Picker>
                            </ViewPicker>
                        </Card>

                        <ButtonNextContent>
                            <Button onPress={newSOS}>
                                <ButtonText>
                                    Solicitar SOS <Image source={IconNext} />
                                </ButtonText>
                            </Button>
                        </ButtonNextContent>
                    </Content>
                </Scroll>
            </Container>
        </>
    );
}
