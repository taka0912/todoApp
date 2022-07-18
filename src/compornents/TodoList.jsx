import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export const TodoList = ({ taskList, setTaskList }) => {
  const handleDone = (id) => {
    /* 現在のタスクに取り消し線を追加する。 */
    setTaskList(
      taskList.map((task) => {
        // console.log("a");
        if (id === task.id) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      })
    );
  };

  const handleDelete = (id) => {
    /* 現在のタスクを削除する。 */
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "darkgrey" : "lightgrey",
  });

  const getItemStyle = (isDragging, draggingStyle) => ({
    userSelect: "none",

    ...draggingStyle,
  });

  const reorder = (list, startIndex, endIndex) => {
    const removed = list.splice(startIndex, 1);
    list.splice(endIndex, 0, removed[0]);
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    reorder(taskList, result.source.index, result.destination.index);
  };

  return (
    <div className="todoList">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              className="todos"
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {taskList.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={"t" + task.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      className={`todo ${task.completed ? "completed" : ""}`}
                      key={index}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <div className="todoText">
                        <span>{task.text}</span>
                      </div>
                      <div className="icons">
                        <button
                          onClick={() => handleDone(task.id)}
                          className="task-button"
                        >
                          <i className="fas fa-check"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="task-button"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
