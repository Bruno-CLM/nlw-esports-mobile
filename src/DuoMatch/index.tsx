import React, { useState } from 'react';
import { View , Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { THEME } from '../theme';
import { styles } from './styles';
import {Activity, CheckCircle} from 'phosphor-react-native'
import { Heading } from '../components/Heading';
import * as Clipboard from 'expo-clipboard'

interface Props extends ModalProps {
    discord: string,
    onClose: () => void
}

export function DuoMatch({discord, onClose, ...rest}: Props) {

    const[isCopping, setIsCopping] = useState(false);

    async function handleCopyDiscordToClipboard() {
        setIsCopping(true)
        await Clipboard.setStringAsync(discord)
        
        Alert.alert('Discord Cópiado!', "Usuário copiado para você colar no Discord.")
        setIsCopping(false)
    }

  return (
    <Modal animationType='slide' transparent statusBarTranslucent {...rest}>
        <View style={styles.container}>
            <View style={styles.content}>
               <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                    <MaterialIcons name="close" size={20} color={THEME.COLORS.CAPTION_500} />
               </TouchableOpacity >

                <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />

                <Heading title="Let's play" subtitle='Agora é so começar a jogar!' style={{alignItems: 'center', marginTop: 24}}></Heading>
                
                <Text style={styles.label}>
                    Adicione no Discord
                </Text>
                <TouchableOpacity onPress={handleCopyDiscordToClipboard} style={styles.discordbutton}
                    disabled={isCopping}
                >
                    <Text style={styles.discord}>
                        {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY}/> : discord}
                    </Text>
                </TouchableOpacity >
            </View>
        </View>
    </Modal>
  );
}