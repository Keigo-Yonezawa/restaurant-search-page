import React from "react"


const reducer = (state, action) => {

    let nState;

    switch(action.type){

        case "UPDATE_OPTION":
            nState = state;
            nState.option[action.name] = action.value
            console.log(nState);
            return nState;

        case "UPDATE_GENRE_SET":
            nState = state;
            if(action.value){
                nState.option["genreSet"].add(action.name)
            }else{
                nState.option["genreSet"].delete(action.name)
            }
            console.log(nState);
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

const initialState = {
    option: {
        wifi: 0,
        card: 0,
        wine: 0,
        nihonsyu: 0,
        free_drink: 0,
        free_food: 0,
        budgetLower: 0,
        budgetUpper: 99999,
        genreSet: new Set(),
        order: 4,
        range: 4,
    },
    shops: [],
    isSearching: false,
}

export const DataStoreContext = React.createContext(initialState);

export const DataStoreContextProvider = (props) => {

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

