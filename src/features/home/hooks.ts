import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {User} from '../../types/user';

export default function useHome() {
  const [users, setUsers] = React.useState<User[]>([]);
  const insets = useSafeAreaInsets();

  const onClick = async () => {
    try {
      const res = await fetch(
        'https://random-data-api.com/api/users/random_user?size=10',
      );
      const newResponse = await res.json();
      console.log(newResponse[0].address.coordinates);
      setUsers(newResponse);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    users,
    insets,
    onClick,
  };
}
