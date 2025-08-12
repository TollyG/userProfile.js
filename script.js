const statusState = document.getElementById("status");
const container = document.getElementById('cards-container');


async function fetchUsers() {
    try {
        statusState.textContent = "Loading users....";

        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();
        statusState.textContent = "";

        data.forEach(user => {
            const card = document.createElement('div');
            card.className = "bg-white rounded-xl shadow p-4 text-center";

            card.innerHTML = `
                <h2 class = "font-bold text-lg">${user.name}</h2>
                <p class = "mb-2 text-blue-500 text-sm">${user.email}</p>
                <p class = "text-sm">${user.company.name}</p>
                <p class = "text-sm mb-2">${user.address.city}</p>

                <div class = "hidden mb-2 text-sm">
                    <p>${user.phone}</p>
                    <p class = "text-blue-500">${user.website}</p>
                </div>

                <button class = "button bg-blue-600 text-white px-3 py-1 rounded-md">View More</button>

            `;

            container.appendChild(card);

            const button = card.querySelector(".button");
            const viewMore = button.previousElementSibling;

            button.addEventListener("click", () => {

                if (viewMore.classList.contains("hidden")) {
                    viewMore.classList.remove("hidden");
                    button.textContent = "View Less";
                } else {
                    viewMore.classList.add("hidden");
                    button.textContent = "View More";
                }
            });
        });
        
    } catch (error) {
        statusState.textContent = "Error loadig users. Please try again.";
        console.error(error);
    }
}

fetchUsers();


