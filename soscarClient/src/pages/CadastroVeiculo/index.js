import React, { useState, useEffect } from "react";
import { Image, Keyboard, Alert } from "react-native";
import { Container, Scroll, Content, Title, Descricao, CarContent, CarImage, Modelo, Ano, Placa, Card, CardTitle, Input, ButtonNextContent, Button, ButtonText } from "./styles";

import IconNext from "../../assets/img/icon-nex-arrow.png";

import api from "../../services/api";
import getRealm from "../../services/realm";
import Loading from "../../components/Loading";

export default function CadastroVeiculo(props) {
    const { navigation } = props;

    const [isLoading, setIsLoading] = useState(null);
    const [vehicle, setVehicle] = useState(null);
    const [board, setBoard] = useState("");

    async function handleSearch() {
        Keyboard.dismiss();

        if (board == "") {
            showAlert("Algo deu errado", "Você precisa informar uma placa.");
        } else {
            setIsLoading(true);

            try {
                const response = await api.get("/tools/board/" + board);
                setVehicle(response.data.vehicle);
                setIsLoading(false);
            } catch (e) {
                setIsLoading(false);
                const message = e.response.data.message || "Falha ao procurar seu veículo, tente novamente.";
                showAlert("Algo deu errado", message);
            }
        }
    }

    async function cadastra() {
        setIsLoading(true);
        try {
            const realm = await getRealm();
            const token = await realm.objectForPrimaryKey("Token", 1);
            const user = await realm.objectForPrimaryKey("User", 1);
            const maxId = await realm.objects("Vehicle").max("id");

            const newVehicle = {
                id: maxId + 1,
                board: board,
                brand: vehicle.brand,
                model: vehicle.model,
                picture: vehicle.picture,
                year: {
                    model: vehicle.year.model,
                    fabrication: vehicle.year.fabrication
                }
            };
            const response = await api.post(`/users/${user._id}/vehicles`, newVehicle, { headers: { token: token.token } });
            newVehicle._id = response.data._id;

            realm.write(() => {
                realm.create("Vehicle", newVehicle, "modified");
            });

            setIsLoading(false);
            navigation.navigate("Main");
        } catch (e) {
            setIsLoading(false);
            const message = e.response.data.message || "Falha ao cadastrar seu veículo, tente novamente.";
            showAlert("Algo deu errado", message);
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
        <>
            {isLoading && <Loading />}
            <Container>
                <Scroll>
                    <Content>
                        {vehicle ? (
                            <>
                                <CarContent>
                                    <CarImage source={{ uri: vehicle.picture }} />
                                    <Modelo>{vehicle.model}</Modelo>
                                    <Ano>
                                        {vehicle.year.fabrication}/{vehicle.year.model}
                                    </Ano>
                                    <Placa>{vehicle.board}</Placa>
                                </CarContent>

                                <Card>
                                    <CardTitle>UF</CardTitle>
                                    <Input value={vehicle.uf} placeholder="UF Licenciada" placeholderTextColor="#BDBDBD" editable={false} />

                                    <CardTitle>Cidade</CardTitle>
                                    <Input value={vehicle.city} placeholder="Cidade Licenciada" placeholderTextColor="#BDBDBD" editable={false} />

                                    <CardTitle>Situação</CardTitle>
                                    <Input value={vehicle.restrictions} placeholder="Situação" placeholderTextColor="#BDBDBD" editable={false} />
                                </Card>

                                <ButtonNextContent>
                                    <Button onPress={cadastra}>
                                        <ButtonText>
                                            Confirmar Dados <Image source={IconNext} />
                                        </ButtonText>
                                    </Button>
                                </ButtonNextContent>
                            </>
                        ) : (
                            <>
                                <Title>Novo Veículo</Title>
                                <Descricao>Informe a placa que buscamos o resto das informações</Descricao>

                                <Card>
                                    <CardTitle>Placa</CardTitle>
                                    <Input value={board} onChangeText={setBoard} placeholder="XXX-0X00" placeholderTextColor="#BDBDBD" autoCapitalize="none" autoCorrect={false} returnKeyType="join" />
                                </Card>
                                <ButtonNextContent>
                                    <Button onPress={handleSearch}>
                                        <ButtonText>Buscar Dados</ButtonText>
                                    </Button>
                                </ButtonNextContent>
                            </>
                        )}
                    </Content>
                </Scroll>
            </Container>
        </>
    );
}
