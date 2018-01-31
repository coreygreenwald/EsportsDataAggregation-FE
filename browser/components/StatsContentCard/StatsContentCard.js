import React from 'react';
import './StatsContentCard.scss';
import PropTypes from 'prop-types';


const StatsContentCard = (props) => {
  const { godName, imageUrl, stat, label } = props;

  return (
    <div className='stat-content-card'>
      <h1>God name: {godName}</h1>
      <img src={imageUrl} alt="god_image" />
      <div>
        <ul>
          <li>{label}: {stat}</li>
        </ul>
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
