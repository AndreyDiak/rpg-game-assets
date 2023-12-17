import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { AppStateType } from '../redux/store';
import { LocationInfo } from '../components/mapPage/LocationInfo';
import { companyActions } from '../redux/company-reducer';

export function MapPage() {
  const dispatch = useDispatch();
  const locations = useSelector((state: AppStateType) => state.company.locations);
  const [activeLocation, setActiveLocation] = useState(null as null | number);
  const [isLocationInfoShown, setIsLocationInfoShown] = useState(false);
  // тут должна быть модалка с открытием уровней . . .

  const onButtonClick = (activeLocationIndex: number) => {
    dispatch(companyActions.setActiveLocation(activeLocationIndex));

    setIsLocationInfoShown(true);
    setActiveLocation(activeLocationIndex);

    console.log();
  };

  return (
    <>

      <LocationInfo
        activeLocation={activeLocation}
        isLocationInfoShown={isLocationInfoShown}
        setIsActiveLocationShown={setIsLocationInfoShown}
      />

      <div className="map darken darken-4">
        {
          locations.map((location, index) => (
            <div className={`mapButton mapButton__${index + 1}`} key={index}>
              <div className="mapButtonTitle">
                {locations[index].title}
              </div>
              <button
                className="mapButtonTrack"
                onClick={() => onButtonClick(index)}
              />
            </div>
          ))
        }

      </div>
    </>
  );
}
