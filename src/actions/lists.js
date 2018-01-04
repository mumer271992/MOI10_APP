import axios from 'axios';

export const addList = (list = {}) => ({
    type: 'ADD_LIST',
    list: list
})

export const setLists = (lists) => ({
    type: 'SET_LISTS',
    lists
})
export const startSetLists = () =>  {
    return (dispatch) => {
        return axios.get('http://localhost:1337/list').then((res) => {
            console.log("Lists fetched");
            console.log(res.data);
        })
    }
}

export const addListItem = (list_item) => ({
    type: 'ADD_ITEM',
    item: list_item
})
