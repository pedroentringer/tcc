import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #fff;
    padding: 20px;
    justify-content: space-between;
`;

export const Oficina = styled.View`
    flex-direction: row;
    align-items: center;
    padding-bottom: 10px;
`;

export const OficinaAvatar = styled.Image`
    width: 70px;
    height: 70px;
    border-radius: 35px;
`;

export const OficinaContent = styled.View`
    flex: 1;
    justify-content: center;
    padding-left: 20px;
`;

export const OficinaNome = styled.Text`
    font-family: "Montserrat-Bold";
    font-size: 16px;
    color: #1f2126;
`;

export const OficinaDescricao = styled.Text`
    font-family: "Montserrat-Regular";
    font-size: 12px;
    text-transform: uppercase;
`;

export const OficinaStar = styled.Image``;

export const OficinaStarText = styled.Text`
    font-family: "Montserrat-Bold";
    font-size: 14px;
    text-transform: uppercase;
    color: #f5ed26;
    padding-left: 5px;
`;

export const Titulo = styled.Text`
    font-family: "Montserrat-Bold";
    font-size: 18px;
    color: #1f2126;
`;

export const Descricao = styled.Text`
    font-family: "Montserrat-Regular";
    font-size: 16px;
    color: #1f2126;
`;

export const Conteudo = styled.View`
    flex: 1;
    padding: 60px 0px;
    justify-content: space-between;
`;

export const Secao = styled.View``;

export const Botoes = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Botao = styled.TouchableOpacity.attrs({
    activeOpacity: 0.8
})`
    flex: 1;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    margin: 10px;
    height: 40px;
`;

export const BotaoText = styled.Text`
    font-family: "Montserrat-Regular";
    font-size: 14px;
    color: #fff;
`;

export const OficinaProfileContent = styled.View`
    position: absolute;
    bottom: 0px;
    width: 100%;
    z-index: 9999999999999999999;
`;
