import React, { useEffect, useState } from "react";

import { TouchableOpacity, View, Text, PermissionsAndroid, Keyboard, Image, StyleSheet, Alert } from "react-native";

import MapboxGL from "@react-native-mapbox-gl/maps";

import location from "../../services/location";
import api from "../../services/api";
import getRealm from "../../services/realm";

import MechanicalProfile from "../../components/MechanicalProfile";

import { Container, Header, LogoContainer, Logo, Icons, MapView, Pesquisa, PesquisaContent, PesquisaIcon, PesquisaInput, OficinaContent, Buttons, CircleButton, CircleButtonText } from "./styles";

import LogoImage from "../../assets/img/LogoMini.png";
import SearchImage from "../../assets/img/search.png";
import IconOrcamentosImage from "../../assets/img/orcamentos.png";
import IconProfileImage from "../../assets/img/person.png";

MapboxGL.setAccessToken("sk.eyJ1IjoicGVkcm9lbnRyaW5nZXIiLCJhIjoiY2p6bmRjMmJhMDJ5bzNibzU4MDRjenR0NSJ9.kh-2dXCAWoUlWi4FZ29znA");

export default function Menu(props) {
    const { navigation } = props;

    const [locationPermission, setLocationPermission] = useState(false);
    const [oficinaSelecionada, setOficinaSelecionada] = useState(null);
    const [oficinas, setOficinas] = useState([]);
    const [sos, setSos] = useState("");

    useEffect(() => {
        async function getOficinas() {
            const permission = await requestLocationPermission();
            if (permission == true) {
                setLocationPermission(permission);

                const lastKnownLocation = await location.getLastKnownLocation();
                try {
                    const realm = await getRealm();

                    const token = await realm.objectForPrimaryKey("Token", 1);

                    const response = await api.get(`/mechanicals/?lat=${lastKnownLocation.coords.latitude}&long=${lastKnownLocation.coords.longitude}`, { headers: { token: token.token } });
                    const { mechanicals } = response.data;
                    setOficinas(mechanicals);
                } catch (e) {
                    const message = e.response.data.message || "Falha ao buscar oficinas na região.";
                    showAlert("Algo deu errado", message);
                }
            }
        }

        getOficinas();
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

    renderPoints = () => {
        return oficinas.map((oficina, index) => {
            return (
                <MapboxGL.PointAnnotation key={index} id={oficina._id} coordinate={oficina.address.local.coordinates} onSelected={() => setOficinaSelecionada(oficina)} onDeselected={() => setOficinaSelecionada(null)}>
                    <MapboxGL.Callout style={styles.hidden} containerStyle={styles.hidden} contentStyle={styles.hidden} />
                </MapboxGL.PointAnnotation>
            );
        });
    };

    function requestLocationPermission() {
        return new Promise(async (resolve, reject) => {
            try {
                const checked = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
                if (!checked) {
                    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        resolve(true);
                    }
                } else {
                    resolve(true);
                }
            } catch (err) {
                resolve(false);
            }
        });
    }

    function newSos() {
        navigation.navigate("NovoSOS", { sos: sos });
    }

    return (
        <Container>
            <Header>
                <LogoContainer>
                    <Logo source={LogoImage} />
                </LogoContainer>
            </Header>

            {locationPermission === true ? (
                <MapView>
                    <Pesquisa>
                        <PesquisaContent>
                            <PesquisaIcon source={SearchImage} />
                            <PesquisaInput
                                value={sos}
                                onChangeText={setSos}
                                placeholder="O que houve?"
                                placeholderTextColor="#A5A6A8"
                                autoCapitalize="words"
                                autoCorrect={true}
                                returnKeyType="join"
                                onTouchStart={() => {
                                    setOficinaSelecionada(null);
                                }}
                                onSubmitEditing={Keyboard.dismiss}
                            />
                        </PesquisaContent>
                    </Pesquisa>

                    <OficinaContent>
                        <Buttons>
                            <CircleButton
                                onPress={() => {
                                    navigation.navigate("ListaSOS");
                                }}
                            >
                                <Image source={IconOrcamentosImage} />
                            </CircleButton>

                            <CircleButton onPress={newSos}>
                                <CircleButtonText>SOS</CircleButtonText>
                            </CircleButton>

                            <CircleButton
                                onPress={() => {
                                    navigation.navigate("Perfil");
                                }}
                            >
                                <Image source={IconProfileImage} />
                            </CircleButton>
                        </Buttons>
                        {oficinaSelecionada != null && (
                            <MechanicalProfile
                                oficina={oficinaSelecionada}
                                onClose={() => {
                                    setOficinaSelecionada(null);
                                }}
                            />
                        )}
                    </OficinaContent>
                    <MapboxGL.MapView
                        styleURL={MapboxGL.StyleURL.Street}
                        compassEnabled={false}
                        scrollEnabled={true}
                        zoomEnabled={true}
                        rotateEnabled={true}
                        logoEnabled={false}
                        attributionEnabled={false}
                        onPress={Keyboard.dismiss}
                        style={{ flex: 1 }}
                    >
                        <MapboxGL.UserLocation visible animated />
                        <MapboxGL.Camera followZoomLevel={12} followUserLocation={true} followUserMode="compass" />

                        {this.renderPoints()}
                    </MapboxGL.MapView>
                </MapView>
            ) : (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text>Você precisa ativar a localização</Text>
                    <View>
                        <TouchableOpacity onPress={requestLocationPermission}>
                            <Text>Tentar Novamente</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </Container>
    );
}

const styles = StyleSheet.create({
    hidden: {
        display: "none"
    }
});
