import { View, Image, FlatList, TouchableOpacity, Text } from 'react-native';
import { THEME } from '../../theme';
import { useState, useEffect } from 'react'
import { styles } from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import logoImg from '../../assets/logo-nlw-esports.png'
import { Heading } from '../../components/Heading';
import { GameCard, GameCardProps } from '../../components/GameCard/Index';
import { Background } from '../../components/background';
import { useNavigation } from '@react-navigation/native';

interface Game{
  id: string,
  title: string,
  bannerUrl: string,
  _count: {
      Ad: number
  }
}

export function Home() {

  const [games, setGames] = useState<GameCardProps[]>([])

  useEffect(() => {
    fetch('http://192.168.15.149:3333/games')
    .then(response => response.json())
    .then(data => {
    setGames(data)})
  }, [])

  const navigation = useNavigation()

  function handleOpenGame({id, title, bannerUrl}: GameCardProps){
    navigation.navigate('game', {id, title, bannerUrl});
  }

  function handleOpenAbout(){
    navigation.navigate('about');
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
          <Image source={logoImg}
          style={styles.logo} />

          <Heading title='Encontre seu duo!' subtitle='Selecione o game que deseja jogar...'></Heading>

          <FlatList
              contentContainerStyle={styles.contentList}
              data={games}
              keyExtractor={games => games.id}
              renderItem={({item}) => (
                  <GameCard data={item} onPress={() => handleOpenGame(item)}/>
              )}
              showsHorizontalScrollIndicator={false}
              horizontal
          ></FlatList>
          
          <TouchableOpacity style={styles.buttonConfiguration} onPress={handleOpenAbout}>
            <MaterialCommunityIcons name="account-settings-outline" size={24} color="white" />
          </TouchableOpacity>
          
        

      
      </SafeAreaView>
    </Background>
  );
}