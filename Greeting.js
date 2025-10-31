import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Greeting = ({ name }) => {
  console.log('Renderizando componente Greeting');

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        ¡Hola {name}! Bienvenido a la app
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
});

export default Greeting;
