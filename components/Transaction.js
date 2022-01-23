import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Transaction = ({item}) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#fff", marginBottom: 10, elevation: 5, borderRadius: 4, height: 50 }}>
    <Text style={{ fontSize: 16, marginLeft: 10, marginTop: "auto", marginBottom: "auto", color: "grey" }}>{item.title}</Text>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text style={{ fontSize: 16, marginHorizontal: 10, color: item.amount.startsWith("-") ? "#C0392B" : "#2ECC71" }}>{item.amount}</Text>
      <View style={{ backgroundColor: item.amount.startsWith("+") ? "#2ECC71" : "#C0392B", width: 5, height: "100%" }} />
    </View>
  </View>
  );
};

export default Transaction;

const styles = StyleSheet.create({});
