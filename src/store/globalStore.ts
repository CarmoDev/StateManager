import { ITodo } from '../entities/ITodo';
import { IUser } from '../entities/IUser';

import { createStore } from './createStore';

interface IGlobalContextValue {
  user: IUser | null;
  todos: ITodo[];
  login(): void;
  logout(): void;
  addTodo(title: string, author?: string): void;
  toggleTodoDone(todoId: number): void;
  removeTodo(todoId: number): void;
}

export const useGlobalStore = createStore<IGlobalContextValue>(
  (setState, getState) => ({
    user: null,
    todos: [],
    login: () =>
      setState({
        user: {
          email: 'jeffs@gmail.com',
          name: 'Jefferson Carmo',
        },
      }),
    logout: () => setState({ user: null }),
    addTodo: (title: string) => {
      setState((prevState) => ({
        todos: prevState.todos.concat({
          id: Date.now(),
          title,
          author: getState().user?.name ?? 'Convidado',
          done: false,
        }),
      }));
    },
    toggleTodoDone: (todoId: number) => {
      setState((prevState) => ({
        todos: prevState.todos.map((todo) =>
          todo.id === todoId ? { ...todo, done: !todo.done } : todo,
        ),
      }));
    },
    removeTodo: (todoId: number) => {
      setState((prevState) => ({
        todos: prevState.todos.filter((todo) => todo.id !== todoId),
      }));
    },
  }),
);
