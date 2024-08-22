import React, { useState, useEffect } from 'react';
import { getLeaderBoard } from './Services/apicall';

export const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLeaderBoard();
        console.log('Leaderboard data successfully retrieved:', response);
        setLeaderboardData(response); // Update the state with the fetched data
      } catch (error) {
        console.error('Error retrieving leaderboard data:', error);
      }
    };

    fetchData(); // Call the fetch function on component load
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div className='container mt-5 ' >
      <table className="table ">
        <thead>
          <tr className='text-light background-color-success'>
            <th scope="col" className='text-success'>Rank</th>
            <th scope="col" className='text-success'>Name</th>
            <th scope="col" className='text-success' >Carbon Emitted</th>
            <th scope="col" className='text-success'>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.length > 0 ? (
            leaderboardData.map((item, index) => (
              <tr className='p-3' key={index}  >
                <td>{index+1}</td>
                <td>{item.user_name}</td>
                <td>{item.carbon_emission}</td>
                <td>{item.lead_points}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};


