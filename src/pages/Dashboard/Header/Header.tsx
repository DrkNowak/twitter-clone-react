import { User } from '../../../types/types';

import UserAvatar from '../../../components/UserAvatar/UserAvatar';

import HeaderStyles from './HeaderStyles';
import Box from '@mui/material/Box';

import { memo } from 'react';

const HeaderMemo = memo(function Header({ user }: { user: User }) {
  const styles = HeaderStyles();

  return (
    <header>
      <Box sx={styles.header}>
        <h2>Another Twitter Clone</h2>
        <Box sx={styles.user}>
          <h2>{user.name}</h2> <UserAvatar user={user} />
        </Box>
      </Box>
    </header>
  );
});

export default HeaderMemo;
