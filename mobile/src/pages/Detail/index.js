import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import * as MailComposeer from 'expo-mail-composer';

import logo from '../../assets/logo.png';

export default function Detail() {
  const navigation = useNavigation();

  const route = useRoute();
  const incident = route.params.incident;

  const incidentValue =  Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value);
  const messagem = `Olá ${incident.name}, estou entrando em contacto pois gostaria de ajudar no caso "${incident.title}" com o valor de ${incidentValue}.`

  function navigateBack() {
    navigation.goBack();
  }

  function sendEmail() {
    MailComposeer.composeAsync({
      subject: `Herói do caso ${incident.title}`,
      recipients: [incident.email],
      body: messagem,
    })
  }

  function sendWhatsApp() {
    Linking.openURL(`whatsapp://send?${incident.whatsapp}&text=${messagem}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />

        <TouchableOpacity onPress={navigateBack}>
          <Feather name='arrow-left' size={28} color='#E02141' />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={styles.incidentProperty, { marginTop: 0 }}>ONG:</Text>
        <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>
          {incidentValue}
        </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o heroi desse caso.</Text>

        <Text style={styles.heroDescription}>Entre em contacto</Text>

        <View style={styles.actions}>
          <TouchableOpacity onPress={sendWhatsApp} style={styles.action} >
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={sendEmail} style={styles.action} >
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  incident: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
    marginTop: 48,
  },

  incidentProperty: {
    fontSize: 14,
    color: '#41414d',
    fontWeight: 'bold',
    marginTop: 24,
  },

  incidentValue: {
    marginTop: 8,
    fontSize: 15,
    color: '#737380'
  },

  contactBox: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
  },

  heroTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#13131a',
    lineHeight: 30,
  },

  heroDescription: {
    fontSize: 15,
    color: '#737380',
    marginTop: 16,
  },

  actions: {
    marginTop: 16
    ,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  action: {
    backgroundColor: '#e02041',
    borderRadius: 8,
    height: 50,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  actionText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  }
});
