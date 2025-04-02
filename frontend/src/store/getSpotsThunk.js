import { csrfFetch } from "./csrf";


  // Action Types

const GET_ALL_SPOTS = '/spots/spots';
const DELETE_A_SPOT = '/spotCards/spotId';
const CREATE_A_SPOT = '/createSpot/createSpot';
const EDIT_A_SPOT = '/spotCards/spotId';


  // Action Creators

const getAllSpotsAction = (data) => ({
    type: GET_ALL_SPOTS
    payload: data
})

const deleteSpotAction = (data) => ({
    type: DELETE_A_SPOT,
    payload: data
})

const createSpotAction = (data) => ({
    type: CREATE_A_SPOT,
    payload: data
})

const editSpotAction = (data) => ({
    type: EDIT_A_SPOT,
    payload: data
})

// Thunks

// GET SPOTS ----
export const getSpotsThunk = () => async (dispatch) => {
    // console.log('we are here')

    try {
        const res = await csrfFetch('/api/spots');
        if (res.ok) {

            // Get The Data

            const data = await res.json();
            dispatch(getAllSpotsAction(data.Spots))
            // console.log(data);

        } else {
            throw res;
        }
    } catch (e) {
        console.log(e);
    }
}


// CREATE SPOT ----
export const createSpotThunk = (newSpot) => async (dispatch) => {

    try {
        newSpot.price = parseInt(newSpot.price);
        const options = {
            method: 'POST',
            // headers: { 'content-Type': 'application/json' },
            body: JSON.stringify(newSpot)
        }
        const res = await csrfFetch('/api/spots/create', options);
        if (res.ok) {
            const data = await res.json();
            dispatch(createSpotAction(data))

            return data;

        } else {
            throw res
        }

    } catch (errResponse) {
        return errResponse
    }
}

  // DELETE SPOT ----
export const deleteSpotThunk = () => async (dispatch) => {

    try {
        const res = await csrfFetch('/api/spots/:id/delete');
        if (res.ok) {

            const data = await res.json();
            dispatch(deleteSpotAction(data.Spots))

        } else {
            throw res;
        }
    } catch (e) {
        console.log(e);
    }
}

  // EDIT SPOT ----
export const editSpotsThunk = () => async (dispatch) => {

    try {
        const res = await csrfFetch('/api/spots/:id/edit');
        if (res.ok) {


            const data = await res.json();
            dispatch(editSpotAction(data.Spots));

        } else {
            throw res;
        }
    } catch (e) {
        console.log(e);
    }
}


//   Normalizing State 

   const initialState = { 
            Spots: [],
            byId: {}
        };

// Reducers ----

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_SPOTS: {
            const spotsArr = action.payload;

            //    Make a New Spot in Memory

            newState = { ...state } // Make a Copy of State
            newState.Spots = spotsArr;

            let newByIdSpots = {};

            for (let spot of spotsArr) {
                newByIdSpots[spot.id] = spot

                // console.log(spot, '-> this is a spot')
            }

            // console.log(newState, 'this is newState')
            // console.log(spotsArr, 'hi');

            newState.byId = newByIdSpots
            return newState;
        }

        // case DELETE_A_SPOT: {

        //     newState = { ...state }
        //     let spot = action.payload
        //     let newById = { ...newState.byId }
        //     delete newById(spot.id)

        //     newState.byId = newById
        //     const newSpots = newState.Spots.filter(filteredSpot => {
        //         return filteredSpot.id !== spot.id
        //     })

        //     newState.Spots = newSpots;
        //     return newState;
        // }
        // case EDIT_A_SPOT: {

        //     newState = { ...state }
        //     let spot = action.payload
        //     let newById = { ...newState.byId }
        //     edit newById(spot.id)

        //     newState.byId = newById
        //     const newSpots = newState.Spots.filter(filteredSpot => {
        //         return filteredSpot.id !== spot.id
        //     })

        //     newState.Spots = newSpots;
        //     return newState;
        // }
        // case CREATE_A_SPOT: {

        //     newState = { ...state }
        //     let spot = action.payload
        //     let newById = { ...newState.byId }
        //     create newById(spot.id)

        //     newState.byId = newById
        //     const newAllSpots = newState.allSpots.filter(filteredSpot => {
        //         return filteredSpot.id !== spot.id
        //     })

        //     newState.allSpots = newAllSpots;
        //     return newState;
        // }

        default:
            return state;
    }
}

export default spotsReducer;


