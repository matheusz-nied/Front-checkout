let isAuth = JSON.parse(window.localStorage.getItem("auth"));
if (Boolean(isAuth)) {
    listAllOfMonth();
}

//const BASEURL = "https://nied-checkout.herokuapp.com;

function listAllOfMonth() {
    const results = fetch("https://portifolio-nied-checkout.herokuapp.com/api/checkoutDay/listAll")
        .then((response) => response.json())
        .then((response) => {
            const containerListagem = document.getElementById(
                "#container-listagem"
            );

            containerListagem.innerHTML = "";
            response.sort((checkout, otherCheckout) => {
                return checkout.day < otherCheckout.day
                    ? 1
                    : checkout.day > otherCheckout.day
                    ? -1
                    : 0;
            });
            let lastDay = response[0];
            let sale_day_last_day_field =
                document.getElementById("#cash-in-hand-last-day");
            sale_day_last_day_field.innerHTML = Number(lastDay.cash_in_hand);

            response.map((data) => {
                let date = new Date(data.day);
                let dayFormated =
                    addZero(date.getDate().toString()) +
                    "/" +
                    addZero(date.getMonth() + 1).toString() +
                    "/" +
                    date.getFullYear();

                containerListagem.insertAdjacentHTML(
                    "beforeend",
                    `
                    <a onClick="saveDataSessionStorage(this)" href="/edit.html">
                    <div class="nied-card">
                        <div class="uk-card uk-card-primary uk-card-hover uk-card-body uk-light nied-card-body">
                            <h3>${dayFormated}</h3>                         
                            
                            <p >Venda do dia: <span>R$ ${data.sale_day}</span></p>

                            <input type="hidden" id=#${data.id} value=${data.id} />
                           


                        </div>
                    </div>
                    </a>`
                );
            });
        });
}

function addZero(numero) {
    if (numero <= 9) return "0" + numero;
    else return numero;
}

function saveDataSessionStorage(element) {
    let id = JSON.stringify(element.querySelector("input").value);
    window.sessionStorage.setItem("id", id);
}


setInterval(listAllOfMonth, 10000);
