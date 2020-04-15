import React, {useState, useEffect, useRef} from 'react'
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Image } from 'react-native'
import { Input, Icon, Button, Badge, Form, Item } from 'native-base'
import io from "socket.io-client";
import CountDown from 'react-native-countdown-component';
import AwesomeAlert from 'react-native-awesome-alerts';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import {LiteStyles} from '../Styles'
import { Message } from '../Components'
import ACTIONTYPES from '../Redux/ActionTypes'

let socket;
const ENDPOINT = 'http://ec2-15-206-194-148.ap-south-1.compute.amazonaws.com:5000'
// const ENDPOINT = 'http://10.0.2.2:5000'

const ChatScreen = ({ navigation, route }) => {

	const dispatch = useDispatch()

	const [name, setName] = useState('')
	const [room, setRoom] = useState('')
	const [message, setMessage] = useState('')
	// const [chats, setChat] = useState([])
	const [time, setTime] = useState('')
	const [users, setUsers] = useState([])
	const [myIndex, setIndex] = useState()
	const [yourTurn, setTurn] = useState(false)
	const [hiddenWord, setWord] = useState('')
	const [ showAlert, setShowAlert ] = useState(false)
	const [shit, setShit] = useState(0)

	const scrollView = useRef(null)

	useEffect(() => {
		const { name, room } = route.params

		socket = io(ENDPOINT)

		socket.emit('join', { name, room }, () => {
			
		})

		setName(name.trim().toLowerCase())
		setRoom(room.trim().toLowerCase())

		return () => {
			socket.emit('disconnect')
			
			socket.off();
		}
	}, [ENDPOINT, route.params])

	const chats = useSelector(store => store.chat.chats, shallowEqual)
	const chat = useSelector(store => store.chat, shallowEqual)

	useEffect(() => {
		socket.on('message', (message) => {
			const chatArray = JSON.parse(JSON.stringify(chats))
			chatArray.push(message)
			dispatch({ type: ACTIONTYPES.INSERTCHAT, payload: { chat: chatArray } })
		})
		scrollView.current.scrollToEnd({animation: true})
		console.log('chatLength1', chat.chats)
	}, [chat.chatsLength])

	console.log('chatLength2', chat.chatsLength)

	useEffect(() => {
		socket.on('users', ({room, users}) => {
			setUsers(users)
		})
	}, [users])

	useEffect(() => {
		socket.on('question', ({ word }) => {
			setWord(word)
			setTurn(true)
			setShowAlert({ show: true, title: 'Your Turn Now', message: `You have to represent the word "${word}"`, confirm: 'OK', onConfirm: () => {}  })

		})
	}, [hiddenWord])

	useEffect(() => {
		socket.on('time', time => {
			setTime(time.seconds)
		})
	}, [time])

	const sendMessage = () => {
		if(message) {
			// if(yourTurn && message.indexOf(hiddenWord) > -1 ) {
			// 	setShowAlert({ show: true, title: `Don't do that please`, message: `Your hint can't have the word "${hiddenWord}"`, confirm: 'OK', onConfirm: () => {}  })
			// }

			// else {
				socket.emit('sendMessage', message, () => {})
				setMessage('')
		// 	}
		}
	}

	const startGame = () => {
		socket.emit('ready', { duration: 600, room })
	}
	
	return (
		<SafeAreaView style={[ LiteStyles.flex1 ]} >
			<View>
				<ScrollView horizontal style={{height: 110}} >
					{
						(users.length)
						?
						users.map(user => {
							return (
								<View style={[LiteStyles.padding5, LiteStyles.alignCenter, LiteStyles.margin5, LiteStyles.borderRadius5, LiteStyles.backgroundColorWhite]} >
									<Image source={{uri: `https://robohash.org/${user.id}?size=50x50&set=1`}} style={{ width: 50, height: 50 }} />
									<Text>{user.name}</Text>
									<Text>{user.score}</Text>
								</View>
							)
						})
						:
						null
					}
				</ScrollView>
			</View>
			<View>
				{
					(time)
					?
					<CountDown until={time} size={15} onFinish={() => alert('Finished')} digitStyle={{backgroundColor: '#FFF'}} digitTxtStyle={{color: '#1CC625'}} timeToShow={['M', 'S']} timeLabels={{m: 'MM', s: 'SS'}} />
					:
					null
				}
			</View>
			
			<ScrollView style={[ LiteStyles.flex1 ]} ref={scrollView} >
				{
					chats.map(chat => {
						return <Message message={ chat } user={name} />
					})
				}
			</ScrollView>
			<View>
				<TouchableOpacity onPress={() => startGame()} >
					<Text>Start Game</Text>
				</TouchableOpacity>
				<Item rounded >
					<Input placeholder="Type your Word here" onChangeText={text => setMessage(text)} value={message} />
					<TouchableOpacity onPress={() => sendMessage()} >
						<Icon name='md-send' type='Ionicons' />
					</TouchableOpacity>
				</Item>
			</View>
			<AwesomeAlert show={showAlert.show} showProgress={false} title={showAlert.title} message={showAlert.message} closeOnTouchOutside={true} closeOnHardwareBackPress={false} showConfirmButton={true} confirmText={showAlert.confirm} confirmButtonColor="#DD6B55" onCancelPressed={() => {}} onConfirmPressed={() => { setShowAlert({ show: false, message: '' }) }} />
		</SafeAreaView>
		)
}

export {ChatScreen}