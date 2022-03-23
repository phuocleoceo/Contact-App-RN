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

const db = openDatabase();

export const SeedTable = () =>
{
    const query = "CREATE TABLE IF NOT EXISTS Contact (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phone TEXT, email TEXT,img TEXT)";
    db.transaction(tx =>
    {
        tx.executeSql(query);
    })
};

export const DropTable = () =>
{
    const query = "DROP TABLE Contact";
    db.transaction(tx =>
    {
        tx.executeSql(query);
    });
};

export const ClearTable = () =>
{
    const query = "DELETE FROM Contact";
    db.transaction(tx =>
    {
        tx.executeSql(query);
    });
};

export const GetContact = () =>
{
    const query = "SELECT * FROM Contact";
    db.transaction(tx =>
    {
        tx.executeSql(
            query, undefined,
            (txObj, { rows: { _array } }) => { return _array },
            (txObj, Error) => { console.log('Error ', Error); return []; }
        );
    });
};

export const AddContact = (name, phone, email, img) =>
{
    const query = "INSERT INTO Contact (name , phone, email, img) VALUES (?, ?, ?, ?,?)";
    db.transaction(tx =>
    {
        tx.executeSql(
            query, [name, phone, email, img],
            (txObj, resultSet) => { return GetContact(); },
            (txObj, error) => { console.log('Add Error', error); return state }
        );
    });
};

export const UpdateContact = (id, name, phone, email, img) =>
{
    const query = "UPDATE Contact SET name=?, phone=?, email=?,img=? WHERE id = ?";
    db.transaction(tx =>
    {
        tx.executeSql(
            query, [name, phone, email, img, id],
            (txObj, resultSet) => { return GetContact(); },
            (txObj, error) => { console.log('Update Error', error); return false }
        );
    });
};

export const DeleteContact = (id) =>
{
    const query = "DELETE FROM Contact WHERE id= ?";
    db.transaction(tx =>
    {
        tx.executeSql(
            query, [id],
            (txObj, resultSet) => { return GetContact(); },
            (txObj, error) => { console.log('Delete Error', error); return false }
        );
    });
};