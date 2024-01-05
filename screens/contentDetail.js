import { StyleSheet, View, Text,TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/global";
import { FontAwesome5,Feather } from '@expo/vector-icons'; 
import Card from "../shared/card";


export default function ContentDetail({route, navigation}){
    const { content, date, emo } = route.params;
    return(

        <View style = {globalStyles.container}>
            <Card>
                <Text style={globalStyles.titleText}>{content}</Text>
                <Text style={globalStyles.descriptionText}>{date}</Text>
                <View style={styles.rating}>
                    <Text>Today's rating:{emo}</Text>
                    {/* <FontAwesome5 name={emo} size={24} color="black" /> */}

                </View>
            </Card>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={globalStyles.titleText}>Back</Text>
            </TouchableOpacity>
        </View>
    )

}

const styles=StyleSheet.create({
    rating:{

    },
})
