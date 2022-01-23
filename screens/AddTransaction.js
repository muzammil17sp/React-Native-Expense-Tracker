import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native';
import { checkValidation } from '../utils/Validation';
import Toast from "react-native-toast-message"
import { addTransaction } from '../utils/db';
import Modal from "react-native-modal"
const AddTransaction = ({ modal, setModal }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState({});
  const [validated, setValidated] = useState(false);

  const addTransactions = () => {
    setValidated(true)
    const error = checkValidation(amount, title)
    setError(error)
  }
  useEffect(async () => {
    if (validated && Object.keys(error).length === 0) {
      const data = await addTransaction(title, amount)
      if (data?.insertId) {
        Toast.show({ type: "success", text1: "Transaction Successfully Added" })
        setTimeout(() => {
          setTitle('')
          setAmount("")
          setModal(false)
        }, 1000);
      }
    }
  }, [error])
  return (
    <Modal isVisible={modal} onBackdropPress={() => setModal(false)} >
      <View style={styles.modal}>

        <Text style={{ fontSize: 18, marginTop: 10, textAlign: "center" }} >Add Transaction</Text>
        <View style={styles.inputContainer}>
          <TextInput value={title} onChangeText={(e) => setTitle(e)} style={styles.input} placeholder='Enter your expense or income title' />
        </View>
        {error.title && <Text style={styles.error}>{error.title}</Text>}
        <View style={{ marginVertical: 5 }} />
        <View style={styles.inputContainer}>
          <TextInput value={amount} onChangeText={(e) => setAmount(e)} style={styles.input} placeholder='Enter your amount for expense or income ' />
        </View>
        {error.amount && <Text style={styles.error}>{error.amount}</Text>}
        <View style={{ marginVertical: 5 }} />

        <Text style={{ fontSize: 10, marginBottom: 15, color: "grey" }}> Add + sign before income amount or - sign with expense before amount </Text>
        <TouchableOpacity onPress={addTransactions} >
          <View style={{ alignItems: "center", justifyContent: "center", backgroundColor: "#9C88FF", padding: 15, borderRadius: 4 }}>
            <Text style={{ color: "#fff", fontSize: 15 }}>Add Transactions</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Toast />
    </Modal>
  );
};

export default AddTransaction;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 30
  },
  inputContainer: {
    backgroundColor: "white",
    width: "100%",
    height: 50,
    padding: 10,
    alignItems: "center",
    elevation: 4,
    marginTop: 5,
    borderRadius: 5
  },
  input: {
    width: "100%",
    fontSize: 14,
    color: "grey"
  },
  error: {
    marginBottom: 10,
    color: "red"
  }
});
