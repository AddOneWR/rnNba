import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import GameMain from './app/containers/GameMain'

export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <GameMain></GameMain>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});
