import React from 'react';
import './StatsContentCard.scss';
import PropTypes from 'prop-types';


const StatsContentCard = (props) => {
  const { godName, imageUrl, stat, label } = props;

  return (
    <div className="stat-content-card">
      <img src={imageUrl} alt={`${godName}_image`} />
      <div className="stat-content-card-info">
        <h3>{godName}</h3>
        <p>{label}</p>
        <p>{stat}</p>
      </div>
    </div>
  )
}

StatsContentCard.propTypes = {
  imageUrl: PropTypes.string,
  godName: PropTypes.string,
  label: PropTypes.string,
  stat: PropTypes.string
}

export default StatsContentCard;
