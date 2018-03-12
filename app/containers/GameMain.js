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
  Navigator
} from 'react-native';
import date from '../../utils/date'

import NbaCard from '../components/card'
import Details from '../components/details'
import Team from '../components/team'

export default class GameMain extends Component {
  constructor(props){
    super(props)
    this.state = {
      snippet: '',
      selectedIndex: 0,
      gameNums: 'No',
      firstGameColor: 'gray',
      isDetails: false,
      id: '',
      date: date.getNowDate(),
      urlDate: date.getUrlDate(),
      gameList: []
    }
  }

  changeDate(option) {
    if(option == '-'){
      date.getLastDate()
    }else{
      date.getTomDate()
    }
    this.setState({
      date: date.getNowDate(),
      urlDate: date.getUrlDate()
    })
    this.refs.card.change()
  }

  toDetails(id) {
    console.log(`id: ${id}`)
    this.setState({
      id: id,
      isDetails: true,
      selectedIndex: 1
    })
  }

  getGameInf(num, color) {
    this.setState({
      gameNums: num,
      firstGameColor: color
    })
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
          <View left paddingT-40 paddingL-20 marginB-30 row>
            <View flex-3>
              <Text text30 style={styles.textWhite}>{this.state.date}</Text>
              <Text text70 style={styles.textWhite}>{this.state.gameNums} Games</Text>
            </View>
            <View flex center>
              <Button
                label="昨天"
                size={'small'}
                outline
                outlineColor={Colors.rgba(255,255,255,0.7)}
                onPress={() => this.changeDate('-')}
              ></Button>
            </View>
            <View flex center>
            <Button
                label="明天"
                size={'small'}
                outline
                outlineColor={Colors.rgba(255,255,255,0.7)}
                onPress={() => this.changeDate('+')}
              ></Button>
            </View>
          </View>
          <TabBar
            selectedIndex={selectedIndex}
            onChangeIndex={index => this.setState({selectedIndex: index})}
            ref={element => (this.tabbar = element)}
            style={styles.tabBg}
            height={47}
          >
            <TabBar.Item>
              <Text text70 style={styles.textWhite}>比赛</Text>
            </TabBar.Item>
            <TabBar.Item>
              <Text text70 style={styles.textWhite}>详情</Text>
            </TabBar.Item>
            <TabBar.Item>
              <Text text70 style={styles.textWhite}>球队</Text>
            </TabBar.Item>
          </TabBar>
        </View>
        { selectedIndex == 0 && <NbaCard getGameInf={this.getGameInf.bind(this)} toDetails={this.toDetails.bind(this)} ref="card"></NbaCard> }
        { selectedIndex == 1 && <Details isDetails={this.state.isDetails} id={this.state.id} date={this.state.urlDate}></Details> }
        { selectedIndex == 2 && <Team></Team> }
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

