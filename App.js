/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, Image,
} from 'react-native';
// import TabNavigator from 'react-native-tab-navigator';
// import { GiftedChat } from 'react-native-gifted-chat'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n'
    + 'Shake or press menu button for dev menu',
});

type Props = {};
// export default class App extends Component<Props> {
//   constructor(props) {
//     super(props);
//     this.state = {
//       messages: [],
//     }
//   }

//   componentWillMount() {
//     this.setState({
//       messages: [
//         {
//           _id: 1,
//           text: 'Hello developer',
//           createdAt: new Date(),
//           user: {
//             _id: 2,
//             name: 'React Native',
//             avatar: 'https://placeimg.com/140/140/any',
//           },
//         },
//       ],
//     })
//   }

//   onSend(messages = []) {
//     this.setState(previousState => ({
//       messages: GiftedChat.append(previousState.messages, messages),
//     }))
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         {/* <Text style={styles.welcome}>Welcome to React Native!</Text>
//         <Text style={styles.instructions}>To get started, edit App.js</Text>
//         <Text style={styles.instructions}>{instructions}</Text> */}
//         <GiftedChat
//           messages={this.state.messages}
//           onSend={messages => this.onSend(messages)}
//           user={{
//             _id: 1,
//           }}
//         />
//       </View>
//     );
//   }
// }
