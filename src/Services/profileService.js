// services/profileService.js
const API_URL = 'http://localhost:8081/api/trip'; // Replace with your API endpoint

const pythonURL = 'http://localhost:5000/extract-info'
// const pythonURL = 'http://192.168.226.67:5000/extract-info'
export const postProfileData = async (file) => {
  try {

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(file),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
};


export const postPython = async (file) => {
    try {
      const response = await fetch(pythonURL, {
        method: 'POST',
        
        body: file
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      return await response.json();
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
  };
  