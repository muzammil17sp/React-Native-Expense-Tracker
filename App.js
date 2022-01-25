import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import AddTransaction from './screens/AddTransaction';
import Home from "./screens/Home"
import { initializeDatabase } from './utils/db';
const App = () => {
  const [modal, setModal] = useState(false);
  const [loadAgain, setloadAgain] = useState(false);

  initializeDatabase()
    .then(() => console.log("Database initilized"))
    .catch((error) => console.log("error on database initializing "))
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Home loadAgain={loadAgain} setloadAgain={setloadAgain} setModal={setModal} />
      <AddTransaction modal={modal} setModal={setModal} setloadAgain={setloadAgain} />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
