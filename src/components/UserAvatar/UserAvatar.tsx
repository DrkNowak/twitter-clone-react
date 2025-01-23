import Avatar from '@mui/material/Avatar';
import { User } from '../../types/types';
import { deepPurple } from '@mui/material/colors';

import { useNavigate } from 'react-router';

function UserAvatar({ user }: { user: User }) {
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
  const initials = name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('');

  return initials;
}

export default UserAvatar;
