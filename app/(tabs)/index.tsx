import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Text, FlatList, TouchableOpacity,} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

type TodoItem = { 
  id: string;
  title: string;
};

export default function HomeScreen() {
  const [todo, setTodo] = useState("");
  const [todolist, setTodoList] = useState<TodoItem[]>([]);


  useEffect(() => {
    const loadTodos = async () => {
      try {
        const storedTodos = await AsyncStorage.getItem('todolist');
        if (storedTodos) {
          setTodoList(JSON.parse(storedTodos));
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadTodos();
  }, []);

  // Salva a lista de tarefas no AsyncStorage
  const saveTodos = async (todos: TodoItem[]) => {
    try {
      await AsyncStorage.setItem('todolist', JSON.stringify(todos));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddtodo = () => {
    const newTodo = { id: Date.now().toString(), title: todo };
    const updatedTodoList = [...todolist, newTodo];
    setTodoList(updatedTodoList);
    saveTodos(updatedTodoList); 
    setTodo("");
  };

  const handleDeleteTodo = (id: string) => {
    const updatedTodoList = todolist.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
    saveTodos(updatedTodoList); 
  };

  const renderTodos = ({ item }: { item: TodoItem }) => {
    return (
      <View style={{ borderRadius: 5, paddingVertical: 8, backgroundColor: "#e5e2e5", marginVertical: 4, alignItems: "center", flexDirection: "row", }}>
        <Text style={{ flex: 1, fontSize: 17, marginHorizontal: 10 }}>{item.title}</Text>
        <TouchableOpacity onPress={() => handleDeleteTodo(item.id)} style={{ marginHorizontal: 15 }}>
          <Text>X</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ padding: 10 }}>
      <TextInput
        style={{
          borderWidth: 3,
          borderColor: "#1e90ff",
          borderRadius: 12,
          paddingVertical: 6,
          paddingHorizontal: 16,
          marginTop: 55,
        }}
        placeholder="Adicione Tarefa"
        value={todo}
        onChangeText={(userText) => setTodo(userText)}
      />
      <TouchableOpacity
        style={{ backgroundColor: "#000", borderRadius: 6, paddingVertical: 12, marginTop: 24, alignItems: "center", }}
        onPress={handleAddtodo}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20, }}>Add</Text>
      </TouchableOpacity>
      <FlatList
        data={todolist}
        renderItem={renderTodos}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}