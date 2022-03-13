import React, { useState, useEffect, useContext } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Image,
    Text,
    Dimensions,
    ScrollView,
    Button,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    Pressable,
    Picker,
    Alert,
} from 'react-native';
import {
  Appbar,
  DarkTheme,
  DefaultTheme,
  Provider,
  Surface,
  ThemeProvider,
} from 'react-native-paper' ;
import DropDown from "react-native-paper-dropdown";
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from "react-native-vector-icons/FontAwesome5"
import Icon2 from "react-native-vector-icons/Ionicons"
import firebase from '../database/config'
import Modal from 'react-native-modal';
import { TextInput } from 'react-native-paper'
import { AuthContext } from '../navigations/AuthContext'
import LinearGradient from 'react-native-linear-gradient'
import { createIconSetFromFontello } from 'react-native-vector-icons';
import {ModalPicker} from './ListSolut/ModalPicker';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


const Information = ({navigation, route})=>{
  const rootRef = firebase.database().ref(route.params.dataId);
  const animalRef = rootRef.child('/').orderByKey();
  const [nameIf,setNameIf]     = useState();
  const [bedIDIf,setBedIDIf]   = useState();
  const [IDUserIf,setIDUserIf] = useState();
  const [voluIf,setVoluIf]     = useState();
  const [time,setTime]     = useState();
  const [velo,setVelo]     = useState();
  const [calibVelo,setCalibVelo]     = useState();
  const [dataId,setDataId]     = useState();
  
            const onPressDone =() =>{
              rootRef.update({
                 name: nameIf,
                 IDUser: IDUserIf,
                 bedId:bedIDIf,
                 volu:voluIf,
                 solution:chooseData,
              }).catch((e)=>{
                console.log(e);
              })
              
              navigation.navigate('Dash')
            }
            const onPressSetting =() => {
              rootRef.get().then((snapshot)=>{
                rootRef.update({
                  calibVelo: snapshot.val().velo,
                  isCalib: true,
                })
              });
             
                Alert.alert('Thông báo','Đã thiết lập vận tốc chảy',[
                  {text:'OK',}
                ])
            }
            useEffect(()=>{
              rootRef.get().then((snapshot)=>{
              //  setNameIf(snapshot.val().name)
                
              }).catch((e)=>{
                console.log(e);
              })
              animalRef.on('value', (child) => {
                if(IDUserIf != child.val().IDUser){
                  setIDUserIf(child.val().IDUser)
                }
                if(nameIf != child.val().name){
                  setNameIf(child.val().name)
                }
                if(bedIDIf != child.val().bedId){
                  setBedIDIf(child.val().bedId)
                }
                if(voluIf != child.val().volu){
                  setVoluIf(child.val().volu)
                }
               
                setVelo(child.val().velo)
                setTime(child.val().time)
                setCalibVelo(child.val().calibVelo)
                
              })
              return () => {
                return false;
            }
            },[])
          
            const[chooseData,setChooseData] = useState(route.params.solutionIf);
            const[ModeVisible, setModeVisible] = useState(false);
            const changeModeVisible = (bool) =>{
                  setModeVisible(bool)
            };
            const setDT = (option) => {
              setChooseData (option)
              };
            
           


           
           
           
          // Calib velocity
          
  return(
    <ScrollView>

    
    <View >
      <View style={styles.header}>
        <Text style={styles.textHeader}>
          Thông tin bệnh nhân :
        </Text>
      </View>
      <View style={{flexDirection:'row-reverse'}} > 
        <View style={{height:50,width:'70%',alignItems:'center',justifyContent:'center'}} >
          <TextInput
            label={'Mã bệnh nhân'}
            mode = "outlined"
            onChangeText={(text) => setIDUserIf(text)}
            placeholder = {IDUserIf}
            value={IDUserIf}
            style ={{textAlign:'center',width:"80%",height:40,}}
            />
        </View>
        <View style={{flex: 1,alignItems:'center',justifyContent:'center'}}>
          <Icon
            name={"id-card"}
            size ={35}
            color = {'#2BDA8E'}
            />
        </View>
      </View >
      
      <View style={{flexDirection:'row-reverse'}} > 
        <View style={{height:50,width:'70%',alignItems:'center',justifyContent:'center'}}>
          <TextInput
            label={'Tên'}
            mode = "outlined"
            onChangeText={(text) => setNameIf(text)}
            placeholder = {nameIf}
            value={nameIf}
            style ={{textAlign:'center',width:"80%",height:40,}}
            />
        </View>
        <View style={{flex: 1,alignItems:'center',justifyContent:'center'}}>
          <Icon
            name={"hospital-user"}
            size ={35}
            color = {'#2BDA8E'}
            />
        </View>
      </View >
      <View style={{flexDirection:'row-reverse'}} >
        <View style={{height:50,width:'70%',alignItems:'center',justifyContent:'center'}}>
          <TextInput
            label={'Giường Bệnh '}
            mode = "outlined"
            onChangeText={(text) => setBedIDIf(text)}
            placeholder = {bedIDIf}
            value={bedIDIf}
            style ={{textAlign:'center',width:"80%",height:40,}}
            />
        </View>
        <View style={{flex: 1,alignItems:'center',justifyContent:'center'}}>
          <Icon
            name={"bed"}
            size ={35}
            color = {'#2BDA8E'}
            />
        </View>
      </View >

      <View style={styles.header2}>
        <Text style={styles.textHeader}>
          Thông tin bình truyền :
        </Text>
      </View>

      <View style={{flexDirection:'row-reverse'}} > 
        <View style={{height:50,width:'70%',alignItems:'center',justifyContent:'center'}}>
          <TextInput
            label={'Thể Tích (ml)'}
            mode = "outlined"
            onChangeText={(text) => setVoluIf(text)}
            placeholder = {voluIf}
            value={voluIf}
            style ={{textAlign:'center',width:"80%",height:40,}}
            />
        </View>
        <View style={{flex: 1,alignItems:'center',justifyContent:'center'}}>
          <Icon
            name={"prescription-bottle"}
            size ={35}
            color = {'#2BDA8E'}
            />
        </View>
      </View >

      <View style={{flexDirection:'row-reverse'}} >
          <View style={{height:50,width:'70%',alignItems:'center',justifyContent:'center'}}>
              <TouchableOpacity
                onPress={() => changeModeVisible(true)}
                style ={{width:"80%",height:40,backgroundColor:'#2BDA8E',borderWidth:1,borderColor:'grey',borderRadius:5,}}
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
          <View style={{flex: 1,alignItems:'center',justifyContent:'center'}}>
            <Icon
              name={"prescription-bottle-alt"}
              size ={35}
              color = {'#2BDA8E'}
              />
        </View>
       </View>

       <View style={{flexDirection:'row-reverse'}} > 
        <View style={{height:50,width:'70%',alignItems:'center',justifyContent:'center'}}>
          <View style ={{width:"80%",height:40,borderWidth:1,borderColor:'grey',borderRadius:5,alignItems:'center',justifyContent:'center',backgroundColor:'#2BDA8E',}}>
            <Text style={{color:'#D01C1C',fontSize:16,fontWeight:'bold'}}>
            {time}  (phút)
            </Text>
          </View>
        </View>
        <View style={{flex: 1,alignItems:'center',justifyContent:'center'}}>
          <Icon2
            name={"time"}
            size ={35}
            color = {'#2BDA8E'}
            />
        </View>
      </View >

       <View style={{flexDirection:'row-reverse'}} > 
        <View style={{height:50,width:'70%',alignItems:'center',justifyContent:'center'}}>
          <View style ={{width:"80%",height:40,borderWidth:1,borderColor:'grey',borderRadius:5,alignItems:'center',justifyContent:'center',backgroundColor:'#2BDA8E',}}>
            <Text style={{color:'#D01C1C',fontSize:16,fontWeight:'bold'}}>
            {velo}  (giọt/phút)
            </Text>
          </View>
        </View>
        <View style={{flex: 1,alignItems:'center',justifyContent:'center'}}>
          <Icon2
            name={"speedometer"}
            size ={35}
            color = {'#2BDA8E'}
            />
        </View>
      </View >

      <View style={{flexDirection:'row-reverse'}} > 
        <View style={{height:50,width:'70%',alignItems:'center',justifyContent:'center'}}>
          <View style ={{width:"80%",height:40,borderWidth:1,borderColor:'grey',borderRadius:5,alignItems:'center',justifyContent:'center',backgroundColor:'#2BDA8E',}}>
            <Text style={{color:'#D01C1C',fontSize:16,fontWeight:'bold'}}>
            {calibVelo}  (giọt/phút)
            </Text>
          </View>
        </View>
        <View style={{flex: 1,alignItems:'center',justifyContent:'center'}}>
          <View style={{flex: 1,alignItems:'center',flexDirection:'row',marginLeft:'13%'}}>
            <Icon2
              name={"speedometer"}
              size ={35}
              color = {'#2BDA8E'}
              />
              <Icon2
              name={"settings"}
              size ={15}
              color = {'#2BDA8E'}
              />
          </View>
        </View>
      </View >


      <View style={{flexDirection:'row',height:50,marginTop:15,}}>
        <View style={{alignItems:'center',justifyContent:'center',width:"40%",}}>
          <TouchableOpacity
            style={{backgroundColor:'deepskyblue',width:"70%",height:50,alignItems:'center',justifyContent:'center',borderRadius:10,}}
            onPress={onPressSetting}
            >
            <Text style={{fontSize:16,fontWeight:'bold',color:'white'}}>
              Hiệu Chuẩn 
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems:'center',justifyContent:'center',width:"60%"}}>
          <TouchableOpacity
            style={{backgroundColor:'deepskyblue',width:"70%",height:50,alignItems:'center',justifyContent:'center',borderRadius:10,}}
            onPress ={onPressDone}
            >
            <Text style={{fontSize:16,fontWeight:'bold',color:'white'}}>
              Xong
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
         
      
      
    </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  header : {
    height: HEIGHT/15,  //HEIGHT = 720
    justifyContent: 'center',
    backgroundColor: '#2BDA8E',
  },
  header2 : {
    height: HEIGHT/15,  //HEIGHT = 720
    justifyContent: 'center',
    backgroundColor: '#2BDA8E',
    marginTop : 5,
  },
  textHeader:{
    fontSize : 20,
    fontWeight: 'bold',
    marginLeft : 15,
  },
  body :{
    alignItems: 'center',
    justifyContent: 'space-around',
    height : 60,
    width : '100%',
    marginTop : 10,
    padding: 10,
    flexDirection: 'row-reverse'
  },
  bodySolut:{
    alignItems: 'center',
    justifyContent: 'space-around',
    height : 60,
    marginTop : 10,
    padding: 10,
    flexDirection: 'reverse'

  },
  TextInput: {
    width: "50%",
    textAlign: 'center',
  },
  Text :{
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
  },
  spacerStyle: {
    marginBottom: 15,
  },
  safeContainerStyle: {
    flex: 1,
    margin: 20,
    justifyContent: "center",
  },
  containerStyle: {
    flex: 1,
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
      fontWeight :'bold',
      fontSize : 14,
     // marginLeft : 12,
      alignItems :'center',
      marginTop : 10,
      justifyContent : 'center',
      textAlign : 'center',
      color: '#D01C1C',
  },
  textInput : {
      fontWeight :'bold',
      fontSize : 20,
     // marginLeft : 2,
      marginTop : 25,
      justifyContent : 'center',
      color: 'black',
  },
})
export default Information ;

