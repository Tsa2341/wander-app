
import '../fbconfig'
import firebase from 'firebase';


export default function mapReducer(state, action) {
    switch (action.type) {
        case "ADD":

            const newState = { ...state };
            
            //update the new immutable state
            newState.store = [...state.store, ...action.payload];


            //update the state on the database
            firebase.database().ref('store').set(newState.store, (error) => {
                if (error) {
                    console.error(error)
                } else {
                    console.log("Saved to DataBAse successfully");
                }
            }).catch(error => console.error(error));


            return newState;

        case 'SET':
            return { store: action.payload };
        case 'MAP':
            return { ...state, map: action.payload };
        default:
            return state;
    }
}