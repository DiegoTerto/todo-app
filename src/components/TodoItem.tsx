import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import TodoItemType from '../types/TodoItem'

type IconType = 'delete' | 'edit'

const RightSwipeActions = ({
  item,
  onClick,
  progress,
  iconColor,
  backgroundColor,
  iconName
}: {
  item: TodoItemType
  onClick: (item: TodoItemType) => void
  progress: Animated.AnimatedInterpolation<number>,
  iconColor: string,
  backgroundColor: string,
  iconName: IconType
}) => {
  const transform = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 0],
  })
  return (
    <Animated.View
      style={[
        styles.item,
        {
          backgroundColor: backgroundColor,
          alignItems: 'flex-end',
          transform: [{ translateX: transform }],
        },
      ]}
    >
      <TouchableOpacity onPress={() => onClick(item)}>
        <AntDesign name={iconName} size={18} color={iconColor} />
      </TouchableOpacity>
    </Animated.View>
  )
}

const TodoItem = ({
  todoItem,
  onDelete,
  onEdit,
}: {
  todoItem: TodoItemType
  onDelete: (item: TodoItemType) => void
  onEdit: (item: TodoItemType) => void
}) => {
  return (
    <Swipeable
      renderRightActions={(
        progressAnimatedValue: Animated.AnimatedInterpolation<string | number>
      ) => (
        <>
          <RightSwipeActions
            item={todoItem}
            onClick={onDelete}
            progress={progressAnimatedValue}
            iconColor='black'
            backgroundColor='lightcoral'
            iconName='delete'
          />
          <RightSwipeActions
            item={todoItem}
            onClick={onEdit}
            progress={progressAnimatedValue}
            iconColor='white'
            backgroundColor='lightgreen'
            iconName='edit'
          />
        </>
      )}
    >
      <View style={styles.item}>
        <Text style={styles.itemText} numberOfLines={1} selectable>
          {todoItem.description}
        </Text>
      </View>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  item: {
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: 'white',
    height: 40,
    padding: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
})

export default TodoItem
