
const defaultListState = {
}

export default (state = defaultListState, action) => {
    switch(action.type){
        case 'SET_LIST':
            return {
                ...action.list
            }
        case 'ADD_ITEM': 
            let items = state.items;
            items.push(action.item);
            return {
                ...state,
                items
            }
        case 'GET_LIST':
            return {
                ...state
            }
        default: 
            return state;
    }
}