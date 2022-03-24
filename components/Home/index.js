import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import { StyleSheet, View, Dimensions, Text, Image, Linking } from 'react-native';
import { FAB, IconButton } from 'react-native-paper';
import useSQLite from "../../hooks/useSQLite";
import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function Home({ navigation })
{
    const { GetData } = useSQLite();
    const { listContact } = useSelector(state => state.contact);

    useEffect(() =>
    {
        GetData();
    }, []);

    const handleNewContact = () => navigation.navigate("NewContact");

    const handleViewDetail = (id) => navigation.navigate("Detail", { id });

    const handlePhoneCall = (phone) =>
    {
        const url = `tel://${phone}`;
        Linking.openURL(url);
    }

    const _dataProvider = new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(listContact);

    const _layoutProvider = new LayoutProvider(
        (index) => _dataProvider.getDataForIndex(index),
        (type, dim) => { dim.width = SCREEN_WIDTH; dim.height = 70; })

    const _rowRenderer = (type, data) =>
    {
        const { id, name, phone, email, img } = data;
        return (
            <View key={id} style={styles.listItem} elevation={5} >
                {img == "" &&
                    <Image style={styles.image} source={require("../../assets/people.png")} />}
                {img != "" &&
                    <Image style={styles.image} source={{ uri: img }} />}
                <View style={styles.body}>
                    <Text style={styles.name} onPress={() => handleViewDetail(id)}>
                        {name}
                    </Text>
                    <IconButton
                        style={styles.phoneBtn}
                        icon="phone-in-talk"
                        size={20}
                        onPress={() => handlePhoneCall(phone)}
                    />
                </View>
            </View>
        )
    };

    return (
        <View style={styles.container}>
            {
                listContact.length > 0 &&
                <RecyclerListView
                    style={{ flex: 1 }}
                    rowRenderer={_rowRenderer}
                    dataProvider={_dataProvider}
                    layoutProvider={_layoutProvider}
                />
            }
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={handleNewContact}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    listItem: {
        width: SCREEN_WIDTH - 10,
        flexDirection: 'row',
        margin: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: "#e3e1dc",
        borderRadius: 10
    },
    image: {
        flex: 1,
        height: 50,
        width: 50,
    },
    body: {
        flex: 6,
        flexDirection: "row",
        marginLeft: 15,
        marginTop: 5,
        width: SCREEN_WIDTH - 10,
    },
    name: {
        flex: 5,
        fontSize: 22,
        fontWeight: 'bold',
        padding: 3
    },
    phoneBtn: {
        flex: 1
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});