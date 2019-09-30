import React, { useState, useEffect } from "react";
import { Alert, Text, View } from "react-native";
import {
    OficinaCard,
    OficinaImage,
    OficinaDetaisContent,
    OficinaNome,
    OficinaDescricao,
    OficinaDetalhes,
    OficinaDetalhesTitle,
    OficinaDetalhesServices,
    OficinaDetalhesServicesContent,
    OficinaDetalhesServicesTipo,
    OficinaDetalhesAvaliacoes,
    OficinaDetalhesAvaliacoesContent,
    CardAvaliacao,
    CardAvaliacaoImage,
    CardAvaliacaoTitle,
    CardAvaliacaoDescricao,
    Buttons,
    Button,
    ButtonText
} from "./styles";

import { ScrollView } from "react-native-gesture-handler";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";

import getRealm from "../../services/realm";

export default function Perfil(props) {
    const { navigation } = props;

    const [user, setUser] = useState(null);
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        getDadosProfile();
    }, []);

    async function getDadosProfile() {
        try {
            const realm = await getRealm();
            const user = await realm.objectForPrimaryKey("User", 1);
            const vehicles = await realm.objects("Vehicle");
            setVehicles(vehicles);
            setUser(user);
            realm.close();
        } catch (e) {
            showAlert("Algo deu errado", "Falha ao buscar dados do usuário, tente novamente.");
            navigation.goBack();
        }
    }

    async function handleLogout() {
        try {
            const realm = await getRealm();
            realm.beginTransaction();
            realm.deleteAll();
            realm.commitTransaction();
            realm.close();
            navigation.navigate("Login");
        } catch (e) {
            console.tron.log(e.data);
            showAlert("Algo deu errado", "Falha ao fazer logout, tente novamente.");
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

    renderAvaliacoes = () => {
        return vehicles.map((vehicle, index) => {
            return (
                <CardAvaliacao key={index}>
                    <CardAvaliacaoImage
                        source={{
                            uri: vehicle.picture
                        }}
                    />
                    <CardAvaliacaoTitle>
                        {vehicle.brand} {vehicle.model}
                    </CardAvaliacaoTitle>
                    <CardAvaliacaoDescricao>{vehicle.board}</CardAvaliacaoDescricao>
                </CardAvaliacao>
            );
        });
    };

    return (
        <>
            {user == null ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ShimmerPlaceHolder autoRun={true} visible={false} style={{ width: 100, height: 100, borderRadius: 50 }}></ShimmerPlaceHolder>
                </View>
            ) : (
                <OficinaCard>
                    <OficinaDetaisContent>
                        <OficinaImage
                            source={{
                                uri: user.picture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRBR5_JVBsUHXXto2MiT_KX9s74z4XI3zEeOIbNchYC-ETV-tXdw"
                            }}
                        />
                        <OficinaNome>{user.name}</OficinaNome>
                        <OficinaDescricao>Avaliações: {user.evaluationNumber} estrelas.</OficinaDescricao>
                    </OficinaDetaisContent>
                    <OficinaDetalhes>
                        <OficinaDetalhesServices>
                            <OficinaDetalhesTitle>Telefone</OficinaDetalhesTitle>
                            <OficinaDetalhesServicesContent>
                                <Text>{user.tel}</Text>
                            </OficinaDetalhesServicesContent>

                            <OficinaDetalhesTitle>Email</OficinaDetalhesTitle>
                            <OficinaDetalhesServicesContent>
                                <Text>{user.email}</Text>
                            </OficinaDetalhesServicesContent>

                            <OficinaDetalhesTitle>CPF</OficinaDetalhesTitle>
                            <OficinaDetalhesServicesContent>
                                <Text>{user.cpf}</Text>
                            </OficinaDetalhesServicesContent>
                        </OficinaDetalhesServices>
                        <OficinaDetalhesAvaliacoes>
                            <OficinaDetalhesTitle>Veículos</OficinaDetalhesTitle>
                            <ScrollView horizontal={true}>
                                <OficinaDetalhesAvaliacoesContent horizontal={true}>{this.renderAvaliacoes()}</OficinaDetalhesAvaliacoesContent>
                            </ScrollView>
                        </OficinaDetalhesAvaliacoes>
                    </OficinaDetalhes>
                    <Buttons>
                        <Button style={{ backgroundColor: "#e53935" }} onPress={handleLogout}>
                            <ButtonText>Sair</ButtonText>
                        </Button>
                        <Button
                            style={{ backgroundColor: "#2dce89" }}
                            onPress={() => {
                                navigation.navigate("CadastroVeiculo");
                            }}
                        >
                            <ButtonText>Novo Veículo</ButtonText>
                        </Button>
                    </Buttons>
                </OficinaCard>
            )}
        </>
    );
}
