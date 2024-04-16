import { Button, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { FIRESTORE_DB } from "../utils/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { deleteDoc, doc } from 'firebase/firestore';


const List = ({ currentUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userRef = collection(FIRESTORE_DB, currentUser.uid);
    const subscriber = onSnapshot(userRef, {
      next: (snapshot) => {
        const users = [];
        snapshot.docs.forEach((doc) => {
          users.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setUsers(users);
      },
    });
    return () => subscriber();
  }, []);

  const eliminarContacto = async (id) => {
    try {
      // Eliminar el documento correspondiente al ID del contacto
      await deleteDoc(doc(FIRESTORE_DB, currentUser.uid, id));
      console.log('Contacto eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar contacto:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <>
        <Text style={styles.titleCont}>Contactos</Text>
        {users.length > 0 && (
          <ScrollView style={styles.contactsCont}>
            {users.map((user) => (
              <View style={styles.contactCard} key={user.id}>
                <Text style={styles.text}>Email: {user.email}</Text>
                <Text style={styles.text}>Name: {user.name}</Text>
                <Text style={styles.text}>Phone: {user.phone}</Text>

                {/* Agregar botón de eliminación */}
                <TouchableOpacity onPress={() => eliminarContacto(user.id)}>
                  <Text style={styles.eliminarButton}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: "#FDEFEF",
    justifyContent: "center",
    alignItems: "center",
    width: 330,
    borderRadius: 20,
    padding: 20,
  },
  eliminarButton: {
    color: '#FF7E67',
    marginTop: 10,
    textDecorationLine: 'underline',
    fontSize: 14,
    textAlign: 'center',
  },
  contactsCont: {
    flex: 1,
    marginBottom: 25,
  },
  titleCont: {
    fontSize: 20,
    color: "#4E4E4E",
    alignSelf: "center",
    marginTop: 10,
  },
  contactCard: {
    backgroundColor: "#FFD2BF",
    flexDirection: "column",
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
  },
  text: {
    color: "#4E4E4E",
  },
});

export default List;