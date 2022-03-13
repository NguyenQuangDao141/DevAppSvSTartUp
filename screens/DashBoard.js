import React, { useState, useEffect, useContext } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Image,
    Text,
    Dimensions,
    Animated,
    Button,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    ScrollView,
   
} from 'react-native';

import {
  Appbar,
  DarkTheme,
  DefaultTheme,
  Provider,
  Surface,
  ThemeProvider,
} from 'react-native-paper' ;


import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from '../database/config'
import Modal from 'react-native-modal';
import { TextInput } from 'react-native-paper'
import { AuthContext } from '../navigations/AuthContext'
import LinearGradient from 'react-native-linear-gradient'
import { createIconSetFromFontello } from 'react-native-vector-icons';
import {ModalPicker} from './ListSolut/ModalPicker';
import { NavigationContainer } from '@react-navigation/native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
let index = null
let dataUser = {}
const DashBoard = ({navigation}) => {
    const { user, setUser } = useContext(AuthContext);
    const[Warning,SetWarning] = useState(false)
    const [data, setData] = useState([])
    const [flag, setFlag] = useState(false)
    const [show, setShow] = useState(false)
    const [isCalib, setIsCalib] = useState(false)
    const rootRef = firebase.database().ref();
    const animalRef = rootRef.child('/').orderByKey();
    

    const List = (props ) => {
        
        const [showColor, setShowColor] = useState(false)
        useEffect(() => {
            const interval = setTimeout(() => {
                setShowColor(!showColor);
                
            }, 400);
            return () => {
                clearInterval(interval)
            }
        })
        let timer ;
        if (props.data.time == undefined) { }

        // else if (props.data.time.length > 5) {
        //     timer = props.data.time.substring(0, 2);
        // }
        else {
            timer = props.data.time
           // console.log(props.data.time)
        }
     
     
        return (
            
                <TouchableOpacity 
                    onPress={() => { 
 
                        //console.log(`data: ${data}` )
                        //setShow(true); 
                        //console.log(`data :${props.data.id}`)
                        navigation.navigate('Infor',{
                            dataId:props.data.id,
                            solutionIf:props.data.solution,

                            })
                     }}
                    style={props.data.velo > 200 ? (showColor) ? styles.warningDrop : styles.warningDropNo : styles.warningDropNo}>
                    <View style={props.data.stt&&props.data.stt1 ?  styles.title : styles.titleWarning}>
                        <View >
                            <Text style={styles.header}>ID</Text>
                            <Text style={{color:'#D01C1C'}}>{props.data.IDUser}</Text>
                        </View>
                        <View style={styles.datas}>
                            <View style={styles.data}>
                                <Text style={styles.header}>Tốc độ</Text>
                                <Text style={{color:'#D01C1C'}}>{props.data.velo}</Text>
                            </View>
                            <View style={styles.data}>
                                <Text style={styles.header}>Trạng thái</Text>
                                {props.data.stt ? <MCIcons name={'water'} size={25} /> : <MCIcons name={'water-off'} size={25} />}
                            </View>
                            <View style={styles.data}>
                                <Text style={styles.header}>Thời gian</Text>
                                <Text style={timer >= 15 ? styles.warningTime : styles.warningTimeNo}>{timer}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            
        )
    }

    useEffect(() => {
        animalRef.on('value', (child) => {
            let dataTemp = []
            child.forEach((doc) => {
                let key = doc.key
                let childData = doc.val()
                childData = { ...childData, id: key }
                dataTemp.push(childData)
            })
            if (flag) {
                dataTemp.sort((a, b) => {
                    return a.IDUser - b.IDUser
                })
            }
            else {
                dataTemp.sort((a, b) => {
                    return -a.IDUser + b.IDUser
                })
            }
            setData(dataTemp)
        })
    }, [flag])
    data.forEach((it) => {
        if (it.id == index) {
            dataUser = it
        }
    })
    // const setDataName = () => {
    //     const modifyData = rootRef.child(`${dataUser.id}`).update({
    //         name: dataUser.name,
    //         bedId: dataUser.bedId
    //     });
    //     setShow(false)
    // }
    // Calib velocity
    const setCalib = () => {
      rootRef.child(`${dataUser.id}`).get().then((snapshot) => {
        rootRef.child(`${dataUser.id}`).update({
          calibVelo: snapshot.val().velo,
          isCalib: true
        });
        alert( "Đã thiết lập tốc độ cảnh báo ")
      }).catch((e)=>{
        console.log(e);
      })
    }
       //SetUp for Option2
       const[chooseData,setChooseData] = useState('Vd: Nước cất,..');
       const[ModeVisible, setModeVisible] = useState(false);
       const changeModeVisible = (bool) =>{
             setModeVisible(bool)
       };

       const setDT = (option) => {
           setChooseData (option)
       };
       const[volume,setVolume] = useState();


       

    return (

        <View style={styles.container}>
          
                <View style={styles.order}>
                    <TouchableOpacity 
                        style={{ flexDirection: 'row' }} 
                        onPress={() => { setFlag(!flag) }} 
                            >
                            <Text style={{ color: 'gray', marginTop: 3 }}>Sắp xếp</Text>
                            <MCIcons name={'menu-swap'} size={25} color={'gray'} />
                    </TouchableOpacity>
                </View>
                
                <View style={{ backgroundColor: '#f5f5f5', height: 13 }}></View>
                <View style={{ alignItems: 'center', width: "100%", marginBottom: 50 }}>
                    <FlatList
                        data={data}
                        renderItem={(it,) => {
                            return (<List data={it.item}></List>)

                        }}
                        keyExtractor={item => item.id}
                    />
                </View>
             
          
          
                 {/* <Modal
                    isVisible={show}
                    animationIn="slideInLeft"
                    animationOut="slideOutRight"
                    onRequestClose = {()=>setShow(false)}
                    style={{
                        height: 800,
                    }}
                >
                    <View style={styles.modals}>
                        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 10 }}>
                            <TouchableOpacity onPress={() => setShow(false)} style={{ alignItems: 'flex-end' }}>
                                <MCIcons name={'close-octagon-outline'} size={30} color={'#0AC4BA'} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 25, fontWeight: 'bold',color:'black' }}>Thông tin bệnh nhân</Text>
                        </View>

                        <View > 
                            <TextInput
                                // label='Tên'
                                mode='outlined'
                                onChangeText={text => dataUser.name = text}
                                placeholder={dataUser.name}
                                maxLength ={5}
                            />
                        </View>
                        <View>
                            <TextInput
                                label='Giường Bệnh'
                                mode='outlined'
                                onChangeText={text => dataUser.bedId = text}
                                placeholder={dataUser.bedId}
                                maxLength = {3}
                            />
                        </View>
                        
                        <Text style={{fontSize:25, fontWeight: 'bold',color :'black' }}>Thông tin bình truyền dịch</Text>

                        <TextInput
                            label={'Thể tích (ml)'}
                            keyboardType = 'numeric'
                            mode = 'outlined'
                            onChangeText={(text) => setVolume(text)}
                            placeholder = {volume}
                        />
            
                        <View style ={{flexDirection : 'row'}} >
                            <Text style={styles.textInput}>Loại dung dịch : </Text> 
                        <View style={styles.ViewInput}>
                            <View>
                                <TouchableOpacity
                                    onPress={() => changeModeVisible(true)}
                                >
                                    <Text style={styles.textSolut}>{chooseData}</Text>
                                </TouchableOpacity>
                                <Modal
                                    transparent = {true}
                                    animationIn = 'slideInDown'
                                    animationOut= 'slideInUp'
                                    isVisible  = {ModeVisible}
                                    onRequestClose = {() => changeModeVisible(false)}
                                >
                                    <ModalPicker
                                        changeModeVisible ={changeModeVisible}
                                        setData = {setDT}
                                    />
                                </Modal>
                            </View>
                        </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 8, }}>
                            <Text style={{ fontSize: 15, marginTop: 10, fontWeight:'bold',color: 'black', }}>Tốc độ chảy:  </Text>
                            <Text style={{ fontSize: 15, marginTop: 10 ,color : 'red', }}>{dataUser.velo} giọt/phút</Text>
                                <TouchableOpacity style={styles.buttonCalib} onPress={setCalib}>
                                    <Text style={styles.textCalib}>Hiệu chuẩn</Text>
                                </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center', marginVertical: 20, }}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#0AC4BA', '#2BDA8E']} style={{ borderRadius: 10 }}>
                                <TouchableOpacity style={{ width: 250, height: 50, alignItems: 'center', justifyContent: 'center' }} onPress={setDataName}>
                                    <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>Đồng ý</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    </View>
                </Modal>  */}

         </View >
       
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    setZero: {
        marginLeft: 60,
        width: 100,
        height: 30,
        borderRadius: 5
    },
    setZero1: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    order: {
        paddingRight: 15,
        paddingVertical: 8,
        width: width,
        alignItems: 'flex-end',
        backgroundColor: 'white',
    },
    title: {
        width: width * 0.9,
        borderWidth: 2,
        flexDirection: 'row',
        height: 80,
        justifyContent: 'space-around',
      //  alignItems: 'center',
        paddingLeft: 15,
        borderRadius: 10,
        backgroundColor: '#2BDA8E',

    },
    titleWarning: {
        width: width * 0.9,
        borderWidth: 2,
        flexDirection: 'row',
        height: 80,
        justifyContent: 'space-around',
       // alignItems: 'center',
        paddingLeft: 10,
        borderRadius: 10,
        backgroundColor:'#FDAC5A',


    },

    header: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        marginTop : 8,
        marginBottom: 10,
    },
    datas: {
        flexDirection: 'row',
    },
    data: {
        marginHorizontal: 15,
        alignItems: 'center',
        
    },
    warningTime: {
        color: '#D01C1C',
        fontSize: 18
    },
    warningTimeNo: {
        color: 'brown',
        fontSize: 18
    },
    warningDrop: {
        margin: 2,
        borderRadius: 10,
        backgroundColor: '#d3e0ea',
    },
    warningDropNo: {
        backgroundColor: '#f6f5f5',
        margin: 2,
        borderRadius: 10,
    },
    modals: {
        flexDirection: 'column',
        backgroundColor: 'white',
        //width : 350,
        height: 500,

        padding: 20,
        borderRadius: 20,
        borderWidth : 2,
    },
    buttonCalib: {
      borderRadius:10,
      marginLeft:10,
      marginTop:5,
      backgroundColor:'#0AC4BA',
      width: 120, 
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonWithoutCalib: {
      borderRadius:10,
      marginLeft:10,
      marginTop:5,
      backgroundColor:'#0AC4BA',
      width: 120, 
      height: 30,
      alignItems: 'center',
      justifyContent: 'center'
    },
    ViewInput : {
      backgroundColor : 'white',
      height : 60,
      width : 160,
      marginTop: 10,
      borderRadius: 5,
      borderColor : 'grey',
      borderWidth: 1.5,
      marginLeft : 2,
    

    },
 
    textSolut :{
        fontWeight :'normal',
        fontSize : 14,
        marginLeft : 12,
        marginTop : 15,
        justifyContent : 'center',
        textAlign : 'center',
    },
    textInput : {
        fontWeight :'bold',
        fontSize : 20,
       // marginLeft : 2,
        marginTop : 25,
        justifyContent : 'center',
        color: 'black',
    },

    textCalib: { fontSize: 15, color: '#fff', fontWeight: 'bold' },
    textWithoutCalib: { fontSize: 15, color: '#000', fontWeight: 'bold' },
})
//export default Dashboard = React.memo(Dashboardmemo)
export default DashBoard;
