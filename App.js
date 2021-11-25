import * as React from 'react';
import { View, Text, Button, Card, Paragraph ,Form, TextInput, StyleSheet, Image} from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme  } from '@react-navigation/native';
import { createDrawerNavigator} from '@react-navigation/drawer';
import Constants from 'expo-constants';


const Drawer = createDrawerNavigator();

class Pokedex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      img: '#',
      load: false,
      type: '',
      ability1: '',
      ability2: ''
    };
  }

  

  getPokemon = async () => {
    let res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${this.state.name}`
    );
    let data = await res.json();

    console.log(data.name);
    this.setState({
      img: data.sprites.front_default,
      load: true,
      type: data.types[0].type.name,
      ability1: data.abilities[0].ability.name,
      ability2: data.abilities[1].ability.name,
    });
  };

  handleName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleSubmit = (event) => {
    var nombre = this.state.name;
    console.log(nombre);
    alert(nombre);
    this.getPokemon();
    event.preventDefault();
  };

  handleBack = (event) => {
    this.setState({
      name: '',
      load: false,
    });
  };

 render() {
    if (this.state.load === false) {
      return(    
        <View style={styles.container}>
                <Text style={styles.paragraph}>Pokedex</Text>
                <Form onClick={this.handleSubmit}>
                  <Text style={styles.paragraph}>
                    Ingrese el pokemon
                  </Text>
                  <TextInput
                    type="text"
                    placeholder="Pokemon"
                    value={this.state.name}
                    onChange={this.handleName}
                  />
                  <View style={styles.container}>
                    <Button type="onClick" className="btn btn-primary">
                      Buscar Pokemon
                    </Button>
                  </View>
                </Form>
              </View>
      );
      }else{
      return(
      <View style={styles.container}>
                <Card>
                  <Card.Title title={this.state.name} subtitle={"Tipo: "+this.state.type} />
                  <Card.Content title="Habilidades:">
                    <Paragraph>{"* "+this.state.ability1}</Paragraph>
                    <Paragraph>{"* "+this.state.ability2}</Paragraph>
                  </Card.Content>
                  <Card.Cover source={{ uri: this.state.img }} />
                  <Card.Actions>
                    <Button type="submit" onClick={this.handleBack}>
                      Volver atras
                    </Button>
                  </Card.Actions>
                </Card>
              </View>
              );
    }
  }

}


function HomeScreen() {
  return (
      <View style={styles.home}>
          <Image source={require('./img/pokemon.png')} />
          <Text>Bienvenido/a a nuestra PokeApi!</Text>
          <Image source={require('./img/loadingGif.gif')} />
          <Text style={styles.home}>• Busca un pokemon de la primera generacion.{"\n"}
          • Conoce sus Habilidades.{"\n"}
          • Conoce de que tipo es el pokemon.{"\n"}
          • Conoce su aspecto.</Text>
      </View>
  );
}

const pokemon = new Pokedex;


function App() {
    return (
      <NavigationContainer theme={MyTheme}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Pokedex" component={Pokedex.bind(this)} />
      </Drawer.Navigator>
    </NavigationContainer> 
    );
}

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#0086C8',
    padding: 8
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold'
  },
  backCover: {
    position: 'absolute',
    marginTop: 20,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  home: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 2,
    fontFamily: 'sans-serif',
    fontSize: 20,
    color: '#15A5F8'
  }
});

const MyTheme = {
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(11, 129, 216)',
    background: 'rgb(29, 29, 29)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(11, 129, 216)'
  },
};

