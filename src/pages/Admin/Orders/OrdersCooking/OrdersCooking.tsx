import { AdminOrder } from '../../../../utils/api/adminService/adminService';
import { MealInBasket } from '../../../../utils/api/basketService/basketService';
import { useGetBasket } from '../../../../utils/hooks/useBasket/useBasket';
import AccordionList from '../AccordionList/AccordionList';
import { mockOrdersCooking } from './MockOrdersCooking';

function OrdersCooking() {
    const { data: basket, isSuccess } = useGetBasket();
    const meals: MealInBasket[] = isSuccess ? basket.data.meals : [];
    const ordersCooking: AdminOrder[] = mockOrdersCooking.map((order) => {
        return {
            summary: order.summary,
            details: {
                meals,
                acceptedAt: '16:30',
            },
            type: 'cooking',
        };
    });

    return <AccordionList data={ordersCooking} />;
}

export default OrdersCooking;
