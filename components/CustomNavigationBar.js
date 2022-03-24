import { Appbar, Searchbar } from 'react-native-paper';
import React, { useState } from "react";

export default function CustomNavigationBar({ navigation, back })
{
    const [searchShow, setSearchShow] = useState(false);
    const handleSearch = () => setSearchShow(!searchShow);

    return (
        <Appbar.Header>
            {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            {
                searchShow
                    ?
                    <Searchbar
                        placeholder="Search"
                        value=""
                        style={{ width: "90%" }}
                    />
                    :
                    <Appbar.Content title="Contact App" />
            }
            <Appbar.Action icon="account-search" onPress={handleSearch} />
        </Appbar.Header>
    );
}