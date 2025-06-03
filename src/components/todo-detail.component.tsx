// src/components/todo-detail.component.tsx

import React, { useEffect, useState } from 'react';

import { Todo } from '../types/todo-type';

interface Props {
  todoId: number;
}

export const TodoDetail = ({ todoId }: Props) => {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setTodo(null);

    fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Fetch failed');
        return res.json();
      })
      .then((data: Todo) => setTodo(data))
      .catch(() => setError('Error loading todo'))
      .finally(() => setLoading(false));
  }, [todoId]);

  if (loading) return <p>Loading...</p>;

  if (error) {
    return <div role="alert">{error}</div>;
  }

  if (!todo) return <p>No todo found.</p>;

  return (
    <div>
      <h2>Todo Detail</h2>
      <p>
        <strong>ID:</strong> {todo.id}
      </p>
      <p>
        <strong>Title:</strong> {todo.title}
      </p>
      <p>
        <strong>Status:</strong> {todo.completed ? 'Completed' : 'Open'}
      </p>
    </div>
  );
};
