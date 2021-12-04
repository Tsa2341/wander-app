
import '../fbconfig'
import firebase from 'firebase';


export default function mapReducer(state, action) {
    switch (action.type) {
        case "ADD":

            //Check if the payoad alredy exist in the state
            for (const el of state.store) {
                for (const obj of action.payload) {
                    if (obj.address === el.address) {
                        return state;
                    }
                }
            }
            
            var newState = { ...state };

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
            return { store: action.payload ,  map: state.map};
        case 'MAP':
            var newState = { ...state };
            newState.map = action.payload;
            return newState;
        default:
            return state;
    }
}