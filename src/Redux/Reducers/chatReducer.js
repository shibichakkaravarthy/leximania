import ACTIONTYPES from '../ActionTypes.js'

const INITIAL_STATE = {
	chats: [],
	chatsLength: 0
}

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case ACTIONTYPES.INSERTCHAT:
			return { ...state, chats: action.payload.chat, chatsLength: action.payload.chat.length }

		default:
			return state
	}
}