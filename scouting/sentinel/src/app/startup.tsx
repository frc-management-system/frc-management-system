import { StyleSheet, Text, View } from 'react-native';

export default function Startup() {
  return (
    <View style={styles.container}>
      <Text>Startup</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
