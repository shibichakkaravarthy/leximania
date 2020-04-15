import React from 'react'
import { View } from 'react-native'
import { Text } from 'native-base'

import { LiteStyles, gunMetal } from '../Styles'

export const Message = ({ message, user }) => {
	if(message.user === user) {
		return (
			<View style={[LiteStyles.padding5, LiteStyles.borderRadius5, LiteStyles.backgroundColorOrange, LiteStyles.margin5, { marginLeft: 50 }]} >
				<Text style={[ LiteStyles.textAlignRight, LiteStyles.fontColorWhite ]} >{message.user}</Text>
				<Text style={[ LiteStyles.textAlignRight, LiteStyles.fontColorWhite ]} >{message.text}</Text>
			</View>
		)
	}

	else if(message.user === 'admin') {
		return (
			<View style={[ LiteStyles.alignCenter ]} >
				<View style={[{ backgroundColor: (message.type==='success')?'green':gunMetal }, LiteStyles.padding5, LiteStyles.borderRadius5, LiteStyles.margin5]} >
					<Text style={[ LiteStyles.textAlignCenter, LiteStyles.fontColorWhite ]} >{message.text}</Text>
				</View>
			</View>
		)
	}

	else {
		return (
			<View style={[LiteStyles.padding5, LiteStyles.borderRadius5, LiteStyles.backgroundColorEmarald, LiteStyles.margin5, { marginRight: 50 }]} >
				<Text style={[ LiteStyles.textAlignLeft, LiteStyles.fontColorWhite ]} >{message.user}</Text>
				<Text style={[ LiteStyles.textAlignLeft, LiteStyles.fontColorWhite ]} >{message.text}</Text>
			</View>
		)
	}
}