import { memo } from 'react';

const OrdersNotAccepted = memo(function OrdersNotAccepted() {
    // Log once. The actual slowdown is inside SlowPost.

    const items = [];
    for (let i = 0; i < 500; i++) {
        items.push(<SlowPost key={i} index={i} />);
    }
    return <ul>{items}</ul>;
});

function SlowPost({ index }) {
    const startTime = performance.now();
    while (performance.now() - startTime < 1) {
        // Do nothing for 1 ms per item to emulate extremely slow code
    }

    return <li>Post #{index + 1}</li>;
}

export default OrdersNotAccepted;
