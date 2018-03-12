import React, {Component} from 'react';
import {
  View,
  TextInput,
  Text,
  TabBar,
  Colors,
  Button
} from 'react-native-ui-lib';
import {
  StyleSheet,
} from 'react-native';
import NbaCard from '../components/card'

export default class GameMain extends Component {
  constructor(props){
    super(props)
    this.state = {
      snippet: '',
      selectedIndex: 1,
      gameNums: 'No',
      firstGameColor: 'gray',
      gameList: []
    }
  }

  componentDidMount() {
    const snippet = this.tabbar.getSnippet();
    this.setState({
      snippet: snippet
    })
  }

  render() {
    const snippet = this.state.snippet
    const selectedIndex = this.state.selectedIndex

    return (
      <View flex>
        <View flex style={{backgroundColor: this.state.firstGameColor}}>
          <View left paddingT-40 paddingL-20 marginB-30>
            <Text text30 style={styles.textWhite}>2018-2-6</Text>
            <Text text70 style={styles.textWhite}>{this.state.gameNums} Games</Text>
          </View>
          <TabBar
            selectedIndex={selectedIndex}
            onChangeIndex={index => this.setState({selectedIndex: index})}
            ref={element => (this.tabbar = element)}
            style={styles.tabBg}
            height={47}
          >
            <TabBar.Item>
              <Text text85 style={styles.textWhite}>比赛</Text>
            </TabBar.Item>
            <TabBar.Item>
              <Text text85 style={styles.textWhite}>球员</Text>
            </TabBar.Item>
            <TabBar.Item>
              <Text text85 style={styles.textWhite}>球队</Text>
            </TabBar.Item>
            <TabBar.Item>
              <Text text85 style={styles.textWhite}>记录</Text>
            </TabBar.Item>
          </TabBar>
        </View>
        <NbaCard getGameInf={this.getGameInf.bind(this)}></NbaCard>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textWhite: {
    color: 'white',
    fontWeight: '500',
  },
  tabBg: {
    backgroundColor: Colors.rgba(0,0,0,0.7),
    opacity: 0.4
  }
});

