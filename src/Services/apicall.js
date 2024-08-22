const APIURL = "http://192.168.226.159:8081/api/board";

export const getLeaderBoard = async (data) => {
    try {
      const response = await fetch(APIURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(data),
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