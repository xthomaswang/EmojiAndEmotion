import { StyleSheet, View, Text } from "react-native";
import { globalStyles } from "../styles/global";
export default function Setting(){
    return(
        <View style = {globalStyles.container}>
            <Text>
                <Text style = {styles.title_word}>Author:</Text>
                <Text style = {styles.content_word}>Thomas Wang</Text>
            </Text>

            <Text>
                <Text style = {styles.title_word}>Date:</Text>
                <Text style = {styles.content_word}>Dec 16, 2023</Text>
            </Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        padding:24,
    },
    title_word:{
        margin:1,
    },
    content_word:{
        fontWeight: 'bold', 
    },
    
})