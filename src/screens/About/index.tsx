import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import {Entypo} from '@expo/vector-icons'
import { THEME } from '../../theme';
import { Background } from '../../components/background';
import logoImg from '../../assets/logo-nlw-esports.png'
import { styles } from './styles';

export function About() {

  const navigation = useNavigation()

  function handleOpenHome(){
    navigation.navigate('home');
  }

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
      </SafeAreaView>
    </Background>
  );
}