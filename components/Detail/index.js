import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import useSQLite from "../../hooks/useSQLite";
import { useSelector } from "react-redux";
import React, { useEffect } from 'react';

export default function NewContact({ navigation, route })
{
    const { id } = route.params;
    const { GetDataById, DeleteData } = useSQLite();
    const { currentContact: { name, phone, email, img } } = useSelector(state => state.contact);

    useEffect(() =>
    {
        GetDataById(id);
    }, []);

    const handleEditContact = (id) =>
    {
        navigation.navigate("EditContact", { id });
    };

    const handleDeleteContact = async (id) =>
    {
        await DeleteData(id);
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container}>
            <Card>
                {img == "" &&
                    <Card.Cover style={styles.avatarImg} source={require("../../assets/people.png")} />}
                {img != "" &&
                    <Card.Cover style={styles.avatarImg} source={{ uri: img }} />}

                <Title style={styles.cardTitle}>{name}</Title>

                <Card.Content style={styles.cardContent}>
                    <Icon name="phone" size={35} color="#6200ee"
                        style={{ flex: 2, top: 15 }} />
                    <View style={{ flex: 6 }}>
                        <Title>{phone}</Title>
                        <Paragraph>{email}</Paragraph>
                    </View>
                    <Icon name="comment-dots" size={35} color="#6200ee"
                        style={{ flex: 1, top: 15 }} />
                </Card.Content>

                <Card.Actions style={styles.btnBar}>
                    <Button style={styles.btn} mode="contained"
                        icon="account-edit" onPress={() => handleEditContact(id)}>
                        Edit
                    </Button>
                    <Button style={styles.btn} mode="contained"
                        icon="delete-forever" onPress={() => handleDeleteContact(id)}>
                        Delete
                    </Button>
                </Card.Actions>
            </Card>
        </ScrollView >
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        height: "100%",
        width: "100%"
    },
    avatarImg: {
        flex: 1,
        marginBottom: 15,
        height: 270,
        width: 270,
        alignSelf: "center"
    },
    cardTitle: {
        flex: 1,
        fontSize: 27,
        textAlign: "center",
        marginTop: 5,
        marginBottom: 10
    },
    btnBar: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 20
    },
    btn: {
        width: "30%",
        padding: 5
    },
    cardContent: {
        flex: 1,
        flexDirection: "row"
    },
});