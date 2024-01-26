import { IconUser } from '@tabler/icons-react';

const account = {
    id: 'Account',
    title: 'My Account',
    type: 'group',
    children: [
        {
            id: 'profile',
            title: 'Profile',
            type: 'item',
            url: '/student/profile',
            icon: IconUser,
            breadcrumbs: false
        }
    ]
};

export default account;
