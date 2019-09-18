import React, { useState, useEffect } from "react";
import { Alert, Text } from "react-native";
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
    CardAvaliacaoDescricao
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
        } catch (e) {
            showAlert("Algo deu errado", "Falha ao buscar dados do usuário, tente novamente.");
            navigation.goBack();
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
                <CardAvaliacao>
                    <CardAvaliacaoImage
                        source={{
                            uri: evaluation.user.picture
                        }}
                    />
                    <CardAvaliacaoTitle>{evaluation.user.name}</CardAvaliacaoTitle>
                    <CardAvaliacaoDescricao>{evaluation.description}</CardAvaliacaoDescricao>
                </CardAvaliacao>
            );
        });
    };

    return (
        <>
            {user == null ? (
                <ShimmerPlaceHolder key={index} autoRun={true} visible={shimmer} style={{ width: 300, height: 80, borderRadius: 10, margin: 10 }}></ShimmerPlaceHolder>
            ) : (
                <OficinaCard>
                    <OficinaImage
                        source={{
                            uri: oficina.picture
                        }}
                    />

                    <OficinaDetaisContent>
                        <OficinaNome>{oficina.name}</OficinaNome>
                        <OficinaDescricao>{oficina.description}</OficinaDescricao>
                    </OficinaDetaisContent>
                    <OficinaDetalhes>
                        <OficinaDetalhesServices>
                            <OficinaDetalhesTitle>Serviços</OficinaDetalhesTitle>
                            <OficinaDetalhesServicesContent>
                                <Text>Teste</Text>
                            </OficinaDetalhesServicesContent>
                        </OficinaDetalhesServices>
                        <OficinaDetalhesAvaliacoes>
                            <OficinaDetalhesTitle>Avaliações</OficinaDetalhesTitle>
                            <ScrollView horizontal={true}>
                                <OficinaDetalhesAvaliacoesContent horizontal={true}>{this.renderAvaliacoes()}</OficinaDetalhesAvaliacoesContent>
                            </ScrollView>
                        </OficinaDetalhesAvaliacoes>
                    </OficinaDetalhes>
                </OficinaCard>
            )}
        </>
    );
}
