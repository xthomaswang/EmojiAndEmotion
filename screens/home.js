import { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity,TextInput, TouchableWithoutFeedback,Keyboard } from "react-native";
import Card from "../shared/card";
import { db, initDB } from '../database.js';

export default function Home({ navigation }) {
    const [data, setData] = useState([]);
    const [newMemoContent, setNewMemoContent] = useState('');
    const [currentDate, setcurrentDate] = useState('');
    const [currentTime, setcurrentTime] = useState('');
    const [selectedEmoji, setSelectedEmoji] = useState('');
    const [message, setMessage] = useState('');

    const renderEmojiPicker = () => {
        const emojis = ["😡","😭", "😢", "😶", "☺️", "😊", "😝"];
        return emojis.map(emoji => (
            <TouchableOpacity 
                key={emoji} 
                onPress={() => setSelectedEmoji(emoji)}
                underlayColor="#DDDDDD" // Set your desired underlay color here
                style={emoji === selectedEmoji ? styles.selectedEmoji : null}
            >
                <Text style={{ fontSize: emoji === selectedEmoji ? 48 : 24}}>{emoji}</Text>
            </TouchableOpacity>
        ));
    };

    const getCurrentTime = ()=>{
        const time = new Date();
        return time.toLocaleString('en-US',{
            hour: 'numeric', 
            minute: 'numeric', 
            second: 'numeric',
            hour12: false,
        });
    }

    const getCurrentDate = ()=>{
        const time = new Date();
        return time.toLocaleString('en-US',{
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    }

    useEffect(() => {
        initDB();

        setcurrentTime(getCurrentTime); 
        setcurrentDate(getCurrentDate);

        const timeInterval = setInterval(() => {
            setcurrentTime(getCurrentTime); 
            setcurrentDate(getCurrentDate);
        }, 10);

        return () => clearInterval(timeInterval)

    }, []);

    const addMemo = () => {
        const timeValue = `${currentTime} ${currentDate}`;
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO memos (content, date, emo) VALUES (?, ?, ?);',
                [newMemoContent, timeValue, selectedEmoji],
                () => {
                    console.log('Memo added');
                    setNewMemoContent('');
                    setMessage('Record Complete'); 
                    setTimeout(() => setMessage(''), 1000); 
                    Keyboard.dismiss();
                },
                (_, error) => console.log('Error adding memo: ' + error.message)
            );
        });

    };

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}>
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Text>Heart Rate Variation Content</Text>
                    {/* Add your heart rate variation content here */}
                </View>
                <View style={styles.botContainer}>
                    {newMemoContent.trim() !== '' && (
                        <TouchableOpacity 
                            style={styles.addButton}
                            onPress={addMemo}
                            >
                            <Text style={styles.addButtonText}>Add Memo</Text>
                        </TouchableOpacity>
                    )}
                    <View>
                        <Text style={style= {textAlign:'center', fontWeight:'bold', fontSize:20,}}>{message}</Text>
                    </View>
                    <View style={styles.inputContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>今天</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>过</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>的</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>如何？</Text>
                    </View>
                        <View style={styles.emojiContainer}>
                            {renderEmojiPicker()}
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter memo content"
                            multiline={true}
                            value={newMemoContent}
                            onChangeText={setNewMemoContent}
                        />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        flex: 1, // 1/4 of the screen
        justifyContent: 'center',
        alignItems: 'center',
        // Additional styling
    },
    botContainer: {
        flex: 4, // 3/4 of the screen
        // Additional styling
    },
    inputContainer:{
        marginTop:20,
        marginBottom:20,
        flex:1,
        padding: 40,
        backgroundColor: 'white',
        borderRadius:20,
        borderWidth: 2,
        borderColor: 'black',
    },
    input: {
        textAlign:'left',
        borderWidth: 2,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        fontWeight:'bold',
        borderRadius: 6,
        marginTop:20,

    },
    addButton: {
        alignSelf: 'center',
        width:200,
        padding: 10,
        backgroundColor: '#2C99F3', // Color of your choice
        borderRadius: 30, // Rounded corners
    },
    addButtonText: {
        textAlign:'center',
        color: 'white', // Text color that contrasts with the button background
        fontSize: 24, // Adjust size as needed
    },
    emojiContainer: {
        alignContent:"center",
        alignItems:"center",
        width:"auto",
        height:"auto",
        borderWidth:2,
        borderRadius:20,
        flexDirection:"row", 
        justifyContent: "space-evenly", 
        marginTop:10 
    },

})