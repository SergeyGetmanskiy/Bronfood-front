export function openPaymentWidgetHandler() {
    openPaymentWidget(
        {
            api_key: 'Api_key',
            amount: 10,
            currency: 'KZT',
            order_id: '',
            description: '',
            payment_type: 'pay',
            payment_method: 'ecom',
            items: [
                {
                    merchant_id: 'Merchant_id',
                    service_id: 'Service_id',
                    merchant_name: 'Example',
                    name: 'Example',
                    quantity: 1,
                    amount_one_pcs: 10,
                    amount_sum: 10,
                },
            ],
            user_id: 'string',
            email: 'example@gmail.com',
            phone: 'example',
            success_url: 'http://example.com',
            failure_url: 'http://example.com',
            callback_url: 'http://example.com',
            payment_lifetime: 0,
            create_recurrent_profile: false,
            recurrent_profile_lifetime: 0,
            lang: 'ru',
            extra_params: {},
            payment_gateway_host: 'https://api.onevisionpay.com/',
            payment_widget_host: 'https://widget.onevisionpay.com',
        },
        (onSuccess = () => {}),
        (onFail = () => {})
    );
}
