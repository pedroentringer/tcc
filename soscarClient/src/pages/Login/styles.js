import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1;
    padding: 0px 26px 30px 26px;
    background-color: #f8f8fa;
    align-items: center;
    justify-content: space-between;
`;

export const Card = styled.KeyboardAvoidingView`
    align-self: stretch;
    justify-content: space-between;
    border-radius: 15px;
    background-color: #fff;
    box-shadow: 0 40px 50px rgba(0, 0, 0, 0.04);
    elevation: 2;
    padding: 20px;
`;

export const CardTitle = styled.Text`
    font-family: "Montserrat-Regular";
    font-size: 16px;
    text-align: center;
`;

export const CardDesc = styled.Text`
    font-family: "Montserrat-Regular";
    font-size: 16px;
    color: #a5a6a8;
    text-align: center;
    margin: 30px 0px;
`;

export const Phone = styled.TextInput`
    align-self: stretch;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: #f7f8f9;
    border: 1px solid #d2cfcf;
    border-bottom-width: 0px;
    padding: 5px 10px 5px 10px;
`;

export const Password = styled.TextInput`
    align-self: stretch;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: #f7f8f9;
    border: 1px solid #d2cfcf;
    padding: 5px 10px 5px 10px;
`;

export const Button = styled.TouchableOpacity.attrs({
    activeOpacity: 0.9
})`
    align-self: stretch;
    height: 40px;
    border-radius: 8px;
    background-color: #e53935;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
    box-shadow: 0 7px 18px rgba(87, 69, 239, 0.2);
    elevation: 1;
`;

export const ButtonText = styled.Text`
    font-family: "Montserrat-Bold";
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #fff;
`;

export const Cadastrar = styled.TouchableOpacity.attrs({
    activeOpacity: 0.9
})`
    align-self: stretch;
    margin: 40px 0 20px 0;
    justify-content: center;
    align-items: center;
`;

export const CadastrarText = styled.Text`
    color: #1f2126;
    font-family: Montserrat-Bold;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
`;
