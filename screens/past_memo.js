import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { FlatList } from "react-native-gesture-handler";
import { globalStyles } from "../styles/global";
import Card from "../shared/card";
import { db, initDB } from '../database.js';
import { AntDesign } from '@expo/vector-icons';

export default function Past_Memo({ navigation }) {
    const [data, setData] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            fetchMemos();

        return () => {};
        }, []))

    const fetchMemos = () => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM memos;',
                [],
                (_, { rows: { _array } }) => setData(_array),
                (_, error) => console.log('Error fetching memos: ' + error.message)
            );
        });
    };

    const deleteMemo = (id) => {
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM memos WHERE id = ?;',
                [id],
                () => {
                    console.log('Memo deleted');
                    fetchMemos(); // Refresh the list after deletion
                },
                (_, error) => console.log('Error deleting memo: ' + error.message)
            );
        });
    };

    return (
        <View style = {{backgroundColor:"white"}}>
            <View>
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <View style = {styles.memoContainer}>
                                <Text style = {styles.dateText}>{item.date} {item.emo}</Text>
                                
                                
                                <TouchableOpacity style = {styles.memoInnerContainer}onPress={() => navigation.navigate('content', item)}>
                                    <Text style={styles.memoText}>{item.content}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style = {styles.deleteContainer}>
                                <TouchableOpacity onPress={() => deleteMemo(item.id)} style={styles.deleteButton}>
                                    <AntDesign name="delete" size={20} color="black" />
                                    
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
    },
    dateText:{
        fontWeight: "500",
    },
    memoContainer: {
        backgroundColor: "#DCDCDC",
        flex:5,
        borderWidth:2,
        borderRadius:10,
    },
    memoInnerContainer: {
        padding: 10,
        
        borderRadius:10,

    },
    memoText: {
        fontWeight: "bold",
    },
    deleteContainer: {
        flex:1,

    },
    deleteButton: {
        height:40,
        width:40,
        backgroundColor: '#ABABAB',
        padding: 10,
        borderRadius: 5,
        padding:10,
        marginLeft:10,
    },
    deleteText: {
        textAlign: "center",
        fontWeight: "bold",

    },
    // Add any other styles you need
});
