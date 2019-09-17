import React, { useState, useEffect } from "react";
import { Alert, TouchableNativeFeedback } from "react-native";

import { Container, Scroll, Content, Title, Card, CardContent, CarImage, CardDetails, CardImage, CardBoard, CardTitle, CardDescription, CardStatus, CardStatusText } from "./styles";

import api from "../../services/api";
import getRealm from "../../services/realm";
import Loading from "../../components/Loading";

export default function ListaSOS(props) {
    const { navigation } = props;

    const [sos, setSos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getSos() {
            setIsLoading(true);
            try {
                const realm = await getRealm();
                const user = await realm.objectForPrimaryKey("User", 1);
                const token = await realm.objectForPrimaryKey("Token", 1);

                const response = await api.get(`/users/${user._id}/sos`, { headers: { token: token.token } });
                setSos(response.data.sos);
                setIsLoading(false);
            } catch (e) {
                setIsLoading(false);
                const message = e.response.data.message || "Falha ao buscar seus sos, tente novamente.";
                showAlert("Algo deu errado", message);
            }
        }

        getSos();
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

    renderSos = () => {
        return sos.map((item, index) => {
            let status = {
                backgroundColor: "#172b4d",
                text: "SOS Pendente"
            };

            switch (item.status) {
                case "F":
                    status.backgroundColor = "#2DCE89";
                    status.text = "SOS Finalizado";
                    break;
                case "C":
                    status.backgroundColor = "#F5365C";
                    status.text = "SOS Cancelado";
                    break;
            }
            return (
                <TouchableNativeFeedback
                    key={index}
                    onPress={() => {
                        navigation.navigate("SOS", { sos: item, status: status });
                    }}
                >
                    <Card>
                        <CardContent>
                            <CarImage>
                                <CardImage
                                    source={{
                                        uri: item.vehicle.picture
                                    }}
                                ></CardImage>
                                <CardBoard>{item.vehicle.board}</CardBoard>
                            </CarImage>
                            <CardDetails>
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription>{item.description}</CardDescription>
                            </CardDetails>
                        </CardContent>
                        <CardStatus style={{ backgroundColor: status.backgroundColor }}>
                            <CardStatusText>{status.text}</CardStatusText>
                        </CardStatus>
                    </Card>
                </TouchableNativeFeedback>
            );
        });
    };

    return (
        <>
            {isLoading && <Loading />}
            <Container>
                <Scroll>
                    <Content>
                        <Title>Lista de SOS</Title>
                        {this.renderSos()}
                    </Content>
                </Scroll>
            </Container>
        </>
    );
}
