import * as SQLITE from "expo-sqlite"
import Toast from "react-native-toast-message"
const db = SQLITE.openDatabase("expense.db")
export const initializeDatabase = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS expense (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, amount TEXT NOT NULL);',
                [],
                () => {
                    resolve();
                },
                (_, err) => {
                    reject(err);
                    Toast.show({
                        type: "error",
                        text1: err
                    })
                }
            );
        });
    });
    return promise;
};
export const addTransaction = (title, amount) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "INSERT INTO expense (title , amount) VALUES (?, ?) ",
                [title, amount],
                (_, result) => {
                    resolve(result)
                },
                (_, err) => {
                    reject(err)
                }
            )
        })
    })
    return promise
}
export const fetchTransactions = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM expense ",
                [],
                (_, result) => { resolve(result) },
                (_, err) => { reject(err) }
            )
        })
    })
    return promise
}

export const deleteTransaction = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "DELETE FROM expense where id=? ",
                [id],
                (_,result) => {resolve(result) },
                (_,err) => {reject(err) }
            )
        })
    })
    return promise
}