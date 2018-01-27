export const setList = (list_data) => ({
    type: 'SET_LIST',
    list: list_data
})
export const addItem = (item) => ({
    type: 'ADD_ITEM',
    item
})

export const getList = () => ({
    type: 'GET_LIST'
})