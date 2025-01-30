
const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
 
// export const ENDPOINTS = {
//     register: "/auth/register",
//     getAllUsers: "dashboard/getusers"
//   };

export const API_ROUTES = {
    AUTH:{
        BASE:"",
        LOGIN:"loginuser"
    },
    USER:{
        BASE:"",
        GETUSER:"getusers",
        ADDUSER:'userdetails',
        DELETEUSER:"deleteuser",
        UPDATEUSER:"updateuser",
    },
    GETALLUSERS:{
        BASE:"",
        GETALLUSERS:"getusers"
    },
    STATICFILES:"public/uploads/"
}

export const getEndpointUrl = (endpoint: string): string => {
    return `${baseUrl}${endpoint}`;
  };

