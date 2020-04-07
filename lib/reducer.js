import { DELETE_ITEM, PRINT_ITEM, TOGGLE_CHECK } from './actions';

const initialState = {
    deviceType:"",
    count:4,
    users: [
        {
            id:1,
            name:"Name A", 
            completedTasks:5, 
            totalTasks:10,
            checked:false
        },
        {
            id:2,
            name:"Name B", 
            completedTasks:5, 
            totalTasks:10,
            checked:false
        },
        {
            id:3,
            name:"Name C", 
            completedTasks:5, 
            totalTasks:10,
            checked:false
        },
        {
            id:4,
            name:"Name D", 
            completedTasks:5, 
            totalTasks:10,
            checked:false
        }
    ], 
    deletedUsers:{
        users:[],
        count:0
    },
    canEdit:false
}

 export default function reducer(state = initialState, action) {

    const newState = {...state};
    if (typeof state === 'undefined') {
        return state
    }

    var p = {
        id:5,
        name:"Name E", 
        completedTasks:5, 
        totalTasks:10,
        checked:true

    }

    

    if(action.type == 'SET_DEVICE_TYPE'){
        newState.deviceType = action.args.deviceType;
    }
    if(action.type == 'DELETE_ITEM'){

        var delIds = newState.deletedUsers;
        
        let result = (newState.users).filter(item => !delIds.includes(item.id) );
        newState.deletedUsers.push(result);
        newState.users = result;
        newState.count =  newState.users.length;
    }
    if(action.type == 'ENABLE_EDIT'){
        newState.canEdit = !newState.canEdit;
    } 

    if(action.type == "TOGGLE_CHECK"){

        newState.deletedUsers.users.push(action.args);
        newState.deletedUsers.count += 1;
        
       
        var singleItem = (newState.users).find(item =>  item.id == action.args);
        singleItem.checked = !singleItem.checked;  
        newState.changed = true;

    }
    
    return newState;
}