import { useContext } from 'react';
import { YmapsContext } from '../../../contexts/YmapsContext/YmapsContextType';

export const useYmapsContext = () => useContext(YmapsContext);
