import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Pressable,
  TouchableOpacity,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ToDoStackParamList } from '../navigation/StackNavigator'
import Modal from '../components/Modal'
import TodoItemType from '../types/TodoItem'
import { useAsyncStorage } from '../hooks/useAsyncStorage'
import TodoItemList from '../components/TodoItemList'
import { storageTodoListKey } from '../utils/constants'

const initialTodoItem: TodoItemType = { id: -1, description: '', title: '' }

type TodoListScreenProps = NativeStackScreenProps<
  ToDoStackParamList,
  'TodoList',
  'Login'
>

const TodoListScreen = ({ navigation }: TodoListScreenProps) => {
  const [modalVisible, setModalVisible] = React.useState(false)
  const [todoItem, setTodoItem] = React.useState<TodoItemType>(initialTodoItem)

  const [lsTodoItem, setLsTodoItem] = React.useState<TodoItemType[]>([])

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{ padding: 15 }}
        >
          <AntDesign name="pluscircle" size={24} color="darkseagreen" />
        </TouchableOpacity>
      ),
    })

    navigation.addListener('focus', async () => {
      const response = await fetch('http://localhost:3000/tasks')
      const responseJson = await response.json()
      setLsTodoItem(responseJson.body)
    })
  }, [navigation])

  const handleAddItem = async () => {
    const response = await fetch('http://localhost:3000/tasks/', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ title: todoItem.title, description: todoItem.description }),
    })
    const responseJson = await response.json()
    const newLsTaskItem: TodoItemType[] = [...lsTodoItem, {
      ...responseJson.body
    }]
    setLsTodoItem(newLsTaskItem);
  }

  const handleDeleteItem = React.useCallback(
    async (item: TodoItemType) => {
      await fetch(`http://localhost:3000/tasks/${item.id}`, {
        method: 'DELETE',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
      const index = lsTodoItem.findIndex((todo) => todo.id === item.id)

      const todoItemListCopy = lsTodoItem.toSpliced(index, 1)

      setLsTodoItem(todoItemListCopy)
    },
    [lsTodoItem]
  )

  const handleEditItem = React.useCallback(
    (item: TodoItemType) => {
      setTodoItem(item)

      setModalVisible(true)
    }, [])

  return (
    <View style={styles.container}>
      {/* Modal do nosso projeto */}
      <Modal
        modalVisible={modalVisible}
        onCloseModal={() => setModalVisible(!modalVisible)}
        title="Descreva a tarefa"
      >
        {/* Input para guardar o titulo */}
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={todoItem.title}
          onChangeText={(textValue) =>
            setTodoItem((prev) => ({ ...prev, title: textValue }))
          }
        />

        {/* Input para guardar a descrição */}
        <TextInput
          style={[styles.input, { minHeight: 80 }]}
          placeholder="Descrição"
          value={todoItem.description}
          onChangeText={(textValue) =>
            setTodoItem((prev) => ({ ...prev, description: textValue }))
          }
          multiline={true}
          numberOfLines={4}
        />

        {/* Botões da modal */}
        <View style={{ flexDirection: 'row', gap: 5 }}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={handleAddItem}
          >
            <Text style={styles.textStyle}>Salvar</Text>
          </Pressable>
        </View>
      </Modal>

      {/* Lista de tarefas salvas */}
      <TodoItemList
      lsTodoItem={lsTodoItem}
      key={JSON.stringify(lsTodoItem)}
      onDelete={handleDeleteItem}
      onEdit={handleEditItem} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    width: '100%',
    minWidth: '50%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    marginBottom: 10,
  },

  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginLeft: 'auto',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
})

export default TodoListScreen
