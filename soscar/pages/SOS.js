import React from "react";
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';



export default function SOS(props) {
    const { navigation } = props;

    renderItems = () => {
        const items = [
            {
                avatar: 'https://imganuncios.mitula.net/hyundai_hb20_2013_flex_hyundai_hb20_1_0_comfort_12v_flex_4p_manual_azul_20132013_66000_km_6470130554386095216.jpg',
                title: 'Pneu furado',
                description: 'Passei por um buraco que purou meu pneu',
                hour: '14:44' 
            },
            {
                avatar: 'https://imganuncios.mitula.net/hyundai_hb20_2013_flex_hyundai_hb20_1_0_comfort_12v_flex_4p_manual_azul_20132013_66000_km_6470130554386095216.jpg',
                title: 'Pneu furado',
                description: 'Passei por um buraco que purou meu pneu',
                hour: '14:44' 
            },
            {
                avatar: 'https://imganuncios.mitula.net/hyundai_hb20_2013_flex_hyundai_hb20_1_0_comfort_12v_flex_4p_manual_azul_20132013_66000_km_6470130554386095216.jpg',
                title: 'Pneu furado',
                description: 'Passei por um buraco que purou meu pneu',
                hour: '14:44' 
            },
            {
                avatar: 'https://imganuncios.mitula.net/hyundai_hb20_2013_flex_hyundai_hb20_1_0_comfort_12v_flex_4p_manual_azul_20132013_66000_km_6470130554386095216.jpg',
                title: 'Pneu furado',
                description: 'Passei por um buraco que purou meu pneu',
                hour: '14:44' 
            },
            {
                avatar: 'https://imganuncios.mitula.net/hyundai_hb20_2013_flex_hyundai_hb20_1_0_comfort_12v_flex_4p_manual_azul_20132013_66000_km_6470130554386095216.jpg',
                title: 'Pneu furado',
                description: 'Passei por um buraco que purou meu pneu',
                hour: '14:44' 
            },
            {
                avatar: 'https://imganuncios.mitula.net/hyundai_hb20_2013_flex_hyundai_hb20_1_0_comfort_12v_flex_4p_manual_azul_20132013_66000_km_6470130554386095216.jpg',
                title: 'Pneu furado',
                description: 'Passei por um buraco que purou meu pneu',
                hour: '14:44' 
            },
            {
                avatar: 'https://imganuncios.mitula.net/hyundai_hb20_2013_flex_hyundai_hb20_1_0_comfort_12v_flex_4p_manual_azul_20132013_66000_km_6470130554386095216.jpg',
                title: 'Pneu furado',
                description: 'Passei por um buraco que purou meu pneu',
                hour: '14:44' 
            },
            {
                avatar: 'https://imganuncios.mitula.net/hyundai_hb20_2013_flex_hyundai_hb20_1_0_comfort_12v_flex_4p_manual_azul_20132013_66000_km_6470130554386095216.jpg',
                title: 'Pneu furado',
                description: 'Passei por um buraco que purou meu pneu',
                hour: '14:44' 
            },
            {
                avatar: 'https://imganuncios.mitula.net/hyundai_hb20_2013_flex_hyundai_hb20_1_0_comfort_12v_flex_4p_manual_azul_20132013_66000_km_6470130554386095216.jpg',
                title: 'Pneu furado',
                description: 'Passei por um buraco que purou meu pneu',
                hour: '14:44' 
            },
            {
                avatar: 'https://imganuncios.mitula.net/hyundai_hb20_2013_flex_hyundai_hb20_1_0_comfort_12v_flex_4p_manual_azul_20132013_66000_km_6470130554386095216.jpg',
                title: 'Pneu furado',
                description: 'Passei por um buraco que purou meu pneu',
                hour: '14:44' 
            },
            {
                avatar: 'https://imganuncios.mitula.net/hyundai_hb20_2013_flex_hyundai_hb20_1_0_comfort_12v_flex_4p_manual_azul_20132013_66000_km_6470130554386095216.jpg',
                title: 'Pneu furado',
                description: 'Passei por um buraco que purou meu pneu',
                hour: '14:44' 
            },
            {
                avatar: 'https://imganuncios.mitula.net/hyundai_hb20_2013_flex_hyundai_hb20_1_0_comfort_12v_flex_4p_manual_azul_20132013_66000_km_6470130554386095216.jpg',
                title: 'Pneu furado',
                description: 'Passei por um buraco que purou meu pneu',
                hour: '14:44' 
            },
            {
                avatar: 'https://imganuncios.mitula.net/hyundai_hb20_2013_flex_hyundai_hb20_1_0_comfort_12v_flex_4p_manual_azul_20132013_66000_km_6470130554386095216.jpg',
                title: 'Pneu furado',
                description: 'Passei por um buraco que purou meu pneu',
                hour: '14:44' 
            },
            {
                avatar: 'https://imganuncios.mitula.net/hyundai_hb20_2013_flex_hyundai_hb20_1_0_comfort_12v_flex_4p_manual_azul_20132013_66000_km_6470130554386095216.jpg',
                title: 'Pneu furado',
                description: 'Passei por um buraco que purou meu pneu',
                hour: '14:44' 
            },
        ]

        return items.map( (item, index) => {
            return (
                <ListItem avatar key={index} onPress={()=> {
                    navigation.navigate('SOSView', {sos: item})
                }}>
              <Left>
                <Thumbnail source={{ uri: item.avatar }} />
              </Left>
              <Body>
                <Text>{item.title}</Text>
                <Text note>{item.description}</Text>
              </Body>
              <Right>
                <Text note>{item.hour}</Text>
              </Right>
            </ListItem>
            )
        })
    };

    return (
        <Container>
        <Content>
          <List>
          {this.renderItems()}
          </List>
        </Content>
      </Container>
    );
}
