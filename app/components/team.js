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

import teamMap from '../../utils/team-map'
import Loading from '../components/loading'

export default class Team extends Component {
  constructor(props){
    super(props)
    this.state = {
      teamList: [],
    }
  }

  componentDidMount() {
    fetch(`http://data.nba.com/data/json/cms/${(new Date).getFullYear() - 1}/league/standings.json`, {
      method: 'GET'
    })
    .then(res => res.json())
    .then((data) => {
      console.log(data.sports_content)
      this.setState({
        teamList: data.sports_content.standings.team
      })
    })
    .catch(err => {
      console.error(err)
    })
  }
  
  render() {
    const teamList = this.state.teamList.length > 0 ? this.state.teamList : []

    return (
      <View flex-3>
        {
          teamList.length > 0 ? 
          <ScrollView flex>
            {
              teamList.map((item, index) => {
                return (
                  <View flex row key={index} style={index % 2 != 0 ? styles.rowDarkBg : styles.rowLightBg}>
                    <View flex center>
                      <Text text60 style={styles.colorDL}>{index + 1}</Text>
                    </View>
                    <View flex-3 left center>
                      <Text text50 style={[styles.teamCity, styles.colorDL]}>{item.name}</Text>
                      <Text text65 style={styles.teamName}>{item.nickname}</Text>
                    </View>
                    <View flex-2 center>
                      <Text text60 style={styles.colorDL}>{item.team_stats.wins}: {item.team_stats.losses}</Text>
                    </View>
                    <View flex-2 center>
                      <Image source={teamMap[item.abbreviation.toLowerCase()].logo2} style={styles.nbaIcon}/>
                    </View>
                  </View>
                )
              })
            } 
          </ScrollView> :
          <Loading></Loading>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowDarkBg: {
    backgroundColor: '#FAFFFF'
  },
  rowLightBg: {
    backgroundColor: '#FFFAFA'
  },
  colorDL: {
    color: '#546B83'
  },
  teamCity: {
    fontWeight: '600',
  },
  teamName: {
    color: '#455667'
  },
  nbaIcon: {
    width: 20,
    height: 20
  },
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

