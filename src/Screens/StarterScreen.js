import React, {useState, useEffect} from 'react'
import { SafeAreaView, ScrollView, View, TouchableOpacity } from 'react-native'
import { Icon, Button, Input, Item, Text } from 'native-base'

import { LiteStyles } from '../Styles'

const StarterScreen = (props) => {

	const [name, setName] = useState('')
	const [room, setRoom] = useState('')

	const navigate = () => {
		props.navigation.navigate('Chat', { name, room })
	}

	return (
		<SafeAreaView style={[LiteStyles.flex1, { backgroundColor: '#fff' }]} >
			<View style={[ LiteStyles.flex1, LiteStyles.flexRow, LiteStyles.justifyCenter, LiteStyles.alignCenter ]} >
				<View style={[{ width: 300, height: 200, elevation: 5, backgroundColor: '#fff' }, LiteStyles.padding15, LiteStyles.justifySpaceAround]} >
					<Item rounded >
						<Input placeholder="Nickname" onChangeText={text => setName(text)} value={name} />
					</Item>
					<Item rounded >
						<Input placeholder="Room Id" onChangeText={text => setRoom(text)} value={room} />
					</Item>
					<Button iconRight rounded info onPress={navigate}>
						<Text>Next</Text>
						<Icon name='arrow-forward' />
					</Button>
				</View>
			</View>
		</SafeAreaView>
	)
}

export { StarterScreen }