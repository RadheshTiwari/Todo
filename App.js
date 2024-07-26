import {
  Alert,
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';

const App = () => {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [editTodo, setEditTodo] = useState(null);

  const handleAdd = () => {
    setTodoList([...todoList, {id: Date.now().toString(), title: todo}]);
    setTodo('');
  };
  const handleDelete = id => {
    const DeleteList = todoList.filter(value => {
      return value.id !== id;
    });
    setTodoList(DeleteList);

    setTodo('');
  };
  const handleEdit = item => {
    setEditTodo(item);
    setTodo(item.title);
  };
  const handleUpdate = () => {
    const updatedtodo = todoList.map(e => {
      if (e.id === editTodo.id) {
        return {...e, title: todo};
      }
      return e;
    });
    setTodoList(updatedtodo);
    setEditTodo(null);
    setTodo('');
  };
  return (
    <View>
      <TextInput
        placeholder="Add Todo"
        style={{
          width: '94%',
          borderWidth: 3,
          borderColor: 'green',
          alignSelf: 'center',
          borderRadius: 10,
          marginTop: 10,
        }}
        value={todo}
        onChangeText={e => {
          setTodo(e);
        }}
      />
      {editTodo ? (
        <View
          style={{
            width: '94%',
            alignSelf: 'center',
            marginTop: 10,
          }}>
          <Button
            title="Save"
            onPress={() => {
              handleUpdate()
            }}
          />
        </View>
      ) : (
        <View
          style={{
            width: '94%',
            alignSelf: 'center',
            marginTop: 10,
          }}>
          <Button
            title="ADD"
            onPress={() => {
              handleAdd();
            }}
          />
        </View>
      )}
      <FlatList
        data={todoList}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                width: '94%',
                backgroundColor: 'green',
                margin: 10,
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: 600}}>
                {item.title}
              </Text>
              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Pressable
                  style={{
                    backgroundColor: 'red',
                    width: '30%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                  }}
                  onPress={() => {
                    handleEdit(item);
                  }}>
                  <Text style={{color: 'white', fontSize: 14, fontWeight: 400}}>
                    EDIT
                  </Text>
                </Pressable>
                <Pressable
                  style={{
                    backgroundColor: 'red',
                    width: '35%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                    marginLeft: 5,
                    flexWrap: 'wrap',
                  }}
                  onPress={() => {
                    handleDelete(item.id);
                  }}>
                  <Text style={{color: 'white', fontSize: 14, fontWeight: 400}}>
                    DELETE
                  </Text>
                </Pressable>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
