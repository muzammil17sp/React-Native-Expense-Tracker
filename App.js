import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import AddTransaction from './screens/AddTransaction';
import Home from "./screens/Home"
import { initializeDatabase } from './utils/db';
const App = () => {
  const [modal, setModal] = useState(false);
  initializeDatabase()
    .then(() => console.log("Database initilized"))
    .catch((error) => console.log("error on database initializing "))
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Home modal={modal} setModal={setModal} />
      <AddTransaction modal={modal} setModal={setModal} />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
