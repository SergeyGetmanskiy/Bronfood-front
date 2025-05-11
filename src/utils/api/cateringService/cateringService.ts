import { CateringServiceMock } from './cateringServiceMock';

type TimeString = `${number}:${number}` | null;

interface DailyWorkingHours {
    open: TimeString;
    close: TimeString;
}

interface WorkingTime {
    schedule: {
        monday: DailyWorkingHours;
        tuesday: DailyWorkingHours;
        wednesday: DailyWorkingHours;
        thursday: DailyWorkingHours;
        friday: DailyWorkingHours;
        saturday: DailyWorkingHours;
        sunday: DailyWorkingHours;
    };
    is24h: boolean;
}

export type Catering = {
    /**
     * Venue's id
     */
    id: number;
    /**
     * Link to venue's image
     */
    photo: string;
    /**
     * Venue's name
     */
    name: string;
    /**
     * Venue's description
     */
    description?: string;
    /**
     * Venue's rating
     */
    rating: number;
    /**
     * Venue's address
     */
    address: string;
    /**
     * Venue's map coordinates
     */
    coordinates?: {
        latitude: number;
        longitude: number;
    };
    /**
     * Venue's tags
     */
    tags?: string[];
    /**
     * Venue's type
     */
    type: 'fastFood' | 'cafe' | 'cafeBar';
    /**
     * Venue's working hours for each day of the week
     */
    workingTime?: WorkingTime;
    /**
     * Deadline for order cancellation
     */
    cancellationDeadlineMinutes?: number | null;
};

export type Administrator = {
    id: string;
    login: string;
    password: string;
    catering: Catering;
};

export interface CateringService {
    getAdministrators: () => Promise<{ data: Administrator[] }>;
    getAdministratorById: (id: string) => Promise<{ data: Administrator }>;
    createAdministrator: (data: Omit<Administrator, 'id'>) => Promise<{ data: Administrator }>;
    updateAdministrator: (data: Partial<Administrator> & { id: string }) => Promise<{ data: Administrator }>;
    deleteAdministrator: (id: string) => Promise<{ success: boolean }>;

    getCaterings: () => Promise<{ data: Catering[] }>;
    getCateringById: (id: number) => Promise<{ data: Catering }>;
    createCatering: (data: Omit<Catering, 'id'>) => Promise<{ data: Catering }>;
    deleteCatering: (id: number) => Promise<{ success: boolean }>;
}

export const cateringService = new CateringServiceMock();
