const initialState = {
    login: false,
    username: '',
    name: '',
    filter: {
        evaluate: {
            supplier: '',
            year: '',
            month: ''
        }
    },
    version: 0,
    objectSelected: null,
    layoutFilters: null,
    layout: {},
    sa: [],
    mq: [],
    shift: '',
    activeMenuToolbar: '',
    cardEmp: ''
}

const IndexReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SHIFT':
            return {
                ...state,
                shift: action.payload
            }
        case 'SET_LAYOUT_FILTER_SELECTED':
            return {
                ...state,
                layoutFilter: action.payload
            }
        case 'SET_OBJECT_SELECTED':
            return {
                ...state,
                objectSelected: action.payload
            }
        case 'SET_LAYOUT_SELECTED':
            return {
                ...state,
                layout: action.payload.layout,
                sa: action.payload.sa,
                mq: action.payload.mq,
            }
        case 'UPDATE_LAYOUT':
            return {
                ...state,
                layout: action.payload
            }
        case 'LOGIN':
            return {
                ...state,
                name: action.payload.name,
                login: true,
                empcode: action.payload.empcode,
                layoutFilter: null
            }
        case 'FILTER_CHANGE':
            return {
                ...state,
                filter: action.payload
            }
        case 'OBJECT_SELECT':
            return {
                ...state,
                objectselect: action.payload
            };
        case 'RESET':
            var resetState = initialState
            resetState.version = action.payload.version;
            resetState.login = false;
            return resetState;
        case 'UPDATE_MENU_TOOLBAR':
            console.log(action.payload)
            return {
                ...state,
                activeMenuToolbar: action.payload
            }
        default:
            return state
    }
}
export default IndexReducer;
