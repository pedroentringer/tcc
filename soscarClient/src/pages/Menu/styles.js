import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #fff;
`;

export const Header = styled.View`
    width: 100%;
    padding: 20px;
    flex-direction: row;
    justify-content: center;
`;

export const LogoContainer = styled.View`
    align-items: flex-end;
    justify-content: center;
`;
export const Logo = styled.Image``;

export const Icons = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const MapView = styled.View`
    background-color: #fafafa;
    flex: 1;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    overflow: hidden;
    elevation: 1;
`;

export const Pesquisa = styled.View`
    position: absolute;
    top: 0px;
    width: 100%;
    padding: 20px 15px;
    z-index: 999999999;
`;

export const PesquisaContent = styled.KeyboardAvoidingView`
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    elevation: 2;
    border-radius: 7px;
    padding: 0px 10px;
    background-color: #fff;
    box-shadow: 0 40px 50px rgba(0, 0, 0, 0.04);
`;

export const PesquisaIcon = styled.Image`
    margin: 0px 5px;
`;

export const PesquisaInput = styled.TextInput`
    flex: 1;
    background-color: #fff;
    font-family: "Montserrat-Regular";
    font-size: 14px;
`;

export const OficinaContent = styled.View`
    position: absolute;
    bottom: 0px;
    width: 100%;
    z-index: 9999999999999999999;
`;

export const Buttons = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px 40px;
`;

export const CircleButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.8
})`
    width: 60px;
    height: 60px;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    background-color: #fff;
    elevation: 2;
    box-shadow: 0 40px 50px rgba(0, 0, 0, 0.04);
`;

export const CircleButtonText = styled.Text`
    font-family: "Montserrat-Bold";
    font-size: 18px;
    text-transform: uppercase;
    color: #e53935;
`;
