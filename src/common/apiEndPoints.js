
const Host = {
  ROOT: "http://localhost:3000",
  BACKEND: (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? "http://localhost:3005" : "" ,
  PREFIX: "/v1/api", 
}; 
  
const ApiEndpoints = { 
  IdsEndpoints: { 
    route: `${Host.PREFIX}/ids`,
    start: `/start`, 
    stop:`/stop`
  },

};
 
export {ApiEndpoints , Host}