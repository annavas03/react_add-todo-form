import { Todo } from '../../types/todos';
import getUserById from '../../utils/getUserById';
import { UserInfo } from '../UserInfo';

type TodoInfoProps = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: TodoInfoProps) => {
  const { title, userId, completed } = todo;
  const user = getUserById(userId);

  if (!user) {
    return null;
  }

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
