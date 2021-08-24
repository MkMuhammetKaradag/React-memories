import * as actionTypes from '../constans/actionTypes'
const reducer=(state={isLoading:true,posts:[]},action)=>{
   switch (action.type) {
       case actionTypes.FETCH_ALL:
            return{
                ...state,
                posts:action.payload.data,
                currentPage:action.payload.currentPage,
                numberOfPages:action.payload.numberOfPages,
            };
           
        case actionTypes.CREATE:
            return {...state,posts:[...state.posts,action.payload]};
        case actionTypes.UPDATE:
        case actionTypes.LIKE:
        case actionTypes.COMMENT:
            return {...state,posts:state.posts.map((post)=>post._id === action.payload._id ? action.payload:post)}
        case actionTypes.DELETE:
            return {...state,posts:state.posts.filter((post)=>post._id != action.payload)};
        case actionTypes.FETCH_BY_SEARCH:
            return{
                ...state,
                posts:action.payload,
            };
        case actionTypes.START_LOADING:
            return {...state,isLoading:true}
        case actionTypes.END_LOADING:
            return {...state,isLoading:false}
        case actionTypes.FETCH_POST:
            return{
                ...state,
                post:action.payload,
            };
        
            
       default:
           return state;
   }
    
}
export default reducer;