async function fetchData() {
    try {
        randomID = Math.floor(Math.random() * 1025) + 1;

        const pokeName =
            document.querySelector(".pokedex__name").value.toLowerCase() ||
            randomID.toString();
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokeName}`
        );

        if (!response.ok) {
            throw new Error("Couldn't fetch the resource");
        }

        const data = await response.json();

        // Matyna's suggestion of getting the code you need from the data object
        // In smaller projects, not neccessary but as projects scale, it's a good practice.
        const neededData = {
            name: data.name,
            sprites: data.sprites.front_default,
            cries: data.cries.latest,
        };

        const pokeSprite = neededData.sprites;
        // Create audio object in JS
        const pokeSound = new Audio(neededData.cries);

        const pokePage = document.querySelector(".pokedex__page");
        const imgElement = document.querySelector(".pokedex__page__sprite");
        const nameElement = document.querySelector(".pokedex__page__title");

        // Original Hacky Way ///// 
        nameElement.textContent = neededData.name;
        window.setTimeout(() => {
            // .offsetWidth gives the width of the element (it's a javascript property)
            // This is a way to make the text fit in the container
            // .setTimeout is a way to make the code run after the DOM has been updated
            if (nameElement.offsetWidth > 500) {
                nameElement.style.fontSize = "25px";
            } else if (nameElement.offsetWidth > 400) {
                nameElement.style.fontSize = "30px";
            } else if (nameElement.offsetWidth > 250) {
                nameElement.style.fontSize = "35px";
            } else {
                nameElement.style.fontSize = "50px";
            }
        }, 0);

        // requestAnimationFrame(() => {
        //     // Is this any better??? 
        //     // .requestanimationframe pushes it to the front of the callback queue at the next repaint.
        //     if (nameElement.offsetWidth > 500) {
        //         nameElement.style.fontSize = "25px";
        //     } else if (nameElement.offsetWidth > 400) {
        //         nameElement.style.fontSize = "30px";
        //     } else if (nameElement.offsetWidth > 250) {
        //         nameElement.style.fontSize = "35px";
        //     } else {
        //         nameElement.style.fontSize = "50px";
        //     }
        // });

        imgElement.src = pokeSprite;
        pokePage.style.display = "flex";
        pokeSound.play();
    } catch (error) {
        console.error(error);
    }
}

document.querySelector(".pokedex__button").addEventListener("click", fetchData);
