import { Todo } from '../../types/todos';
import { UserInfo } from '../UserInfo';

type TodoInfoProps = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: TodoInfoProps) => {
  const { title, completed, user } = todo;

  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo user={user} />
    </article>
  );
};
