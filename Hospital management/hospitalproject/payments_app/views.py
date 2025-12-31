import stripe
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response

stripe.api_key = settings.STRIPE_SECRET_KEY

@api_view(["POST"])
def create_checkout_session(request):
    data = request.data

    session = stripe.checkout.Session.create(
        payment_method_types=["card"],
        mode="payment",
        line_items=[{
            "price_data": {
                "currency": "inr",
                "product_data": {
                    "name": "Doctor Appointment",
                },
                "unit_amount": 50000,  # ₹500
            },
            "quantity": 1,
        }],
        success_url="http://localhost:3000/payment-success",
        cancel_url="http://localhost:3000/payment-cancel",
        metadata={
            "doctor": data.get("doctor"),
            "date": data.get("date"),
            "time": data.get("time"),
        }
    )

    return Response({"url": session.url})
