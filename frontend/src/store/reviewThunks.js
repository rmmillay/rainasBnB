import { csrfFetch } from "./csrf";


// Action Types

const GET_SPOT_REVIEWS = '/spots/reviews';
const DELETE_A_REVIEW = '/spots/reviews/delete';
const CREATE_A_REVIEW = '/spots/reviews/create';
const EDIT_A_REVIEW = '/spots/reviews/edit';


// Action Creators

const getReviewsAction = (data) => ({
    type: GET_SPOT_REVIEWS,
    payload: data
})

const deleteReviewAction = (data) => ({
    type: DELETE_A_REVIEW,
    payload: data
})

const createReviewAction = (data) => ({
    type: CREATE_A_REVIEW,
    payload: data
})

const editReviewAction = (data) => ({
    type: EDIT_A_REVIEW,
    payload: data
})

// Thunks

// GET Reviews ----
export const getReviewsThunk = () => async (dispatch) => {
    // console.log('we are here')

    try {
        const res = await csrfFetch('/api/spots/reviews');
        if (res.ok) {

            // Get The Data

            const data = await res.json();
            dispatch(getReviewsAction(data.Reviews))
            // console.log(data);

        } else {
            throw res;
        }
    } catch (e) {
        console.log(e);
    }
}


// CREATE Review ----
export const createReviewThunk = (newReview) => async (dispatch) => {

    try {
        newReview.rating = parseInt(newReview.rating);
        const options = {
            method: 'POST',
            // headers: { 'content-Type': 'application/json' },
            body: JSON.stringify(newReview)
        }
        const res = await csrfFetch('/api/spots/reviews/create', options);
        if (res.ok) {
            const data = await res.json();
            dispatch(createReviewAction(data))

            return data;

        } else {
            throw res
        }

    } catch (errResponse) {
        return errResponse
    }
}

// DELETE Review ----
export const deleteReviewThunk = () => async (dispatch) => {

    try {
        const res = await csrfFetch('/api/spots/reviews/delete');
        if (res.ok) {

            const data = await res.json();
            dispatch(deleteReviewAction(data.Reviews))

        } else {
            throw res;
        }
    } catch (e) {
        console.log(e);
    }
}

// EDIT Review ----
export const editReviewsThunk = () => async (dispatch) => {

    try {
        const res = await csrfFetch('/api/spots/reviews/edit');
        if (res.ok) {


            const data = await res.json();
            dispatch(editReviewAction(data.Reviews));

        } else {
            throw res;
        }
    } catch (e) {
        console.log(e);
    }
}


//   Normalizing State 

const initialState = {
    Reviews: null,
    avgRating: null,
    createReview: null
};

const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_SPOT_REVIEWS: {
            const reviewsArr = action.payload;

            newState = { ...state } // Make a Copy of State
            newState.reviews = reviewsArr;

            let newByIdReviews = {};

            for (let review of reviewsArr) {
                newByIdReviews[review.id] = review
            }
            // console.log(review, '-> this is a review')

            newState.byId = newByIdReviews
            return newState;
       }

// avgRating: {
//     ...state.avgRating,
//     reviewsArr.action.avgRating

// }

//     case EDIT_A_REVIEW: {
//       newState = { ...state }
//         let REVIEW = action.payload
//         let newById = { ...newState.byId }
//         edit newById(review.id)

//     newState.byId = newById
//     const newReview = newState.Review.filter(filteredReview => {
//         return filteredReview.id !== Review.id
//     })

//     newState.Review = newReview;
//     return newState;
// }

//     case CREATE_A_REVIEW: {

//     newState = { ...state }
//     let review = action.payload
//     let newById = { ...newState.byId }
//        create newById(review.id)

//     newState.byId = newById
//     const newAllReviews = newState.Reviews.filter(filteredReview => {
//         return filteredReview.id !== review.id
//     })

//     newState.Review = newReviews;
//     return newState;
// }

default:
    return state;
}
}


export default reviewsReducer;
