import React from "react";
import { StyleSheet, View, TextInput, Text, FlatList, TouchableOpacity,} from "react-native";


type TodoItem = { 
  id: string;
  title: string;
};

const dummyData = [
  {
    id: "01",
    title: "Lavar Carro",
  },
  {
    id: "02",
    title: "Limpar a casa",
  },
];


export default function HomeScreen() {

  const renderTodos = ({item}: {item: TodoItem }) => {
    return (
    <View>
        <Text>{item.title}</Text>
    </View>
    );
  };
  return (
    <View style={{padding: 10}}>
      <TextInput style={{ 
        borderWidth: 3,
        borderColor: "#1e90ff",
        borderRadius: 12,
        paddingVertical: 6,
        paddingHorizontal: 16,
        marginTop: 55,}} 
        placeholder="Adicione Tarefa"
        
        />

        <TouchableOpacity style={{backgroundColor: "#000", borderRadius: 6, paddingVertical: 12, marginTop: 24, alignItems: "center",}}>
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20}}>add</Text>
        </TouchableOpacity>

        <FlatList
        data={dummyData}
        renderItem={renderTodos}
        keyExtractor={(item) => item.id}
      />
      
      
    </View>
  );
}


