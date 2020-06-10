//This class will be responsible for processing data sent from the server
//to the client. An instance of this class will be part of the playback's component state.
// More elaborate descrptions avsailable below.

import Routes from "../../Playback/Routes";
class HTTPClientEndPoint {
  constructor(setState) {
    //this.setState holds a reference to the state object
    this.setState = setState;
    this.keyHandlerStore = {};
    //init is called to pull data needed to init the app from the
  }

  //This function maps key (most likely urls) -> handler functions
  // When  a HTTPServiceComponent sends a request to a specific url on the
  //server it will recieve a response which should also have a copy of said specific url value
  // This function registers a handler function which can then be used to process data
  // sent as the result of sending requests to a specific url. For example, GET /routelist will may return a route list [route1,route2,route3],
  // and handlerfunction can be used to process that route list and pass it off to appstate.
  registerUrlStateHandler(key, handlerFunction) {
    //Here I check that the url/key is a string type and that
    //handlerfunction is indeed a function object.
    let urlTypeCheck = typeof key === "string";

    //if both checks pass, then assign the function as a callback to the handlerstore.
    if (urlTypeCheck) this.keyHandlerStore[key] = handlerFunction;
  }

  processHTTPresponse(key, data) {
    //Here, I check that type of url is string, and
    // I have forgone checking the data for now.
    // I don't know if there are scenarious where data
    // could be empty and yet we would still like to run
    //  a particular handler mapped to a key.
    let success = false; // used to return the success of promises/handlerfunction calls
    let keyTypeCheck = typeof key === "string";
    let handlerFunction = this.keyHandlerStore[key];
    let functionTypeCheck =
      handlerFunction !== undefined && handlerFunction instanceof Object;

    //if key and handlerfunction are valid.,
    if (keyTypeCheck && functionTypeCheck) {
      success = handlerFunction(data); //pass off data to handlerfunction which should update playback state.

      return success;
    }
  }

  init = () => {
    return this.keyHandlerStore[Routes.init]();
  };
}

export default HTTPClientEndPoint;
