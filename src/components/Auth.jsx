import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import RegisterForm from "./RegisterForm";
import firebase from "../utils/firebase";
import Icon from "react-native-vector-icons/FontAwesome";

const Auth = () => {
  const [show, setShow] = useState(false);
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(true);

  const iniciarSesion = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(dataLogin.email, dataLogin.password);
    } catch (error) {
      mostrarAlerta('Error', 'Error al iniciar sesión. Ingrese una cuenta existente');
    }
  };

  const mostrarAlerta = (titulo, mensaje) => {
    Alert.alert(titulo, mensaje);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      {!show ? (
        <>
          <Text style={styles.title}>Agenda</Text>
          <>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              placeholder="Enter your email"
              style={styles.input}
              placeholderTextColor="#9e9e9e"
              onChange={(e) => setDataLogin({ ...dataLogin, email: e.nativeEvent.text })}
              secureTextEntry={false}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text style={styles.label}>Password:</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Enter your password"
                style={styles.input}
                placeholderTextColor="#9e9e9e"
                onChange={(e) => setDataLogin({ ...dataLogin, password: e.nativeEvent.text })}
                secureTextEntry={showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
                <Icon name={showPassword ? "eye" : "eye-slash"} size={20} color="#9e9e9e" />
              </TouchableOpacity>
            </View>
          </>

          <TouchableOpacity style={styles.loginButton} onPress={iniciarSesion}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShow(!show)}>
            <Text style={styles.registerText}>No account? Sign up</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <RegisterForm show={show} setShow={setShow} />

          <TouchableOpacity style={styles.cancelButton} onPress={() => setShow(!show)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FCE4EC", // Color de fondo más suave
    width: "100%",
  },
  
  title: {
    fontSize: 30,
    color: "#8e44ad", // Color lila
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  eyeIcon: {
    marginLeft: -27,
  },
  label: {
    fontSize: 16,
    color: "#8e44ad", // Color lila
    alignSelf: "flex-start",
    marginLeft: 30,
    marginBottom: 5,
  },
  input: {
    width: "85%",
    padding: 15,
    backgroundColor: "#fff", // Color blanco
    borderRadius: 15,
    color: "#333", // Color de texto más oscuro
    fontSize: 16,
    marginVertical: 10,
  },
  loginButton: {
    width: "85%",
    backgroundColor: "#8e44ad", // Color lila
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  registerText: {
    color: "#8e44ad", // Color lila
    fontSize: 16,
    marginTop: 20,
  },
  cancelButton: {
    width: "85%",
    backgroundColor: "#8e44ad", // Color lila
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff", // Color blanco
    fontSize: 16,
  },
});

export default Auth;
