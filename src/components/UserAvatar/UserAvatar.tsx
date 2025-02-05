import Avatar from '@mui/material/Avatar';
import { User } from '../../types/types';
import { deepPurple } from '@mui/material/colors';

import { useNavigate } from 'react-router';

type UserAvatarProps = { user: User };

function UserAvatar({ user }: UserAvatarProps) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/userProfile/?id=${user.id}`);
  }

  return (
    <Avatar sx={{ bgcolor: deepPurple[300] }} onClick={handleClick}>
      {user.name && getUserInitials(user.name)}
    </Avatar>
  );
}

function getUserInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('');
}

export default UserAvatar;
