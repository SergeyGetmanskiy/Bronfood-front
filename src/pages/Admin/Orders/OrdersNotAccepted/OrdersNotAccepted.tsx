import { MealInBasket } from '../../../../utils/api/basketService/basketService';
import { useGetBasket } from '../../../../utils/hooks/useBasket/useBasket';
import AccordionList from '../AccordionList/AccordionList';
import { mockOrders } from './MockOrdersNotAccepted';

export interface OrderNotAccepted {
    summary: {
        userName: string;
        orderCode: string;
    };
    details: {
        meals: MealInBasket[];
    };
}

function OrdersNotAccepted() {
    /* next 2 lines temporary. meals need to be replaced by order.meals */
    const { data: basket, isSuccess } = useGetBasket();
    const meals: MealInBasket[] = isSuccess ? basket.data.meals : [];
    const ordersNotAccepted: OrderNotAccepted[] = mockOrders.map((order) => {
        return {
            summary: order.summary,
            details: {
                meals,
            },
        };
    });

    return <AccordionList data={ordersNotAccepted} />;
}

export default OrdersNotAccepted;
