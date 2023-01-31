import * as React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import UserComponent from './components/user/user';
import useHome from './hooks';
import styles from './styles';

export default function HomeScreen() {
  const {users, insets, onClick} = useHome();

  return (
    <View style={[styles.container, {marginTop: insets.top}]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.button} onPress={onClick}>
          <Text style={styles.textButton}>Fetch Random</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={users}
        numColumns={2}
        keyExtractor={item => item.uid}
        style={styles.flatList}
        renderItem={({item}) => {
          return <UserComponent user={item} />;
        }}
      />
    </View>
  );
}
