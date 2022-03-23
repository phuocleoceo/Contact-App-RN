import { StyleSheet, View, Image, TextInput, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useForm, useController } from "react-hook-form";
import { Button, IconButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import useSQLite from "../../hooks/useSQLite";
import React, { useState } from 'react';

export default function NewContact({ navigation })
{
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [img, setImg] = useState("");
    const { AddData } = useSQLite();

    const Input = ({ name, control, placeHolder }) =>
    {
        const { field } = useController({
            control, defaultValue: "", name, rules: { require: true }
        });
        return (
            <TextInput
                style={styles.formInput}
                placeholder={placeHolder}
                onChangeText={field.onChange}
                value={field.value}
            />
        );
    };

    const handleUploadImg = async () =>
    {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false)
        {
            alert("Permission to access camera roll is required!");
            return;
        }
        const options = {
            base64: true
        };
        let pickerResult = await ImagePicker.launchImageLibraryAsync(options);
        if (!pickerResult.cancelled)
        {
            setImg('data:image/jpeg;base64,' + pickerResult.base64);
        }
    }

    const onSubmit = async (data) =>
    {
        const newContact = { ...data, img };
        await AddData(newContact);
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.avatarIcon}>
                {img == "" &&
                    <Image style={styles.image} source={require("../../assets/people.png")} />}
                {img != "" &&
                    <Image style={styles.image} source={{ uri: img }} />}
                <IconButton
                    icon="camera"
                    color="#fff"
                    size={28}
                    onPress={handleUploadImg}
                    style={styles.addPhoto}
                />
            </View>

            <View style={styles.formControl}>
                <Icon name="id-card" size={35} color="#6200ee" style={styles.formIcon} />
                <Input name="name" control={control} placeHolder="Enter name..." />
            </View>
            {errors.name && Alert.alert("Name is required")}

            <View style={styles.formControl}>
                <Icon name="phone" size={35} color="#6200ee" style={styles.formIcon} />
                <Input name="phone" control={control} placeHolder="Enter mobile phone..." />
            </View>

            <View style={styles.formControl}>
                <Icon name="voicemail" size={35} color="#6200ee" style={styles.formIcon} />
                <Input name="email" control={control} placeHolder="Enter email" />
            </View>

            <Button style={styles.btn} mode="contained"
                icon="plus" onPress={handleSubmit(onSubmit)}>
                Add Contact
            </Button>
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
    btn: {
        width: "45%",
        top: 10,
        padding: 5,
        alignSelf: "center",
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
    formInput: {
        flex: 5,
        fontSize: 20,
        padding: 10,

        borderWidth: 1,
        borderColor: "#7a7777",
        borderRadius: 10
    }
});