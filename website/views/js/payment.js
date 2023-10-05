const buttons = document.querySelectorAll(".paymentButton");

const items = {'basic': 1, 'pro': 2, 'premium': 3}

    buttons.forEach(function (button) {
        button.addEventListener("click", () => {
            const plan = button.getAttribute("data-plan");
            
            const planId = items[plan]
            console.log(plan,planId)

            fetch("http://localhost:3000/create-checkout-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items: [
                        { id: planId, quantity: 1}
                    ],
                }),
            })
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    }
                    else{
                        return res.json().then(json => Promise.reject(json))
                    }
                })
                .then(({ url }) => {
                    window.location = url
                })
                .catch(e => {
                    console.error(e.error)
                })
        });
    });
