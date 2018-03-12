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

export default class NbaCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      gameList: [],
      isLoading: false
    }
  }

  change() {
    this.setState({
      isLoading: true
    })
    this.getNewData()
  }

  getNewData() {
    fetch(`http://data.nba.com/data/5s/json/cms/noseason/scoreboard/${date.getUrlDate()}/games.json`, {
      method: 'GET'
    })
    .then(res => res.json())
    .then((data) => {
      console.log(data)
      const gameList = data.sports_content.games.game
      if(this.props.getGameInf)
        this.props.getGameInf(gameList.length, teamMap[gameList[0].visitor.abbreviation.toLowerCase()].color)
      this.setState({
        gameList: gameList,
        isLoading: false
      })
    })
    .catch(err => {
      console.error(err)
    })
  }

  componentDidMount() {
    this.getNewData()
  }

  HandleToDetails(id) {
    this.props.toDetails(id)
  }
  
  render() {
    return (
      <View flex-3>
        <ScrollView contentContainerStyle={styles.scrollContainer} flex>
          {
            this.state.gameList.length > 0 && !this.state.isLoading ?
            this.state.gameList.map((item, index) => {
              return(
                <Card row height={120} containerStyle={{marginBottom: 15,marginTop: 15}} onPress={this.HandleToDetails.bind(this,item.id)} key={index}>
                  <Card.Image width={115} height={20} imageSource={teamMap[item.home.abbreviation.toLowerCase()].logo} />
                  <Card.Section body>
                    <View flex center>
                      <Text>{item.period_time.period_name}{item.period_time.period_value}  {item.period_time.game_clock}</Text>
                      <Text text40>{item.home.score} | {item.visitor.score}</Text>
                    </View>
                  </Card.Section>
                  <Card.Image width={115} height={20} imageSource={teamMap[item.visitor.abbreviation.toLowerCase()].logo} />
                </Card>
              )
            }) :
            <Loading></Loading>
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 10,
    flex: 1
  },
  textWhite: {
    color: 'white',
    fontWeight: '500',
  },
  nbaIcon: {
    width: 100,
    height: 100
  }
});

