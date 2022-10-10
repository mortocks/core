/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Details')}>
        <Text testID="button">Home Screen</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

function DetailsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Close</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const Stack = createNativeStackNavigator()

export const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ presentation: 'modal' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e2e2e2',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default App
