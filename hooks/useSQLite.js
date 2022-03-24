import { SET_LIST_CONTACT, SET_CURRENT_CONTACT } from "../redux/slices/contactSlice";
import { useDispatch } from 'react-redux';
import * as SQLite from 'expo-sqlite';


const openDatabase = () =>
{
    if (Platform.OS === "web")
    {
        return {
            transaction: () =>
            {
                return {
                    executeSql: () => { },
                };
            },
        };
    }
    return SQLite.openDatabase("db.contactapp");
}

export default function useSQLite()
{
    const dispatch = useDispatch();
    const db = openDatabase();

    const SeedTable = () =>
    {
        const query = "CREATE TABLE IF NOT EXISTS Contact (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phone TEXT, email TEXT,img TEXT)";
        db.transaction(tx =>
        {
            tx.executeSql(query);
        });
    };

    const DropTable = () =>
    {
        const query = "DROP TABLE Contact";
        db.transaction(tx =>
        {
            tx.executeSql(query);
        });
    };

    const ClearTable = () =>
    {
        const query = "DELETE FROM Contact";
        db.transaction(tx =>
        {
            tx.executeSql(query);
        });
    };

    const GetData = () =>
    {
        const query = "SELECT * FROM Contact";
        db.transaction(tx =>
        {
            tx.executeSql(
                query, undefined,
                (txObj, { rows: { _array } }) => { dispatch(SET_LIST_CONTACT(_array)); },
                (txObj, Error) => { console.log('Get Error ', Error); return []; }
            );
        });
    };

    const GetDataById = (id) =>
    {
        const query = "SELECT * FROM Contact WHERE id=?";
        db.transaction(tx =>
        {
            tx.executeSql(
                query, [id],
                (txObj, { rows: { _array } }) => { dispatch(SET_CURRENT_CONTACT(_array[0])); },
                (txObj, Error) => { console.log('Get Error ', Error); return []; }
            );
        });
    };

    const AddData = (newData) =>
    {
        const { name, phone, email, img } = newData;
        const query = "INSERT INTO Contact (name , phone, email, img) VALUES (?, ?, ?, ?)";
        db.transaction(tx =>
        {
            tx.executeSql(
                query, [name, phone, email, img],
                (txObj, resultSet) => { GetData(); },
                (txObj, error) => { console.log('Add Error', error); return [] }
            );
        });
    };

    const UpdateData = (updateData) =>
    {
        const { id, name, phone, email, img } = updateData;
        const query = "UPDATE Contact SET name=?, phone=?, email=?,img=? WHERE id=?";
        db.transaction(tx =>
        {
            tx.executeSql(
                query, [name, phone, email, img, id],
                (txObj, resultSet) => { GetData(); },
                (txObj, error) => { console.log('Update Error', error); return [] }
            );
        });
    };

    const DeleteData = (id) =>
    {
        const query = "DELETE FROM Contact WHERE id=?";
        db.transaction(tx =>
        {
            tx.executeSql(
                query, [id],
                (txObj, resultSet) => { GetData(); },
                (txObj, error) => { console.log('Delete Error', error); return [] }
            );
        });
    };

    return {
        SeedTable, DropTable, ClearTable, GetData,
        GetDataById, AddData, UpdateData, DeleteData
    };
}
