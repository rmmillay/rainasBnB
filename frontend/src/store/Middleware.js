export const Spots = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots");
    const data = await response.json();
    dispatch(Spots(data.Spots));
    return data;
}  