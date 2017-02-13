import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

/**
 |--------------------------------------------------
 | Types
 |--------------------------------------------------
 */
export const POST_CREATE_REQUEST = 'EMPLOYEE_CREATE_REQUEST';
export const POST_CREATE_SUCCESS = 'EMPLOYEE_CREATE_SUCCESS';
export const POST_CREATE_FAILURE = 'EMPLOYEE_CREATE_FAILURE';
export const POST_UPDATE_REQUEST = 'POST_UPDATE_REQUEST';
export const POST_UPDATE_SUCCESS = 'POST_UPDATE_SUCCESS';
export const POST_UPDATE_FAILURE = 'POST_UPDATE_FAILURE';
export const POST_DELETE_REQUEST = 'POST_DELETE_REQUEST';
export const POST_DELETE_SUCCESS = 'POST_DELETE_SUCCESS';
export const POST_DELETE_FAILURE = 'POST_DELETE_FAILURE';
export const POST_LIST_GET_REQUEST = 'POST_LIST_GET_REQUEST';
export const POST_LIST_GET_SUCCESS = 'POST_LIST_GET_SUCCESS';
export const POST_LIST_GET_FAILURE = 'POST_LIST_GET_FAILURE';

/**
 |--------------------------------------------------
 | Actions
 |--------------------------------------------------
 */
export const createPost = ({ title, description }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: POST_CREATE_REQUEST });

    firebase.database().ref(`/users/${currentUser.uid}/post`)
      .push({ title, description })
      .then(() => {
        dispatch({ type: POST_CREATE_SUCCESS });

        Actions.postList({ type: 'reset' });
      })
      .catch(() => {
        dispatch({ type: POST_CREATE_FAILURE, payload: 'Post creation failed' });
      });
  };
};

export const updatePost = ({ title, description, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: POST_UPDATE_REQUEST });

    firebase.database().ref(`/users/${currentUser.uid}/post/${uid}`)
      .set({ title, description })
      .then(() => {
        dispatch({ type: POST_UPDATE_SUCCESS });

        Actions.postList({ type: 'reset' });
      })
      .catch(() => {
        dispatch({ type: POST_UPDATE_FAILURE, payload: 'Post edition failed' });
      });
  };
};

export const deletePost = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: POST_DELETE_REQUEST });

    firebase.database().ref(`/users/${currentUser.uid}/post/${uid}`)
      .remove()
      .then(() => {
        dispatch({ type: POST_DELETE_SUCCESS });

        Actions.postList({ type: 'reset' });
      })
      .catch(() => {
        dispatch({ type: POST_DELETE_FAILURE, payload: 'Post deletion failed' });
      });
  };
};

export const getPostList = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: POST_LIST_GET_REQUEST });

    firebase.database().ref(`/users/${currentUser.uid}/post`)
      .on('value', (snapshot) => {
        dispatch({ type: POST_LIST_GET_SUCCESS, payload: snapshot.val() });
      });
  };
};

/**
 |--------------------------------------------------
 | Reducer
 |--------------------------------------------------
 */
const INITIAL_STATE = {
  list: [],
  error: '',
  loading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POST_CREATE_REQUEST:
      return { ...state, loading: true };
    case POST_CREATE_SUCCESS:
      return { ...state, error: '', loading: false };
    case POST_CREATE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case POST_UPDATE_REQUEST:
      return { ...state, loading: true };
    case POST_UPDATE_SUCCESS:
      return { ...state, error: '', loading: false };
    case POST_UPDATE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case POST_DELETE_REQUEST:
      return { ...state, loading: true };
    case POST_DELETE_SUCCESS:
      return { ...state, error: '', loading: false };
    case POST_DELETE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case POST_LIST_GET_REQUEST:
      return { ...state, loading: true };
    case POST_LIST_GET_SUCCESS:
      return { ...state, ...INITIAL_STATE, list: action.payload };
    case POST_LIST_GET_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
