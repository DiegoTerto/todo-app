import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { storageTokenKey } from "../utils/constants";
import { useAsyncStorage } from "../hooks/useAsyncStorage";

export function LoginScreen({ setToken }: any) {
  const [token] = useAsyncStorage(
    storageTokenKey,
    '')
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Login</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setUsername(value)}
        value={username}
        placeholderTextColor="#cdcdcd"
        placeholder="Usuário"/>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setPassword(value)}
        value={password}
        placeholderTextColor="#cdcdcd"
        placeholder="Senha"/>
      <Pressable
        style={[styles.button]}
        onPress={() => setToken(username)}
      >
        <Text style={styles.textLogin}>Logar</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  loginText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    width: '70%',
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderRadius: 50,
    borderColor: '#cdcdcd'
  },
  button: {
    backgroundColor: '#2097f3',
    width: '70%',
    borderRadius: 50,
  },
  textLogin: {
    textAlign: 'center',
    color: 'white',
    paddingTop: 10,
    paddingBottom: 10,
  }
})