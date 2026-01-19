import { Assets } from '@react-navigation/elements';
import { View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: 'white'
      
      }}
    >
      

<Image style={{height: 20, width: 20,
       alignSelf: 'flex-start', marginLeft:10 }}
        source={require('../assets/images/back.png')}/>


  <View  
      style={{flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center', marginTop: '20'}} >
        <Text>English (US)  </Text>
     <Image style={{height: 20, width: 20 }} source={require('../assets/images/down.png')}/>
    
  </View>   
     

     
    <Image style={{height: 70, width: 70, marginVertical: 30 }}source={require('../assets/images/facebook.png')}/>

    <TextInput  placeholder= "Mobile number or email" 
    
    style={{backgroundColor: 'white',
      height: 65, width: 350,
      paddingHorizontal: 15,
      borderColor: '#CED0D4',
      borderRadius: 20,
      borderStyle: 'solid',
      borderWidth: 1
      
    }}/>
    <TextInput 
  placeholder= "Password"  placeholderColor="#8A8D91"
    
    style={{backgroundColor: 'white',
      height: 65, width: 350,
      paddingHorizontal: 15,
      borderColor: '#CED0D4',
      borderRadius: 20,
      borderStyle: 'solid',
      borderWidth: 1,  
      marginTop: -20
  
  }}/>

      <TouchableOpacity  
  style={{backgroundColor: '#1877f2',
      height: 55, width: 350,
      paddingHorizontal: 15,
      borderColor: '#CED0D4',
      borderRadius: 30,
      borderStyle: 'solid',
      borderWidth: 1,  
      marginTop: -20 , 
      alignItems: 'center',
      justifyContent:'center'
  }}>
<Text style={{color: 'white'}}>Login</Text>
</TouchableOpacity>
    

    <Text style={{fontWeight: 'bold', fontSize: 15, marginTop: -30}}>Forgot password?</Text>

    <TouchableOpacity 
style={{backgroundColor: 'white',
      height: 55, width: 320,
      paddingHorizontal: 15,
      borderColor: '#1877f2',
      borderRadius: 30,
      borderStyle: 'solid',
      borderWidth: 1.5,  
      marginTop: 20 , 
      alignItems: 'center',
      justifyContent:'center'  

}}>
      <Text style={{color: '#1877f2', fontWeight:'600'}}>Create new account</Text>
      </TouchableOpacity>




<View  
      style={{flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center', marginBottom: '20'}} >

  <Image style={{height: 25, width: 25, marginRight:5 }} source={require('../assets/images/meta.png')}/>
        <Text style={{fontSize: 20, fontWeight:'500'}}>Meta</Text>
    
    
  </View> 

    </SafeAreaView>
  )
}
