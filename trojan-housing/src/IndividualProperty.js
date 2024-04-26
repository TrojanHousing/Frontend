import React from 'react';
import { useParams } from 'react-router-dom';

const IndividualProperty = () => {
  const { propertyId } = useParams();

  // Placeholder data or fetch from backend
  return (
    <div className="individual-property">
      <h1>Property Details for ID: {propertyId}</h1>
      {/* Implement fetching logic or display details based on propertyId */}
    </div>
  );
};

export default IndividualProperty;
