// These are our action types
export const SET_DEVICE_TYPE = "SET_DEVICE_TYPE"
export const PRINT_ITEM = "PRINT_ITEM"
export const TOGGLE_CHECK = "TOGGLE_CHECK"


// Now we define actions
export function getDeviceType(){
    return {
        type: SET_DEVICE_TYPE,
        payload: {deviceType : "test"}
    }
}
/*
export function printItem(itemIndex){
    return {
        type: PRINT_ITEM,
        itemIndex
    }
}

export function togglCheck(itemIndex){
    return {
        type: TOGGLE_CHECK,
        itemIndex
    }
} */