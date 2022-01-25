import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import Icon from "react-native-vector-icons/AntDesign";
import Transaction from "../components/Transaction";
import { deleteTransaction, fetchTransactions } from "../utils/db";

const Home = ({ setloadAgain, setModal, loadAgain }) => {
  const [transaction, setTransaction] = useState(null);
  const [loaded, setloaded] = useState(false);
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  const removeTransaction = async ({ item }) => {
    const data = await deleteTransaction(item.id);
    const removeTransac = transaction?.filter(
      (transac) => transac.id != item.id
    );
    setTransaction(removeTransac);
    calculate(removeTransac);
  };

  const calculate = (transac) => {
    setExpense(0);
    setIncome(0);
    for (let i = 0; i < transac?.length; i++) {
      const element = transac[i];
      if (element.amount.startsWith("-")) {
        let num = +element.amount.substring(1);
        setExpense((previos) => previos + num);
      } else {
        let num = +element.amount.substring(1);
        setIncome((previos) => previos + num);
      }
    }
    console.log("running");
  };

  useEffect(async () => {
    const data = await fetchTransactions();
    setTransaction(data.rows._array), calculate(data.rows._array);
    setloadAgain(false)
    console.log("modal");
  }, [loadAgain]);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 22 }}>Expense Tracke</Text>
      <Text style={{ fontSize: 16, marginTop: 10 }}>Your Balance</Text>
      <Text style={{ fontSize: 19, fontWeight: "bold" }}>
        {income - expense} PKR
      </Text>
      <View style={styles.section}>
        <View
          style={{
            flex: 1,
            padding: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ textTransform: "uppercase", fontSize: 16 }}>
            INCOME
          </Text>
          <Text style={{ color: "#2ECC71", fontSize: 16 }}>{income}</Text>
        </View>
        <View style={styles.expense}>
          <Text style={{ textTransform: "uppercase", fontSize: 16 }}>
            Expense
          </Text>
          <Text style={{ color: "#C0392B", fontSize: 16 }}>{expense}</Text>
        </View>
      </View>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>History</Text>
      <View
        style={{ backgroundColor: "#eee", height: 3, marginVertical: 10 }}
      />
      <SwipeListView
        showsVerticalScrollIndicator={false}
        data={transaction}
        contentContainerStyle={{ padding: 5 }}
        renderItem={({ item }) => <Transaction item={item} />}
        renderHiddenItem={(data, rowMap) => (
          <TouchableOpacity
            style={{
              alignItems: "flex-end",
              justifyContent: "center",
              marginTop: 10,
            }}
            onPress={() => removeTransaction(data)}
          >
            <Icon name="delete" color={"red"} size={28} />
          </TouchableOpacity>
        )}
        leftOpenValue={0}
        rightOpenValue={-75}
      />
      <TouchableOpacity onPress={() => setModal(true)}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#9C88FF",
            padding: 15,
            borderRadius: 4,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 15 }}>Add Transactions</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    backgroundColor: "#fff",
    marginVertical: 15,
    borderRadius: 5,
  },
  expense: {
    flex: 1,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 2,
    borderColor: "#eee",
  },
});
export default Home;
