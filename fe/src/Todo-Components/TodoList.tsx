import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { WithLoadingIndicator } from '../UiToolKit/LoadingIndicator'
import { ITodoProps, ITodoListProps } from '../todosInterface'
import { TodoItem } from './TodoItem'
import { useHandleTodo } from '../customHooks/handleTodo'

const DraggableTodo = (props: {todo: ITodoProps, index: number}) => {
    const { todo, index } = props
    return (
        <Draggable draggableId={todo.id.toString()} index={index} >
            {provided => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <TodoItem todo={todo} index={index}/>
                </div>
            )}
        </Draggable>
    )
}

const TodoList = (props: ITodoListProps) => {
    const { todos } = props
    return(
        <>
            {todos.map((todo: ITodoProps, index: number) => {
                return(
                    <DraggableTodo todo={todo} index={index} key={todo.id}/>
                )
            })}
            
        </>
    )
}

const DraggableTodoList = () => {
    const { todosState, handleDragandDrop } = useHandleTodo()

    return (
      <DragDropContext onDragEnd={handleDragandDrop}>
        <Droppable droppableId="list">
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <TodoList todos={todosState.data} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
}



export const ListWithLoadingIndicator = WithLoadingIndicator(DraggableTodoList)