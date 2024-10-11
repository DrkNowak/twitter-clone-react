import Avatar from '@mui/material/Avatar';
import { User } from '../../types/types';
import { deepPurple } from '@mui/material/colors';

function UserMenu({user}: {user: User}){
    return (
        <Avatar sx={{ bgcolor: deepPurple[300] }}>{user.name && getUserInitials(user.name)}</Avatar>
    );
}

function getUserInitials( name : string ): string{    
    const initials = name.split(' ').map(word => word.charAt(0)).join('');
    
    return initials;
}


export default UserMenu;