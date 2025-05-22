import { FieldValues, SubmitHandler } from 'react-hook-form';
import { DAYS, TYPES } from '../../../../utils/api/cateringService/cateringService';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import LocationStep from './LocationStep/LocationStep';
import MediaStep from './MediaStep/MediaStep';
import TypeStep from './TypeStep/TypeStep';

type RegistrationStepsCateringProps = {
    title: string;
    onSubmit: SubmitHandler<FieldValues>;
};

const RegistrationStepsCatering = ({ title, onSubmit }: RegistrationStepsCateringProps) => {
    return (
        <RegistrationForm
            title={title}
            onSubmit={onSubmit}
            defaultValues={{
                type: TYPES[0],
                tags: [],
                name: '',
                address: '',
                description: '',
                cancellationTime: undefined,
                rating: 0,
                photo: '',
                workingTime: {
                    schedule: [...DAYS],
                    is24h: false,
                },
            }}
        >
            <TypeStep types={TYPES} />
            <LocationStep />
            <MediaStep days={DAYS} />
        </RegistrationForm>
    );
};

export default RegistrationStepsCatering;
