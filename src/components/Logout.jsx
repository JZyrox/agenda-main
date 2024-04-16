// Logout.js
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import firebase from "../utils/firebase";
import RegisterContact from "./RegisterContact";
import List from "./List";
import { getAuth } from "firebase/auth";

const Logout = () => {
  const [showForm, setShowForm] = useState(false);
  const [formButtonText, setFormButtonText] = useState("Add account");

  const closeSession = () => {
    firebase.auth().signOut();
  };

  const formToggle = () => {
    setShowForm((prevShowForm) => !prevShowForm);
    setFormButtonText(showForm ? "Add account" : "Show contacts");
  };

  const auth = getAuth();
  const currentUser = auth.currentUser;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.contactsContainer}>
        {showForm ? (
          <RegisterContact showForm={showForm} setShowForm={setShowForm} currentUser={currentUser} />
        ) : (
          <List currentUser={currentUser} />
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={formToggle}>
          <Text style={styles.buttonText}>{formButtonText}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={closeSession}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FDEFEF",
  },
  contactsContainer: {
    flex: 14,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  button: {
    flex: 1,
    backgroundColor: "#8e44ad",
    borderRadius: 12,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Logout;
