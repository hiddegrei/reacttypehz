export const initialState={
    user:null,profile:[],username:null,password:null
    
    
}


const reducer=(state:any,action:any)=>{
    // console.log(action)
    switch(action.type){
        
            case 'SET_USER':
             return{
                ...state,user:action.user
                 }
                
               
                  
                
                
                case 'SET_PROFILE':
                    return{
                      ...state,profile:action.profile
                    }

                    case 'SET_INLOG':
                    return{
                      ...state,username:action.username,password:action.password
                    }
                   
                   
                    default:return state;     
                
    }
}
export default reducer