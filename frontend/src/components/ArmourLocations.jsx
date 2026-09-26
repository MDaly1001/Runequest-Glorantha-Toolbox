// import armour data from the JSON file
// then create a component list of armour locations
// then have equipment as checkboxes to equip
// categorise equipment by location and section
// mark what is under-armour and over-armour
// then create a paper-doll panel to the left
// have checkboxes on armour to efffect the locations of the paper doll

import { useState } from 'react';
import ArmourTable from './ArmourTable.jsx';
import armourLocationsImg from '../assets/armour-locations.png';

const ArmourLocations = () => {
  const [selectedArmour, setSelectedArmour] = useState([]);

  const toggleArmour = (armourItem) => {
    setSelectedArmour(prev => {
      if (prev.includes(armourItem)) {
        return prev.filter(item => item !== armourItem);
      } else {
        return [...prev, armourItem];
      }
    });
  };

  return (
    <div>
        <h2>Armour Locations</h2>
        <img src={armourLocationsImg} alt="Armour Locations" />
        <ArmourTable />
    </div>
  );
};

export default ArmourLocations;