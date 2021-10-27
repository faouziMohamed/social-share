import style from '../../sass/app.module.scss';
import FormRowField from '../forms/form-rowField';
import UserAvatar from '../user/user-avatar';

export default function NewPostPrompt({ user, setShowNewPostModal }) {
  const handleClick = () => setShowNewPostModal(true);

  return (
    <div className={`${style.post_wrapper} ${style.new_post_wrapper}`}>
      <div className={style.new_post_prompt} onClick={handleClick}>
        <UserAvatar user={user} />
        <FormRowField
          disabled
          cursorType='pointer'
          type='text'
          name='feed'
          rowIcon='fas fa-thought-bubble'
          labelText={`What's on your mind, ${user.firstname}`}
        />
      </div>
    </div>
  );
}
