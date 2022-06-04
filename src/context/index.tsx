import React from "react"
import {STATE, ACTION, SHOP} from "../types"


const reducer: React.Reducer<STATE, ACTION> = (state, action) => {

    let nState;

    switch(action.type){

        case "UPDATE_OPTION_BOOL":
            nState = state;
            nState.option[action.name] = action.value as boolean;
            return nState;
        
        case "UPDATE_OPTION_NUM":
            nState = state;
            nState.option[action.name] = action.value as number;
            return nState;

        case "UPDATE_GENRE_SET":
            nState = state;
            if(action.value){
                nState.option["genreSet"].add(action.name)
            }else{
                nState.option["genreSet"].delete(action.name)
            }
            return nState;

        case "SEARCHING_BEGIN":
            return({
                ...state,
                isSearching: true,
            });
        
        case "SEARCHING_END":
            return({
                ...state,
                isSearching: false,
            });

        case "UPDATE_SHOPS":
            return({
                ...state,
                shops: action.shops,
            });

        default:
            return state;
    }
}

const initialState: STATE = {
    option: {
        wifi: false,
        card: false,
        wine: false,
        nihonsyu: false,
        free_drink: false,
        free_food: false,
        budgetLower: 0,
        budgetUpper: 99999,
        genreSet: new Set(),
        order: 4,
        range: 4,
    },
    shops: [] as Array<SHOP>,
    isSearching: false,
}

export const DataStoreContext = React.createContext({} as {
    state: STATE,
    dispatch: React.Dispatch<ACTION>,
})

export const DataStoreContextProvider = (props: any) => {

    const [state, dispatch] = React.useReducer(reducer, initialState);

    return(
        <DataStoreContext.Provider
            value = {{
                state,
                dispatch,
            }}
        >
        {props.children}
        </DataStoreContext.Provider>
    )
}

