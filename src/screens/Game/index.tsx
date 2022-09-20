import { FlatList, Image, TouchableOpacity, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from './styles';
import { GameParams } from '../../@types/navigation';
import { Background } from '../../components/background';
import {Entypo} from '@expo/vector-icons'
import { THEME } from '../../theme';
import logoImg from '../../assets/logo-nlw-esports.png'
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { useState, useEffect } from 'react';
import { GameCardProps } from '../../components/GameCard/Index';
import { DuoMatch } from '../../DuoMatch';

export function Game() {

  const navigation = useNavigation()

  function handleOpenHome(){
    navigation.navigate('home');
  }

  const route = useRoute()
  const game = route.params as GameParams
  console.log(game)

  const [dous, setDous] = useState<DuoCardProps[]>([])
  const [discordDuoSelected, setDiscordDuoSelected] = useState('')

  async function getDiscordUser(adsId: string){
      console.log(adsId)
      fetch(`http://192.168.15.149:3333/ads/${adsId}/discord`)
      .then(response => response.json())
      .then(data => {
        setDiscordDuoSelected(data.discord)
      })
  }

  useEffect(() => {
    fetch(`http://192.168.15.149:3333/games/${game.id}/ads`)
    .then(response => response.json())
    .then(data => {
      setDous(data)
    }) .catch(err => {
      console.log(err);
    })
  }, [])

  return (
    <Background>    
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleOpenHome}>
            <Entypo 
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image
            source={logoImg}
            style={styles.logo}/>
            <View style={styles.right} />
        </View>

        <Image
          source={{uri : game.bannerUrl.replace('285x380', '280x180')}}
          style={styles.cover}
        />

        <Heading title={game.title} subtitle={'Conecte-se e comece a jogar!'}  />

        <FlatList
        data={dous}
        keyExtractor={item => item.id}
        renderItem={({item})=> (<DuoCard data={item} onConnect={() => getDiscordUser(item.id)}/>)} 
        horizontal
        style={styles.containerList}
        contentContainerStyle={[dous.length > 0 ? styles.contentList : styles.emptyListContent]}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>
            Não há anúncios publicados ainda.
          </Text>
        )}
        />
      
        <DuoMatch visible={discordDuoSelected.length > 0} discord={discordDuoSelected} onClose={() => setDiscordDuoSelected('')}/>
      </SafeAreaView>
    </Background>
  );
}