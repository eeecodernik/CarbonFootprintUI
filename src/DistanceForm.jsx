import React, { useState } from 'react';

const DistanceForm = () => {
  const [origins, setOrigins] = useState('');
  const [destinations, setDestinations] = useState('');
  const [distance, setDistance] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = 'AIzaSyCLSzLCkzirsebmEw2fg_ZOznuNvwvn8JM'; // Replace with your actual API key

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDistance(null);
    setError('');

    try {
      // Convert place names to place IDs
      const originPlaceId = await getPlaceId(origins, apiKey);
      const destinationPlaceId = await getPlaceId(destinations, apiKey);
      
      // Calculate distance using place IDs
      const data = await getDistanceMatrix(originPlaceId, destinationPlaceId, apiKey);
      
      if (data.status === 'OK') {
        const elements = data.rows[0].elements;
        if (elements.length > 0 && elements[0].status === 'OK') {
          setDistance(elements[0].distance.text);
        } else {
          setError('Unable to get distance. Please check the input values.');
        }
      } else {
        setError(`Error: ${data.error_message}`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="distance-form">
      <h2>Calculate Distance</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="origins">Origins:</label>
          <input
            type="text"
            id="origins"
            value={origins}
            onChange={(e) => setOrigins(e.target.value)}
            placeholder="Enter origin (e.g., 'New York')"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="destinations">Destinations:</label>
          <input
            type="text"
            id="destinations"
            value={destinations}
            onChange={(e) => setDestinations(e.target.value)}
            placeholder="Enter destination (e.g., 'Los Angeles')"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Calculating...' : 'Get Distance'}
        </button>
      </form>
      {distance && <p>Distance: {distance}</p>}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

// Helper functions
async function getPlaceId(placeName, apiKey) {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(placeName)}&key=${apiKey}`
      );
      const data = await response.json();
      console.log('API Response:', data); // Log the response for debugging
  
      if (data.status === 'OK' && data.results.length > 0) {
        return data.results[0].place_id;
      } else {
        throw new Error('Place not found');
      }
    } catch (error) {
      console.error('Error fetching place ID:', error);
      throw error;
    }
  }
  

async function getDistanceMatrix(origins, destinations, apiKey) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${encodeURIComponent(origins)}&destinations=${encodeURIComponent(destinations)}&key=${apiKey}`
  );
  const data = await response.json();
  return data;
}

export default DistanceForm;
