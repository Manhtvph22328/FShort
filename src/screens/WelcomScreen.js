import { View, Image } from 'react-native'
import React,{useEffect} from 'react'

const WelcomScreen = ({navigation}) => {

    useEffect(() => {
        const timer = setTimeout(() => {
          navigation.replace('OnBoard'); 
        }, 3000);
        return () => clearTimeout(timer); 
    }, [navigation]);

  return (
    <View>
      <Image source={require('../assets/welcome.jpg')} 
      style={{height:'100%',width:'100%'}}></Image>
    </View>
  )
}

export default WelcomScreen