import { useOutletContext } from 'react-router-dom';
import { OutletContextType } from '../../../pages/Admin/Admin';

export function useAdminPopup() {
    return useOutletContext<OutletContextType>();
}
