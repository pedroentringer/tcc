import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #fff;
`;

export const Scroll = styled.ScrollView.attrs({
    keyboardDismissMode: "on-drag",
    showsVerticalScrollIndicator: false
})`
    flex: 1;
`;

export const Content = styled.View`
    flex: 1;
    padding: 10px 26px 10px 26px;
`;

export const Title = styled.Text`
    font-family: "Montserrat-Bold";
    font-size: 30px;
    color: #1f2126;
`;

export const Descricao = styled.Text`
    font-family: "Montserrat-Regular";
    font-size: 16px;
    color: #1f2126;
`;

export const Card = styled.KeyboardAvoidingView`
    align-self: stretch;
    justify-content: space-between;
    margin-top: 50px;
    border-radius: 15px;
    background-color: #fff;
    box-shadow: 0 40px 50px rgba(0, 0, 0, 0.04);
    padding: 20px;
    elevation: 1;
`;

export const CardTitle = styled.Text`
    font-family: "Montserrat-Bold";
    font-size: 15px;
    margin-bottom: 5px;
`;

export const Input = styled.TextInput`
    align-self: stretch;
    border-radius: 5px;
    background-color: #f7f8f9;
    border: 1px solid #d2cfcf;
    padding: 5px 10px 5px 10px;
    font-size: 14px;
    margin-bottom: 20px;
`;

export const ViewPicker = styled.View`
    align-self: stretch;
    height: 40px;
    border-radius: 5px;
    background-color: #f7f8f9;
    border: 1px solid #d2cfcf;
    font-size: 14px;
    margin-bottom: 20px;
`;

export const Picker = styled.Picker`
    margin-top: -6px;
    color: #bdbdbd;
`;

export const ButtonNextContent = styled.View`
    align-items: flex-end;
    margin-top: 20px;
`;

export const Button = styled.TouchableOpacity.attrs({
    activeOpacity: 0.9
})`
    padding: 0 20px;
    height: 40px;
    border-radius: 8px;
    background-color: #2dce89;
    justify-content: center;
    align-items: center;
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
