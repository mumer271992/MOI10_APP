
const defaultListState = {
    lists: []
}

export default (state = defaultListState, action) => {
    switch(action.type){
        case 'ADD_LIST':
            return [
                ...state,
                action.post
            ]
        case 'SET_LISTS':
            return [
                ...action.lists
            ]
        default: 
            return state;
    }
}