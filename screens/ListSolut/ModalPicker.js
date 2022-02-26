import React from "react";
import{
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    ScrollView,


} from 'react-native'

const OPTIONS = ['Nước cất', 'NATRI CLORID 0.9%' ,'NATRI BICARBONAT 1,4%','Glucose 5%','SODIUM BICARBONATE 4,2%',];
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


const ModalPicker = (props) => {


    const onPressItem = (option) => {
        props.changeModeVisible(false);
        props.setData(option);

    }

    const option = OPTIONS.map((item, index) => {
        return (
            <TouchableOpacity 
               style ={styles.option}
               key = {index}
               onPress ={() => onPressItem(item)}
            >
                <Text style ={styles.text}>
                    {item}
                </Text>

            </TouchableOpacity>
        )
    })

    return (
        <TouchableOpacity
           onPress={() => props.changeModeVisible(false)}
           style = {styles.container}
        >
            <View style = {styles.modal}>
                <ScrollView>
                    {option}
                </ScrollView>

            </View>

        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    container :{
        flex : 1,
        alignItems :'center',
        justifyContent :'center',
    },
    modal :{
        backgroundColor: 'white',
        borderRadius :10,
        width : WIDTH-20,
        height : HEIGHT/3,



    },
    option :{
        alignItems :'flex-start'
    },
    text :{
        margin : 20,
        fontSize : 14,
        fontWeight :'bold',
    }

})

export  {ModalPicker }