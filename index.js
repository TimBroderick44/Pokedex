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

        const getFontSize = (textLength) => {
            // Define the minimum and maximum font sizes
            const minFontSize = 23; // Minimum font size in pixels
            const maxFontSize = 35; // Maximum font size in pixels

            // Calculate a base font size based on text length (you may need to adjust the formula to fit your needs)
            let fontSize = maxFontSize - (textLength - 1) * 2;

            // Ensure the font size is within the min and max range
            fontSize = Math.max(minFontSize, Math.min(fontSize, maxFontSize));

            return `${fontSize}px`;
        };

        // Apply the font size after setting the text content
        nameElement.textContent = neededData.name;
        nameElement.style.fontSize = getFontSize(
            nameElement.textContent.length
        );
        // Check the length of the text content
        if (nameElement.textContent.length > 10) {
            // Allow text to wrap to the next line
            nameElement.style.whiteSpace = "normal";
        } else {
            // Prevent text from wrapping if not needed
            nameElement.style.whiteSpace = "nowrap";
        }

        imgElement.src = pokeSprite;
        pokePage.style.display = "flex";
        pokeSound.play();
    } catch (error) {
        console.error(error);
    }
}

document.querySelector(".pokedex__button").addEventListener("click", fetchData);
