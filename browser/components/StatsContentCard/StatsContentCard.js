import React from 'react';
import './StatsContentCard.scss';
import PropTypes from 'prop-types';


const StatsContentCard = (props) => {
  const { godName, imageUrl, featureStats } = props;

  return (
    <div>
      <h1>God name: {godName}</h1>
      <img src={imageUrl} alt="image of god" />
      <div>
        {Object.keys(featureStats).map(stat => <p>{stat}: {featureStats[stat]}</p>)}
      </div>
    </div>
  )
}

StatsContentCard.propTypes = {
  imageUrl: PropTypes.string,
  godName: PropTypes.string,
  featureStats: PropTypes.object
}

export default StatsContentCard;
