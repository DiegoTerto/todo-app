import React from 'react'
import { FlatList, View } from 'react-native'
import TodoItemType from '../types/TodoItem'
import TodoItem from './TodoItem'

type TodoItemProps = {
  onDelete: (item: TodoItemType) => void
  onEdit: (item: TodoItemType) => void
  lsTodoItem: TodoItemType[]
}

const TodoItemList = ({ onDelete, onEdit, lsTodoItem }: TodoItemProps) => {
  return (
    <FlatList
      style={{ width: '100%' }}
      data={lsTodoItem}
      renderItem={({ item }) => (
        <TodoItem todoItem={item} onDelete={onDelete} onEdit={onEdit} />
      )}
      keyExtractor={(item, i) => (item.id ?? i).toString()} // Cria key para cada item da lista
      contentContainerStyle={{ gap: 5, marginTop: 5 }}
      ListFooterComponent={<View style={{ height: 20 }} />}
    />
  )
}

export default React.memo(TodoItemList)
