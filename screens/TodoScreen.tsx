import { useState, useEffect } from 'react'

import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Button,
  TouchableHighlight
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export function TodoScreen() {
  const [taskName, setTaskName] = useState<string>('');
  const [tasks, setTasks] = useState<string[]>([]);

  const createTask = () => {
    setTaskName('')
    AsyncStorage.setItem('tasks', JSON.stringify([...tasks, taskName]))
    getTasks()
  }

  const remove = (task: string) => {
    const indexOfTask = tasks.indexOf(task);
    setTasks((oldTasks => oldTasks.splice(indexOfTask, 1)))
    console.log(tasks)
    AsyncStorage.setItem('tasks', JSON.stringify(tasks))
    getTasks()
  }

  const getTasks = async () => {
    const tasks = await AsyncStorage.getItem('tasks')
    if (!tasks) return
    const tasksParsed = JSON.parse(tasks)
    setTasks(tasksParsed)
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <ScrollView>
      <View>
        <View>
          <TextInput
            style={styles.input}
            value={taskName}
            onChangeText={setTaskName}
            placeholder='Descrição da tarefa'
          />
        </View>
        <View style={styles.addBtnContainer}>
          <TouchableHighlight style={styles.addBtn} onPress={createTask}>
            <Text>ADICIONAR TAREFA</Text>
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.taskWrapper}>
        {
          tasks.map((task) => {
            return (
              <View style={styles.taskContainer}>
                <Text>{task}</Text>
                <TouchableHighlight onPress={() => remove(task)} style={styles.removeBtnContainer}>
                  <Text style={styles.text}>Exluir</Text>
                </TouchableHighlight>
              </View>
            )
          })
        }
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8
  },
  taskWrapper: {
    flex: 1,
    width: '100%',
    marginTop: 10,
    gap: 6,
    padding: 10
  },
  taskContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#d3d3d3'
  },
  removeBtnContainer: {
    backgroundColor: '#dd1144',
    padding: 6,
    marginLeft: 3
  },
  text: {
    color: '#fff'
  },
  addBtnContainer: {
    flex: 1,
    alignItems: 'center',
  },
  addBtn: {
    backgroundColor: '#2196f3',
    padding: 8,
    borderRadius: 8
  }
});
