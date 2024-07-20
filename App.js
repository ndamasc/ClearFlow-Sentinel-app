import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, Linking, useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { getDatabase, onValue, DataSnapshot, ref } from 'firebase/database';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ITEMS_PER_PAGE = 12;


const firebaseConfig = {
    apiKey: "AIzaSyBfo80E3UuaXzFiWthF07QVcGrqLD7cwr8",
    authDomain: "sist-react.firebaseapp.com",
    databaseURL: "https://sist-react-default-rtdb.firebaseio.com",
    projectId: "sist-react",
    storageBucket: "sist-react.appspot.com",
    messagingSenderId: "174893528876",
    appId: "1:174893528876:web:d504fb1ca637bd46ca9e89",
};

const firebase_app = initializeApp(firebaseConfig);
const auth  = getAuth(firebase_app);


const LoginScreen = ({setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');


  const signIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      await AsyncStorage.setItem('loggedInUser', email);
      alert('Autenticação verificada!');
      setIsLoggedIn(true);
    } catch (error) {
      if (error.code === 'auth/invalid-login-credentials') {
        // Defina a mensagem de erro para credenciais inválidas
        alert('Email e/ou senha inválidos!');
      } else {
        // Defina a mensagem de erro padrão para outros erros
        alert('Falha na autenticação: ' + error.message);
        console.log(error);
      }
    }
    
  };

   const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View style={styles.container}>
      <Image source={require("./imagens/icon.png")} style={styles.logo} />   
        <TextInput
            style={styles.input2}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Senha"
            secureTextEntry={!passwordVisible}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.toggleButton}>
            <Entypo name={passwordVisible ? "eye-with-line" : "eye"} size={20} color="black" />
          </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={signIn}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};


const HomeScreen = () => {

  const { width, height } = useWindowDimensions();

  const [userData, setUserData] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase();
        const dbRef = ref(db, '/Users/4'); // Referência ao nó '/User/3' no banco de dados
        console.log('Recebendo dados...');

        onValue(dbRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            // Obtemos as chaves dos nós filhos e selecionamos o último
            const latestChildKey = Object.keys(data).pop();
            const latestChildData = data[latestChildKey];
            setUserData(latestChildData); // Atualizando o estado com os dados recebidos
            console.log('Dados recebidos:', latestChildData);
          } else {
            console.error('Nenhum dado encontrado.');
          }
        });
      } catch (error) {
        console.error('Erro ao buscar dados:', error.message);
      }
    };

    fetchData();
  }, []);

  const userIds = Object.keys(userData);


return (
  <ScrollView contentContainerStyle={{...styles.scrollContainer, backgroundColor: "#131d2f", height: height}}> 

          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Leitura dos sensores</Text>
          </View>  
      
      <View style={{...styles.caixaContainer, backgroundColor: '#131d2f', borderTopLeftRadius: 50, borderTopRightRadius:50}}>
            <View style={styles.caixa}>
                <Text style={styles.title2}>Temperatura</Text>
                <Image source={require("./imagens/temperatura.png")} style={styles.imagemNaCaixa2} />
                <Text style={styles.textoNaCaixa}>{userData.tempAgua} °C </Text>
            </View>
            <View style={styles.caixa}>
              <Text style = {styles.title2}> Alcalinidade </Text>
              <Image source={require("./imagens/medidor-de-ph.png")} style={styles.imagemNaCaixa} />
              <Text style={styles.textoNaCaixa}>{userData.ph} </Text>
            </View>
            

          </View>
        </ScrollView>
        
        );
      };



const LoraInfo = () => {

  const { width, height } = useWindowDimensions();

  const [userData, setUserData] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase();
        const dbRef = ref(db, '/Users/4'); // Referência ao nó '/User/3' no banco de dados
        console.log('Recebendo dados...');

        onValue(dbRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            // Obtemos as chaves dos nós filhos e selecionamos o último
            const latestChildKey = Object.keys(data).pop();
            const latestChildData = data[latestChildKey];
            setUserData(latestChildData); // Atualizando o estado com os dados recebidos
            console.log('Dados recebidos:', latestChildData);
          } else {
            console.error('Nenhum dado encontrado.');
          }
        });
      } catch (error) {
        console.error('Erro ao buscar dados:', error.message);
      }
    };

    fetchData();
  }, []);

      const userIds = Object.keys(userData);

      return(
        <ScrollView contentContainerStyle={{...styles.scrollContainer, height: height, backgroundColor: "#131d2f"}}>   
    
                <View style={styles.headerContainer}>
                  <Text style={styles.headerText}>Informações Técnicas</Text>
                </View>
                <View style={[styles.caixa10, { height: height * 0.085 }]}>
                    <Text style = {styles.title6}>RSSI - Received Signal Strength Indication</Text>
                    <Text style = {styles.title4}>• {userData.rssi} dBm</Text>
                </View>
                <View style={[styles.caixa2, { height: height * 0.085}]}>
                    <Text style = {styles.title6}>Package Loss</Text>
                    <Text style = {styles.title4}>• {userData.packloss} % </Text>
                </View>        
                <View style={[styles.caixa2, { height: height * 0.085 }]}>
                    <Text style = {styles.title6}>SF - Spreading Factor</Text>
                    <Text style = {styles.title4}>• 12</Text>
                </View> 
                <View style={[styles.caixa2, { height: height * 0.085 }]}>
                    <Text style = {styles.title6}>Code Rate</Text>
                    <Text style = {styles.title4}>• 4/5</Text>
                </View>
                <View style={[styles.caixa2, { height: height * 0.085 }]}>
                    <Text style = {styles.title6}>SNR - Signal to Noise</Text>
                    <Text style = {styles.title4}>• {userData.snr} dB</Text>
                </View>
                <View style={[styles.caixa2, { height: height * 0.085 }]}>
                    <Text style = {styles.title6}>BandWidth </Text>
                    <Text style = {styles.title4}>• 125 KHz</Text>
                </View>
                 

        </ScrollView>
      );
    };

    const GraphScreen = () => {
        const [userData, setUserData] = useState('');
        const [currentPage, setCurrentPage] = useState(1);

        const { width, height } = useWindowDimensions();
        
        useEffect(() => {
          const fetchData = async () => {
            try {
              const db = getDatabase();
              const dbRef = ref(db, '/Users/4'); // Referência ao nó '/User' no banco de dados
              console.log('Recebendo dados...');
      
              // Obtendo os dados do banco de dados Firebase
              onValue(dbRef, (snapshot) => {
                const data = snapshot.val();
                const reversedUserIds = Object.keys(data).reverse();
              setUserData(reversedUserIds.reduce((acc, userId) => {
                acc[userId] = data[userId];
                return acc;
              }, {}));
            });
          } catch (error) {
            console.error('Erro ao buscar dados:', error.message);
          }
        };
      
        fetchData();
      }, []);
    
      const userIds = Object.keys(userData);
      const totalPages = Math.ceil(userIds.length / ITEMS_PER_PAGE);
    
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
    
      // Dados a serem exibidos na página atual
      const currentPageData = userIds.slice(startIndex, endIndex);
    
      // Função para navegar para a próxima página
      const nextPage = () => {
        setCurrentPage(currentPage + 1);
      };
    
      // Função para navegar para a página anterior
      const prevPage = () => {
        setCurrentPage(currentPage - 1);
      };
    
      return (
        <ScrollView contentContainerStyle={{...styles.scrollContainer, backgroundColor: "#131d2f", height: height,horizontal: false}}>   
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Histórico</Text>
          </View>  
    
          
          <View style={{...styles.caixaContainer, backgroundColor: '#131d2f', borderTopLeftRadius: 50, borderTopRightRadius:50}}>
            <View style={styles.table}>
              <View style={styles.row}>
                <Text style={styles.headerCell1}>Data</Text>
                <Text style={styles.headerCell1}>Temperatura</Text>
                <Text style={styles.headerCell1}>PH</Text>
                

              </View>
              {currentPageData.map((userId) => (
                <View style={styles.row} key={userId}>
                  <Text style={styles.cell}>{userId}</Text>
                  <Text style={styles.cell}>{userData[userId].tempAgua}</Text>
                  <Text style={styles.cell}>{userData[userId].ph}</Text>
                  

                </View>
              ))}
            </View>
    
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity onPress={prevPage} disabled={currentPage === 1}>
                <Text style={{ marginTop: 20, fontSize: 20, color: currentPage === 1 ? '#999' : '#ffffff' }}>Voltar </Text>
              </TouchableOpacity>
              <Text style={{ color: '#ffffff' ,fontSize: 20, fontWeight: '800', marginTop: -14}}>{`${currentPage} de ${totalPages}`}</Text>
              <TouchableOpacity onPress={nextPage} disabled={endIndex >= userIds.length}>
                <Text style={{ marginTop: 20, fontSize: 20, color: endIndex >= userIds.length ? '#999' : '#ffffff' }}> Próxima</Text>
              </TouchableOpacity>
            </View>
    
            
          </View>
        </ScrollView>
      );
    };






const SettingsScreen = ({ setIsLoggedIn }) => {

  const { width, height } = useWindowDimensions();

  const signOutApp = async () => {
    try {
      const response = await signOut(auth);
      console.log(response);
      console.log(setIsLoggedIn)
      alert('Logout realizado com sucesso!');
      
      setIsLoggedIn(false);
    } catch (error) {
      alert('Falha na autenticação: ' + error.message);
      console.log(error);
    }
  };

  const [loggedInUser, setLoggedInUser] = useState(null);


  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        const user = await AsyncStorage.getItem('loggedInUser');
        setLoggedInUser(user);
      } catch (error) {
        console.log(error);
      }
    };

    getLoggedInUser();
  }, []);


 
  return(
    <ScrollView contentContainerStyle={{...styles.scrollContainer, height: height, backgroundColor: "#131d2f"}}>   

            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Informações</Text>
              
            </View>           
              <View style={{...styles.caixaContainer, backgroundColor: '#131d2f', borderTopLeftRadius: 50, borderTopRightRadius:50}}>
                <View style={[styles.caixa3, { height: height * 0.05 }]}>
                  <Image source={require("./imagens/user.jpg")} style={styles.imagemTopico} />
                  <Text style = {styles.title1}>Usuário: </Text>
                  <Text style = {{...styles.title4, color: '#5e81bf'}}>{loggedInUser} </Text>
                 
                </View>

                <Button title='Logout' onPress={signOutApp}></Button>

                <View style={[styles.caixa8, { height: height * 0.2 }]}>
                  <View style={styles.boxOnbox}>
                    <Image source={require("./imagens/tool.jpg")} style={styles.topicoCaixa} />
                    <Text style = {styles.title8}>Como funciona? </Text>
                  </View>
                  <View style={styles.boxOnbox2}>
                    <Text style = {styles.title9}>O sistema é composto por um microcontrolador e por três sensores em campo. As leituras dos sensores são feitas várias vezes ao dia. O microcontrolador recebe os dados coletado e em seguida envia os dados atráves da comunicação LoRa P2P.</Text>
                  </View>
                </View>

                <View style={[styles.caixa2, { height: height * 0.1 }]}>
                  <View style={styles.boxOnbox}>
                    <Image source={require("./imagens/local-na-rede-internet.png")} style={styles.topicoCaixa3} />
                    <Text style={styles.title3}>Link para o Firebase </Text>
                  </View>
                  <View style={styles.boxOnbox3}>
                    <Text style={{ ...styles.title4, color: '#5e81bf', textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://sist-react-default-rtdb.firebaseio.com')}>https://sist-react-default-rtdb.firebaseio.com </Text>
                  </View>
                </View>

                  <Text style = {styles.title5}>Parâmetros dos sensores </Text>

                  <View style={[styles.caixa2, { height: height * 0.1 }]}>
                    <Text style = {styles.title6}>i. Sensor DS18B20 - Temperatura</Text>
                    <Text style = {styles.title4}>• Normal: até 31°C  </Text>
                  </View>

                  <View style={[styles.caixa2, { height: height * 0.1 }]}>
                    <Text style = {styles.title6}>ii. Sensor PH4502c - pH </Text>
                    <Text style = {styles.title4}>• Normal: 5 a 9</Text>
                  </View>

                  

          </View>
   
        </ScrollView>
      );
    };


    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();

    const LoginStack = ({ setIsLoggedIn }) => (
      <Stack.Navigator>
        <Stack.Screen name="Login" options={{headerShown: false}}>
          {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
      </Stack.Navigator>
    );

    const MainTabs = ({setIsLoggedIn}) => (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ focused, size, color }) => {
                if (focused) {
                return <Ionicons size={22} color={color} name="document" />;
                }
                return <Ionicons size={22} color={color} name="document-outline" />;
            },
            }} />

        <Tab.Screen name="Graficos" component={GraphScreen}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ focused, size, color }) => {
                if (focused) {
                return <AntDesign name="table" size={22} color="#5772ff" />;
                }
                return <AntDesign name="table" size={22} color="grey" />;
            },
          }}></Tab.Screen>


        <Tab.Screen name="Lora" component={LoraInfo}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ focused, size, color }) => {
                if (focused) {
                return <MaterialCommunityIcons name="router-wireless" size={26} color="#5772ff" />;
                }
                return <MaterialCommunityIcons name="router-wireless" size={26} color="grey" />;
            },
          }}></Tab.Screen>
        
        
        <Tab.Screen name="Configurações"
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ focused, size, color }) => {
                if (focused) {
                    return <Ionicons name="information-circle" size={24} color="#5772ff" />;
                }
                return <Ionicons size={size} color={color} name="information-circle-outline" />;
            },
        }}>
        {() => <SettingsScreen setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>
    
      </Tab.Navigator>
  );    


    const App = () => {
      const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    
      return (
        <NavigationContainer>
          {isLoggedIn ? (
            <MainTabs setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <LoginStack setIsLoggedIn={setIsLoggedIn} />
          )}
          <StatusBar style="auto" />
        </NavigationContainer>
        
      );
    };
    
    
    export default App;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#131d2f",   //#131d2f
    alignItems: 'center',
    justifyContent: 'center',
  },
  input2: {
    backgroundColor: "#F3F3F3",
    width: "80%",
    height: 50,
    marginBottom: 20,
    borderRadius: 30,
    paddingHorizontal: 20,
    borderColor: '#bdcbce',
    borderWidth:4
  },
  buttonText: {
    color: "#30668B",
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: "#F3F3F3",
    width: "30%",
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    borderColor: "#bdcbce",
    borderWidth: 4,
  },
  logo: {
    marginBottom: 50,
    height: 210,
    width: 210,
    backgroundColor: "#F3F3F3",
    marginTop: -75
  },
  imagemTopico: {
    width: 40,
    height: 35,
    marginRight: -3,

  },
  headerContainer: {
    backgroundColor: '#B0C4DE', //#e6eefd
    width: "100%",
    height: 110,
    justifyContent: 'center',
    alignItems: 'flex-start',

  },
  headerText: {
    color: '#000000', // Cor do texto do cabeçalho
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    width: "100%",
    marginBottom: -70,    // para ajustar aonde fica a palavra
    textAlign: 'center',
    textShadowColor: 'rgba(124, 149, 190, 1)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,

},
  caixaContainer: {
    flex:2,
    marginTop:30,
    backgroundColor : 'red',
    height: 1100,
    borderTopLeftRadius: 20 ,
    borderTopRightRadius: 20,
    padding: 10,
    flexDirection: 'row', // Dispor os itens lado a lado
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap', // Quebrar linha se não houver espaço suficiente
  },
  caixaContainer2: {
    flex:2,
    marginTop:30,
    backgroundColor : 'red',
    height: 1200,
    height: 700,
    borderTopLeftRadius: 20 ,
    borderTopRightRadius: 20,
    padding: 10,
    flexDirection: 'row', // Dispor os itens lado a lado
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap', // Quebrar linha se não houver espaço suficiente
  },
  caixa3: {

    width: "90%",
    height: 'auto',
    backgroundColor: "#ffffff",   
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: 9,
    borderColor: "#d7dfe1",  //#DCDCDC
    borderWidth: 4,
    flexDirection: 'row',
    marginBottom: 15,
  },
  caixa4: {
    marginTop: 20,
    margin: 10,
    width: "90%",
    height: 120,
    backgroundColor: "#ffffff",   
    justifyContent: 'left',
    alignSelf: 'flex-end',
    borderRadius: 9,
    borderColor: "#d7dfe1",  //#DCDCDC
    borderWidth: 4,
    fontSize: 30,
    flexDirection: 'row',

  },
  caixa5: {
    marginTop: 20,
      margin: 10,
      width: "90%",
      height: 'auto',
      backgroundColor: "#ffffff",   
      alignItems: 'center',
      alignContent: 'space-between',
      justifyContent: 'left',
      alignSelf: 'flex-end',
      borderRadius: 9,
      borderColor: "#d7dfe1",  //#DCDCDC
      borderWidth: 4,
      textAlign: 'left',
      fontSize: 30,
      flexDirection: 'row',
  },

  title3: {
    fontSize: 18,
    fontFamily: 'Roboto', 
    color: "#273b5e",
    justifyContent: 'center',
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 8,
    
  },
  title4: {
    fontSize: 17,
    color: "#273b5e",
    marginLeft:10,
    alignItems: 'baseline',
    textAlign: 'justify',
    margin: -5,
    fontWeight: '500'
  },
  title7: {
    fontSize: 17,
    color: "#273b5e",
    marginLeft:10,
    alignItems: 'baseline',
    textAlign: 'justify',
    margin: 3,
    fontWeight: '500'
  },
  title8: {
    fontSize: 18,
    fontFamily: 'Roboto', 
    color: "#273b5e",
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 8,
    marginLeft: 3,
    fontWeight: '800',
  },
  title9: {
    fontSize: 17,
    color: "#273b5e",
    marginLeft:10,
    alignItems: 'flex-start',
    textAlign: 'justify',
    fontWeight: '500'
  },


  topicoCaixa: {
    width:  35,
    height: 35,
    
  },
  title1: {
    fontSize: 18,
    fontFamily: 'Roboto', 
    color: "#273b5e",
    justifyContent: 'center',
    alignItems: 'flex-start',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  headerContainer1: {
    flex:1,
    backgroundColor: '#e6eefd', // Cor de fundo do cabeçalho
    width: "100%",
    height: 130,
    justifyContent: 'center',
    alignItems: 'flex-start',

  },

  caixa: {
    margin: 30,
    width: "70%",
    height: 190,
    backgroundColor: "#f6f7f8",   
    alignItems: 'center',
    alignContent: 'space-between',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    borderRadius: 30,
    borderColor: "#bdcbce",  //#DCDCDC
    borderWidth: 4,
    textAlign: 'center',
    fontSize: 30,
  },
  title2: {
    fontSize: 22,
    color: "#273b5e",
    fontWeight: '500',
    alignContent: 'space-between',
    textAlign: 'justify',
    alignItems : 'flex-start',

  },
  textoNaCaixa: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#273b5e',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 7, 9, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  imagemNaCaixa2: {
    width: 80,
    height: 80,
    borderRadius: 15,
    marginBottom: 20,
    marginTop:10
  },
  imagemNaCaixa: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginBottom: 10,
  },
  table: {
    width: "90%",
    marginTop: 30,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#d7dfe1",
    backgroundColor: '#b5cacf',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 30,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
  },
  cell: {
    flex: 1,
    paddingVertical: 10,
    textAlign: 'center',
    color: '#555',
    fontSize:15
  },
  headerCell1: {
    flex: 1,
    paddingVertical: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    backgroundColor: '#f2f2f2',
    fontSize:15
  },
  caixa2: {
    marginTop: 20,
    margin: 10,
    width: "90%",
    height: 70,
    backgroundColor: "#ffffff",   
    alignItems: 'justify',
    alignContent: 'space-between',
    justifyContent: 'left',
    alignSelf: 'auto',
    borderRadius: 9,
    borderColor: "#d7dfe1",  //#DCDCDC
    borderWidth: 4,
    textAlign: 'left',
    fontSize: 30,
    marginHorizontal: 20,
    flexDirection: 'column', 
  },

  caixa10: {
    marginTop: 40,
    margin: 10,
    width: "90%",
    height: 70,
    backgroundColor: "#ffffff",   
    alignItems: 'justify',
    alignContent: 'space-between',
    justifyContent: 'left',
    alignSelf: 'auto',
    borderRadius: 9,
    borderColor: "#d7dfe1",  //#DCDCDC
    borderWidth: 4,
    textAlign: 'left',
    fontSize: 30,
    marginHorizontal: 20,
    flexDirection: 'column', 
  },

  caixa7: {
    marginTop: 20,
    margin: 10,
    width: "90%",
    height: 'auto',
    backgroundColor: "#ffffff",   
    alignItems: 'justify',
    alignContent: 'space-between',
    justifyContent: 'left',
    alignSelf: 'auto',
    borderRadius: 9,
    borderColor: "#d7dfe1",  //#DCDCDC
    borderWidth: 4,
    textAlign: 'left',
    fontSize: 30,
    marginHorizontal: 20,
    flexDirection: 'column', 
  },
  caixa8: {
    marginTop: 20,
    margin: 10,
    width: "90%",
    height: 'auto',
    backgroundColor: "#ffffff",   
    alignSelf: 'auto',
    borderRadius: 9,
    borderColor: "#d7dfe1",  //#DCDCDC
    borderWidth: 4,
    marginHorizontal: 20,
 
  },
  boxOnbox:{
    flexDirection: 'row',
    fontWeight: '900'
  },
  boxOnbox2:{
    flexDirection: 'row',
    textAlign: 'justify',
    marginLeft: 10,
    marginRight:10,
    marginBottom:10,
    marginTop: 5 ,
  },

  boxOnbox3:{
    flexDirection: 'row',
    textAlign: 'justify',
    marginLeft: 10,
    marginRight:10,
    marginBottom:10,
    marginTop: 10 ,
  },
  boxOnbox4:{
    flexDirection: 'column',
    textAlign: 'justify',
    marginLeft: 1,
    marginRight:10,
    marginBottom:10,
    marginTop: -5 ,
  },

  title6: {
    fontSize: 19,
    fontFamily: 'Roboto', 
    color: "#273b5e",
    justifyContent: 'center',
    alignItems: 'flex-start',
    textAlign: 'left',
    margin: 10,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  title5: {
    fontSize: 27, 
    color: "#e6eefd",
    justifyContent: 'center',
    alignItems: 'flex-start',
    textAlign: 'left',
    margin: 10,
    fontWeight: 'bold',
    textShadowColor: 'rgba(124, 149, 190, 1)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    
  },
  topicoCaixa3: {
    width: 25,
    height: 25,
    marginLeft: 8,
    marginTop: 6 
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: "80%",
    marginBottom: 25,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    width: "80%",
    backgroundColor: "#F3F3F3",
    borderRadius: 30,
    paddingHorizontal: 20,
    borderColor: '#bdcbce',
    borderWidth: 4,
  },
  toggleButton: {
    position: 'absolute',
    right: 14,
  },
  toggleButtonText: {
    color: '#30668B',
    fontSize: 16,
    fontWeight: 'bold',
  },

});