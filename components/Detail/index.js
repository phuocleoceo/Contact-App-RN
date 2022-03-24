import { StyleSheet, View, Image, ScrollView, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import useSQLite from "../../hooks/useSQLite";
import { Button } from 'react-native-paper';
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

    const handleDeleteContact = async (id) =>
    {
        await DeleteData(id);
        navigation.goBack();
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.avatarIcon}>
                {img == "" &&
                    <Image style={styles.image} source={require("../../assets/people.png")} />}
                {img != "" &&
                    <Image style={styles.image} source={{ uri: img }} />}
            </View>

            <View style={styles.formControl}>
                <Icon name="id-card" size={35} color="#6200ee" style={styles.formIcon} />
                <Text style={styles.textInfor}>{name}</Text>
            </View>

            <View style={styles.formControl}>
                <Icon name="phone" size={35} color="#6200ee" style={styles.formIcon} />
                <Text style={styles.textInfor}>{phone}</Text>
            </View>

            <View style={styles.formControl}>
                <Icon name="voicemail" size={35} color="#6200ee" style={styles.formIcon} />
                <Text style={styles.textInfor}>{email}</Text>
            </View>

            <View style={styles.btnBar}>
                <Button style={styles.btn} mode="contained"
                    icon="account-edit">
                    Edit
                </Button>

                <Button style={styles.btn} mode="contained"
                    icon="delete-forever" onPress={() => handleDeleteContact(id)}>
                    Delete
                </Button>
            </View>
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
    avatarIcon: {
        flex: 1,
        display: "flex",
        justifyContent: 'center',
        backgroundColor: "#ddd",
        position: "relative",
        marginBottom: 15
    },
    addPhoto: {
        position: "absolute",
        right: 0,
        bottom: 0,
    },
    image: {
        height: 300,
        width: "auto",
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
    formControl: {
        flex: 1,
        flexDirection: "row",
        margin: 10,
    },
    formIcon: {
        flex: 1,
        padding: 5,
        width: 50,
        height: 50,
        left: 10
    },
    textInfor: {
        flex: 3,
        fontSize: 20
    },
});