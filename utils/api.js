const BASE_URL = 'https://bizpal-api.onrender.com/api/v1';

// Replace your formEncode with this more robust version
const formEncode = (data) => {
  return Object.keys(data)
    .filter(key => data[key] !== null && data[key] !== undefined) // Clean empty data
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

export const apiRequest = async (endpoint, method, body = null, token = null) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        // Updated to match your API requirements
        'Content-Type': 'application/x-www-form-urlencoded', 
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      // Encode the body if it exists
      ...(body && { body: formEncode(body) }), 
    });

    const text = await response.text();
    
    try {
      return JSON.parse(text); 
    } catch (e) {
      console.error("Non-JSON Response:", text);
      return { success: false, message: "Server Error" };
    }
  } catch (error) {
    return { success: false, message: "Network error" };
  }
};