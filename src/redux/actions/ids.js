import { START_LOADING, STOP_LOADING } from "../constants/loading";
import {SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE} from "../constans/message";
import { StartApi,StopApi} from "../../services/ids";

const Start = (mydata) => dispatch => {

  dispatch({ type: START_LOADING });

  StartApi(mydata)
    .then(({ data }) => {
      if (data.err === false) {
        dispatch({ type: STOP_LOADING });
        dispatch({ type: SHOW_SUCCESS_MESSAGE, payload: "extracted" })
      } else {
        dispatch({ type: STOP_LOADING });
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: data.msg })
      }
    })
    .catch((err) => {
      console.log("start api err ", err);
      dispatch({ type: STOP_LOADING });
      dispatch({ type: SHOW_ERROR_MESSAGE, payload: "something went wrong please try again" })
    });
};

const Stop = () => dispatch => {

  dispatch({ type: START_LOADING });

  StopApi() 
    .then(({ data }) => {
      if (data.err === false) {
        dispatch({ type: STOP_LOADING });
        dispatch({ type: SHOW_SUCCESS_MESSAGE, payload: "stoped" })
      } else {
        dispatch({ type: STOP_LOADING });
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: data.msg })
      }
    })
    .catch((err) => {
      console.log("start api err ", err);
      dispatch({ type: STOP_LOADING });
      dispatch({ type: SHOW_ERROR_MESSAGE, payload: "something went wrong please try again" })
    });
};



export { Start, Stop };