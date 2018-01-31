import React from 'react';
import './StatsContentCard.scss';
import PropTypes from 'prop-types';


const StatsContentCard = (props) => {
  const { godName, imageUrl, stat, label } = props;

  return (
    <div className='stat-content-card'>
      <div className='stat-content-card-label'>
        <p className="stat-content-card-label-god-name">{godName}</p>
        <p>{label}:</p>
        <p className="stat-content-card-label-most-kill">{stat}</p>
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
