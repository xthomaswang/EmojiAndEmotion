import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('memo.db')

const initDB = () =>{
    db.transaction(tx =>{
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY NOT NULL, content TEXT, date TEXT, emo TEXT);',
            [],
            () => { console.log('Table created successfully'); },
            error => { console.log('Error creating table: ' + error.message); }
        )
    })
}

export { db, initDB };