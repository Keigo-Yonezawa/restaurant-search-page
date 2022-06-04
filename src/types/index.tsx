
export type GENRE_CODE = | "G001" | "G002" | "G003" | "G004" | "G005" | "G006" | "G007" | "G008" | "G009" | "G001" | "G011" | "G012" | "G013" | "G014" | "G015" | "G016" | "G017";

export type SHOP = any; // あとで変更

export type OPTION_NAME =  | "wifi" | "card" | "wine" | "nihonsyu" | "free_drink" | "free_food" | "budgetLower" | "budgetUpper" | "order" | "range";

export type OPTION_NAME_BOOL = | "wifi" | "card" | "wine" | "nihonsyu" | "free_drink" | "free_food";

export type OPTION_NAME_NUM = | "budgetLower" | "budgetUpper" | "order" | "range";

export type STATE = {
    option: {
        wifi: boolean,
        card: boolean,
        wine: boolean,
        nihonsyu: boolean,
        free_drink: boolean,
        free_food: boolean,
        budgetLower: number,
        budgetUpper: number,
        genreSet: Set<GENRE_CODE>,
        order: number,
        range: number,
    },
    shops: Array<SHOP>,
    isSearching: boolean,
}

export type ACTION =
    | {type: "UPDATE_OPTION_BOOL", name: OPTION_NAME_BOOL, value: boolean}
    | {type: "UPDATE_OPTION_NUM", name: OPTION_NAME_NUM, value: number}
    | {type: "UPDATE_GENRE_SET", name: GENRE_CODE, value: boolean}
    | {type: "SEARCHING_BEGIN"}
    | {type: "SEARCHING_END"}
    | {type: "UPDATE_SHOPS", shops: Array<SHOP>}

export type CHECK_EVENT = {
    name: OPTION_NAME_BOOL,
    isChecked: boolean,
}

export type GENRE_EVENT = {
    name: GENRE_CODE,
    isChecked: boolean,
}

export type RADIO_EVENT = {
    name: OPTION_NAME_NUM,
    option_id: number,
}

export type DUAL_RANGE_EVENT = {
    name: OPTION_NAME_NUM,
    value: number,
}