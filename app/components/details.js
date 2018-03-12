import React, {Component} from 'react';
import {
  View,
  TextInput,
  Text,
  TabBar,
  Image,
  Card,
  Button
} from 'react-native-ui-lib';
import {
  StyleSheet,
  ScrollView,
} from 'react-native';
import date from '../../utils/date'

import teamMap from '../../utils/team-map'
import Loading from '../components/loading'

export default class Details extends Component {
  constructor(props){
    super(props)
    this.state = {
      snippet: '',
      selectedIndex: 0,
      gameDetails: {}
    }
  }

  componentWillMount() {
    if(this.props.isDetails){
      fetch(`http://data.nba.com/data/10s/json/cms/noseason/game/${this.props.date}/${this.props.id}/boxscore.json`, {
        method: 'GET'
      })
      .then(res => res.json())
      .then((data) => {
        console.log(data.sports_content.game)
        this.setState({
          gameDetails: data.sports_content.game,
        })
        console.log(this.state.gameDetails)
      })
      .catch(err => {
        console.error(err)
      })
    }
  }
  
  render() {
    const snippet = this.state.snippet
    const selectedIndex = this.state.selectedIndex
    const game = this.state.gameDetails
    const homeAbb = JSON.stringify(game) != '{}' ? game.home.abbreviation.toLowerCase() : ''
    const visitorAbb = JSON.stringify(game) != '{}' ? game.visitor.abbreviation.toLowerCase() : ''
    const homeName = homeAbb ? teamMap[homeAbb].city + ' ' + teamMap[homeAbb].team : '暂无'
    const visitorName = visitorAbb ? teamMap[visitorAbb].city + ' ' + teamMap[visitorAbb].team : '暂无'
    var players = []
    if(JSON.stringify(game) != '{}'){
      players = selectedIndex == 0 ? game.home.players.player : game.visitor.players.player
    }

    if(JSON.stringify(game) != '{}')
    return (
      <View flex-3>
        <TabBar
          selectedIndex={selectedIndex}
          onChangeIndex={index => this.setState({selectedIndex: index})}
          ref={element => (this.tabbar = element)}
          style={styles.tabBg}
          height={47}
        >
          <TabBar.Item>
            <Text text80 style={styles.textWhite}>{homeName}</Text>
          </TabBar.Item>
          <TabBar.Item>
            <Text text80 style={styles.textWhite}>{visitorName}</Text>
          </TabBar.Item>
        </TabBar>
        
        <ScrollView flex horizontal={true}>
        <ScrollView flex>
          <View style={[styles.playerBox, styles.titleRow]}>
            <View style={[styles.p2, styles.p2Name]}><Text style={styles.pName}>球员</Text></View>
            <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>时间</Text></View></View>            
            <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>得分</Text></View></View>
            <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>助攻</Text></View></View>
            <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>篮板</Text></View></View>
            <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>投篮</Text></View></View>
            <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>盖帽</Text></View></View>
            <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>抢断</Text></View></View>
            <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>三分</Text></View></View>
            <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>罚球</Text></View></View>
            <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>失误</Text></View></View>
            <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>犯规</Text></View></View>
            <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>正负值</Text></View></View>
            <View style={[styles.p1, styles.lastP1]}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.title}>位置</Text></View></View>            
          </View>
          {
            players.map((player, index) => {
              return (
                <View style={index != players.length - 1 ? styles.playerBox : [styles.playerBox, styles.playerBoxLast] } key={index}>
                  <View style={[styles.p2, styles.p2Name]}><Text style={styles.pName}>{player.first_name.substring(0, 1) + '.' + player.last_name}</Text></View>
                  <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.dataBox}>{player.minutes}</Text></View></View>                  
                  <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.dataBox}>{player.points}</Text></View></View>
                  <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.dataBox}>{player.assists}</Text></View></View>
                  <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.dataBox}>{parseInt(player.rebounds_defensive, 10) + parseInt(player.rebounds_offensive, 10)}</Text></View></View>
                  <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.dataBox}>{player.field_goals_made + ' - ' + player.field_goals_attempted}</Text></View></View>
                  <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.dataBox}>{player.blocks}</Text></View></View>
                  <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.dataBox}>{player.steals}</Text></View></View>
                  <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.dataBox}>{player.three_pointers_made + ' - ' + player.three_pointers_attempted}</Text></View></View>
                  <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.dataBox}>{player.free_throws_made + ' - ' + player.free_throws_attempted}</Text></View></View>
                  <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.dataBox}>{player.turnovers}</Text></View></View>
                  <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.dataBox}>{player.fouls}</Text></View></View>
                  <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.dataBox}>{player.plus_minus}</Text></View></View>
                  <View style={[styles.p1, styles.lastP1]}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.dataBox}>{player.starting_position ? player.starting_position : '-'}</Text></View></View>                  
                </View>
              )
            })
          }
        </ScrollView>
        </ScrollView>
      </View>
    )
    else
      return (
        <View flex-3>
          <Loading></Loading>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  // Container
  container: {
    flex: 13,
    position: 'relative'
  },
  // Scroll
  scrollView: {
    flex: 1,
    width: 400
  },
  // List
  listView: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 48,
    marginRight: 30,
    width: 800
  },
  // Player box (tr)
  titleRow: {
    borderBottomColor: '#c2c2c2',
    borderBottomWidth: 2,
    height: 30,
    borderStyle: 'solid'
  },
  playerBox: {
    alignItems: 'stretch',
    borderBottomColor: '#c2c2c2',
    borderBottomWidth: 1,
    // flex: 1,
    flexDirection: 'row',
    height: 30
  },
  playerBoxLast: {
    borderBottomWidth: 0
  },
  // Every box (td)
  title: {
    alignSelf: 'center',
    color: '#7F7F7F',
    fontSize: 12
  },
  pName: {
    color: '#222',
    fontSize: 12,
    paddingLeft: 5
  },
  dataBox: {
    alignSelf: 'center',
    color: '#222',
    fontSize: 11
  },
  p1: {
    alignItems: 'center',
    borderRightColor: '#c2c2c2',
    borderRightWidth: 1,
    // flex: 1,
    width: 50,
    flexDirection: 'row'
  },
  lastP1: {
    borderRightWidth: 0
  },
  p2: {
    borderRightColor: '#c2c2c2',
    borderRightWidth: 1,
    width: 120,
    flexDirection: 'row'
  },
  p2Name: {
    alignItems: 'center',
    flexDirection: 'row'
  }
})

