import {TodolistType} from '../App';

type ActionType = {
    type: string
    [key: string]: any
}
export const todoListsReducer = (state: TodolistType[], action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.id)
        case 'ADD-TODOLIST':
            return state
        default:
            throw new Error('I don\'t understand this type')
    }
}

