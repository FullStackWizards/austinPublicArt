import {FETCH_GOOGLE} from '../actions/index'

const INITIAL_STATE = {all: [], post: null};


export default function(state = INITIAL_STATE, action){
	switch(action.type){
		case FETCH_GOOGLE:
			return action.payload

		default:
			return state;

	}
}