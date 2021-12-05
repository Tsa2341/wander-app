import firebase from 'firebase';

const getDb = async (dispatch) => {
  
    //check if the database fetch has fetched and prevent it to do it again
    await firebase.database().ref('store').once('value', (snapshots) => {

        if (snapshots.val() !== null) {
          dispatch({
            type: 'SET',
            payload: snapshots.val()
          });
        };
  
        console.log('dispatched');

    }).then(() => {
        console.log("setted data successfully");
    }).catch((error)=>{
        throw new Error("couldn't fetch from the database");
    });
}

export default getDb;

