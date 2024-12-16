import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import PomodoroTimer from '../components/PomodoroTimer';

const initialTasks = {
  backlog: [
    { id: '1', content: 'Read Chapter 1' },
    { id: '2', content: 'Complete Exercise 2' },
  ],
  inProgress: [],
  done: [],
};

const Task = ({ id, content, onClick }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      onClick={onClick}
      className="bg-white p-4 rounded shadow mb-2 cursor-pointer hover:bg-gray-100"
    >
      {content}
    </div>
  );
};

const Sprints = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState(null); // Selected task for Pomodoro Timer

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return; // No destination or same position

    const sourceList = Object.keys(tasks).find((key) =>
      tasks[key].some((task) => task.id === active.id)
    );
    const destinationList = over.id;

    if (sourceList && tasks[destinationList]) {
      const updatedSourceList = tasks[sourceList].filter((task) => task.id !== active.id);
      const movedTask = tasks[sourceList].find((task) => task.id === active.id);
      const updatedDestinationList = [...tasks[destinationList], movedTask];

      setTasks({
        ...tasks,
        [sourceList]: updatedSourceList,
        [destinationList]: updatedDestinationList,
      });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Sprints</h1>
      <p className="mb-4">Drag and drop tasks between columns. Click a task to start a timer.</p>
      <div className="grid grid-cols-3 gap-4">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          {Object.keys(tasks).map((list) => (
            <div key={list} className="bg-gray-200 p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-4 capitalize">
                {list === 'backlog' && 'Backlog'}
                {list === 'inProgress' && 'In Progress'}
                {list === 'done' && 'Done'}
              </h2>
              <SortableContext items={tasks[list].map((task) => task.id)}>
                {tasks[list].map((task) => (
                  <Task
                    key={task.id}
                    id={task.id}
                    content={task.content}
                    onClick={() => setSelectedTask(task)}
                  />
                ))}
              </SortableContext>
            </div>
          ))}
        </DndContext>
      </div>

      {/* Pomodoro Timer Section */}
      {selectedTask && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Pomodoro Timer for: {selectedTask.content}</h2>
          <PomodoroTimer />
        </div>
      )}
    </div>
  );
};

export default Sprints;
