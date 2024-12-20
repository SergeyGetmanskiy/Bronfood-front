import { MealInBasket } from '../../../../utils/api/basketService/basketService';
import { useGetBasket } from '../../../../utils/hooks/useBasket/useBasket';
import AccordionList from '../AccordionList/AccordionList';
import { Order } from '../Orders';
import { mockOrders } from './MockOrdersNotAccepted';

function OrdersNotAccepted() {
    /* next 2 lines temporary. meals need to be replaced by order.meals */
    const { data: basket, isSuccess } = useGetBasket();
    const meals: MealInBasket[] = isSuccess ? basket.data.meals : [];
    const ordersNotAccepted: Order[] = mockOrders.map((order) => {
        return {
            summary: order.summary,
            details: {
                meals,
            },
            type: 'not accepted',
        };
    });

    return <AccordionList data={ordersNotAccepted} />;
}

export default OrdersNotAccepted;
