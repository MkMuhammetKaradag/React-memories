import * as actionTypes from '../constans/actionTypes'
import * as api  from '../api'

export const signin=(formData,history)=> async(dispatch)=>{
    try {
        const {data}=await api.signIn(formData)
        dispatch({type:actionTypes.AUTH,payload:data})
        history.push('/')
    } catch (error) {
        console.log(error);
    }
}
export const signup =(formData,history)=> async(dispatch)=>{
    try {
        //console.log("burası actions");
        const {data}=await api.signUp(formData)
        
        dispatch({type:actionTypes.AUTH,payload:data})
        history.push('/')
    } catch (error) {
        console.log(error);
    }
}