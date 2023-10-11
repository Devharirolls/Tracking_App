import { useContext } from 'react';
import { Context as TrackContext } from '../context/TrackContext';
import { Context as LocationContext } from '../context/LocationContext';
import { navigate } from '../navigationRef';

export default () => {
  const { CreateTrack } = useContext(TrackContext);
  const {
    state: { locations, name },
    reset
  } = useContext(LocationContext);

  const SaveTrack = async () => {
    await CreateTrack(name, locations);
    reset();
    navigate('main');
  };

  return [SaveTrack];
};