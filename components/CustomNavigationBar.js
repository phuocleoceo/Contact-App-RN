import { Appbar, Searchbar } from 'react-native-paper';
import useSQLite from "../hooks/useSQLite";
import React, { useState } from "react";

export default function CustomNavigationBar({ navigation, back })
{
    const { GetData, SearchData } = useSQLite();
    const [searchShow, setSearchShow] = useState(false);

    const handleShow = () => setSearchShow(!searchShow);

    const handleSearch = (query) =>
    {
        if (query.length == 0)
            GetData();
        else
            SearchData(query);
    };

    return (
        <Appbar.Header>
            {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            {
                searchShow
                    ?
                    <Searchbar
                        placeholder="Search"
                        style={{ width: "90%" }}
                        onChangeText={handleSearch}
                    />
                    :
                    <Appbar.Content title="Contact App" />
            }
            <Appbar.Action icon="account-search" onPress={handleShow} />
        </Appbar.Header>
    );
}