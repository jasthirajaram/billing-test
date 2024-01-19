import axios from "axios";
 
const BASE_URL = "http://localhost:8080"; 
 
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};
 
export const UserSignUpService = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/registerr`, data);
    return response.data;
  } catch (error) {
    console.error("User Sign Up Error:", error);
    throw error;
  }
};
 
export const UserLoginService = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/token`, data);
    return response.data;
  } catch (error) {
    console.error("User Login Error:", error);
    throw error;
  }
};
 
// export const awsService = async (service, startDate, endDate, months) => {
//   try {
//     let endpoint = `/aws/billing-details`;
 
//     if (service && startDate && endDate) {
//       endpoint += `?service=${service}&startDate=${startDate}&endDate=${endDate}`;
//     } else if (service && months) {
//       endpoint += `?service=${service}&months=${months}`;
//     } else if (startDate && endDate) {
//       endpoint += `?startDate=${startDate}&endDate=${endDate}`;
//     } else if (months) {
//       endpoint += `?months=${months}`;
//     } else {
//       throw new Error('Invalid parameters');
//     }


//     const response = await axios.get(`${BASE_URL}${endpoint}`, {
//       headers: getAuthHeaders(),
//     });
//     return response.data;
//   } catch (error) {
//     console.error("AWS Service Error:", error);
//     throw error; 
//   }
// };

export const awsService = async (service, startDate, endDate, months) => {
  try {
    let endpoint = `/aws/billing-details`;
 
    const queryParams = new URLSearchParams();

    queryParams.append('service', service || '');
    queryParams.append('startDate', startDate || '');
    queryParams.append('endDate', endDate || '');
    queryParams.append('months', months || '');

    const queryString = queryParams.toString();

    if (queryString) {
      endpoint += `?${queryString}`;
    }

    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("AWS Service Error:", error);
    throw error; 
  }
};

 
// export const gcpService = async (serviceDescription, startDate, endDate, months) => {
//   try {
//     let endpoint = '/gcp/details';
 
//     if (serviceDescription && startDate && endDate) {
//       endpoint += `?serviceDescription=${serviceDescription}&startDate=${startDate}&endDate=${endDate}`;
//     } else if (serviceDescription && months) {
//       endpoint += `?serviceDescription=${serviceDescription}&months=${months}`;
//     } else if (startDate && endDate) {
//       endpoint += `?startDate=${startDate}&endDate=${endDate}`;
//     } else if (months) {
//       endpoint += `?months=${months}`;
//     } else {
//       throw new Error('Invalid parameters');
//     }
 
//     const response = await axios.get(`${BASE_URL}${endpoint}`, {
//       headers: getAuthHeaders(),
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Gcp Service Error:', error);
//     throw error;
//   }
// };

export const gcpService = async (serviceDescription, startDate, endDate, months) => {
  try {
    let endpoint = '/gcp/details';

    const params = {
      serviceDescription,
      startDate,
      endDate,
      months,
    };

    const queryString = Object.entries(params)
      .map(([key, value]) => value !== undefined ? `${key}=${encodeURIComponent(value)}` : `${key}=`)
      .join('&');

    if (queryString) {
      endpoint += `?${queryString}`;
    }

    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Gcp Service Error:', error);
    throw error;
  }
};

 
 
 
export const azureService = async (ResourseType, startDate, endDate, months) => {
  try {
    let endpoint = '/azure/details';
 
    if (ResourseType && startDate && endDate) {
      endpoint += `?ResourseType=${ResourseType}&startDate=${startDate}&endDate=${endDate}`;
    } else if (ResourseType && months) {
      endpoint += `?ResourseType=${ResourseType}&months=${months}`;
    } else if (startDate && endDate) {
      endpoint += `?startDate=${startDate}&endDate=${endDate}`;
    } else if (months) {
      endpoint += `?months=${months}`;
    } else {
      throw new Error('Invalid parameters');
    }
 
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Azure Service Error:', error);
    throw error;
  }
};