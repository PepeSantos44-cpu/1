// Definir las áreas de Feng Shui
const fengShuiAreas = [
    "Carrera",
    "Relaciones",
    "Familia",
    "Riqueza",
    "Salud",
    "Creatividad",
    "Conocimiento",
    "Fama",
    "Espiritualidad"
];

// Definir los significados de las cartas del tarot
const tarotMeanings = {
    "El Loco": "Nuevos comienzos, espontaneidad, libertad.",
    "El Mago": "Manifestación, poder personal, habilidad.",
    "La Sacerdotisa": "Intuición, misterio, sabiduría oculta.",
    "La Emperatriz": "Abundancia, fertilidad, creatividad.",
    "El Emperador": "Autoridad, estructura, estabilidad.",
    "El Hierofante": "Tradición, espiritualidad, guía.",
    "Los Enamorados": "Amor, relaciones, elecciones.",
    "El Carro": "Determinación, voluntad, éxito.",
    "La Justicia": "Equilibrio, justicia, verdad.",
    "El Ermitaño": "Introspección, sabiduría, soledad.",
    "La Rueda de la Fortuna": "Cambio, suerte, destino.",
    "La Fuerza": "Fortaleza interior, paciencia, compasión.",
    "El Colgado": "Renuncia, nueva perspectiva, sacrificio.",
    "La Muerte": "Transformación, finales, nuevos comienzos.",
    "La Templanza": "Equilibrio, moderación, paciencia.",
    "El Diablo": "Ataduras, tentación, materialismo.",
    "La Torre": "Caída, revelación, cambio abrupto.",
    "La Estrella": "Esperanza, inspiración, fe.",
    "La Luna": "Intuición, ilusión, subconsciente.",
    "El Sol": "Alegría, éxito, vitalidad.",
    "El Juicio": "Renacimiento, evaluación, despertar.",
    "El Mundo": "Completitud, logro, viaje."
};

// Definir las imágenes de las cartas
const tarotImages = {
    "El Loco": "images/el_loco.jpg",
    "El Mago": "images/el_mago.jpg",
    "La Sacerdotisa": "images/la_sacerdotisa.jpg",
    "La Emperatriz": "images/la_emperatriz.jpg",
    "El Emperador": "images/el_emperador.jpg",
    "El Hierofante": "images/el_hierofante.jpg",
    "Los Enamorados": "images/los_enamorados.jpg",
    "El Carro": "images/el_carro.jpg",
    "La Justicia": "images/la_justicia.jpg",
    "El Ermitaño": "images/el_ermitaño.jpg",
    "La Rueda de la Fortuna": "images/la_rueda_de_la_fortuna.jpg",
    "La Fuerza": "images/la_fuerza.jpg",
    "El Colgado": "images/el_colgado.jpg",
    "La Muerte": "images/la_muerte.jpg",
    "La Templanza": "images/la_templanza.jpg",
    "El Diablo": "images/el_diablo.jpg",
    "La Torre": "images/la_torre.jpg",
    "La Estrella": "images/la_estrella.jpg",
    "La Luna": "images/la_luna.jpg",
    "El Sol": "images/el_sol.jpg",
    "El Juicio": "images/el_juicio.jpg",
    "El Mundo": "images/el_mundo.jpg"
};

// Función para realizar la tirada de cartas
function drawCards() {
    const birthdate = document.getElementById('birthdate').value;
    if (!birthdate) {
        document.getElementById('date-error').textContent = 'Por favor, ingresa tu fecha de nacimiento.';
        return;
    }

    // Lógica para calcular el camino de vida y realizar la tirada
    const lifePathNumber = calculateLifePath(birthdate);
    const lifePathMeaning = getLifePathMeaning(lifePathNumber);
    document.getElementById('life-path-result').innerHTML = `
        <h3>Tu número de camino de vida es: ${lifePathNumber}</h3>
        <p>${lifePathMeaning}</p>
    `;

    // Lógica para mostrar las cartas en el grid
    const cards = generateCards();
    displayCards(cards);
}

// Función para calcular el número de camino de vida
function calculateLifePath(birthdate) {
    const dateParts = birthdate.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]);
    const day = parseInt(dateParts[2]);

    let lifePathNumber = reduceNumber(year) + reduceNumber(month) + reduceNumber(day);
    return reduceNumber(lifePathNumber);
}

// Función para reducir un número a un solo dígito
function reduceNumber(number) {
    while (number > 9) {
        number = number.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    return number;
}

// Función para obtener el significado del camino de vida
function getLifePathMeaning(number) {
    const meanings = {
        1: "Líder natural, independiente y creativo.",
        2: "Cooperativo, intuitivo y pacífico.",
        3: "Comunicativo, optimista y artístico.",
        4: "Práctico, organizado y confiable.",
        5: "Aventurero, versátil y curioso.",
        6: "Responsable, amoroso y protector.",
        7: "Analítico, espiritual y sabio.",
        8: "Ambicioso, poderoso y exitoso.",
        9: "Humanitario, compasivo y generoso."
    };
    return meanings[number] || "Número no reconocido.";
}

// Función para generar las 9 áreas con 3 cartas cada una (pasado, presente, futuro)
function generateCards() {
    const tarotDeck = Object.keys(tarotMeanings);
    const cardsByArea = {};

    fengShuiAreas.forEach(area => {
        cardsByArea[area] = [];
        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * tarotDeck.length);
            cardsByArea[area].push(tarotDeck[randomIndex]);
        }
    });

    return cardsByArea;
}

// Función para mostrar las cartas en un grid de 3x3 por área
function displayCards(cardsByArea) {
    const grid = document.getElementById('grid');
    grid.innerHTML = ''; // Limpia el grid antes de mostrar nuevas cartas

    // Asegúrate de que el grid tenga un diseño de 3x3
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
    grid.style.gap = '20px';

    Object.keys(cardsByArea).forEach(area => {
        const areaElement = document.createElement('div');
        areaElement.className = 'area';
        areaElement.innerHTML = `<h3>${area}</h3>`;

        cardsByArea[area].forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.innerHTML = `
                <img src="${tarotImages[card]}" alt="${card}">
                <p>${index === 0 ? 'Pasado' : index === 1 ? 'Presente' : 'Futuro'}: ${card}</p>
            `;
            cardElement.onclick = () => openModal(card, area, cardsByArea[area]);
            areaElement.appendChild(cardElement);
        });

        grid.appendChild(areaElement);
    });
}

// Función para abrir el modal con los detalles de la carta
function openModal(card, area, cards) {
    const meanings = cards.map(c => tarotMeanings[c]);
    document.getElementById('modal-title').textContent = `${area}: ${card}`;
    document.getElementById('modal-content').innerHTML = `
        <p><strong>Pasado:</strong> ${meanings[0]}</p>
        <p><strong>Presente:</strong> ${meanings[1]}</p>
        <p><strong>Futuro:</strong> ${meanings[2]}</p>
        <p><strong>Interpretación:</strong> ${getAreaInterpretation(area, meanings)}</p>
    `;
    document.getElementById('modal').style.display = 'block';
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Función para obtener la interpretación de un área
function getAreaInterpretation(area, meanings) {
    const interpretations = {
        "Carrera": `En el pasado, ${meanings[0]}. Actualmente, ${meanings[1]}. En el futuro, ${meanings[2]}.`,
        "Relaciones": `En el pasado, ${meanings[0]}. Actualmente, ${meanings[1]}. En el futuro, ${meanings[2]}.`,
        "Familia": `En el pasado, ${meanings[0]}. Actualmente, ${meanings[1]}. En el futuro, ${meanings[2]}.`,
        "Riqueza": `En el pasado, ${meanings[0]}. Actualmente, ${meanings[1]}. En el futuro, ${meanings[2]}.`,
        "Salud": `En el pasado, ${meanings[0]}. Actualmente, ${meanings[1]}. En el futuro, ${meanings[2]}.`,
        "Creatividad": `En el pasado, ${meanings[0]}. Actualmente, ${meanings[1]}. En el futuro, ${meanings[2]}.`,
        "Conocimiento": `En el pasado, ${meanings[0]}. Actualmente, ${meanings[1]}. En el futuro, ${meanings[2]}.`,
        "Fama": `En el pasado, ${meanings[0]}. Actualmente, ${meanings[1]}. En el futuro, ${meanings[2]}.`,
        "Espiritualidad": `En el pasado, ${meanings[0]}. Actualmente, ${meanings[1]}. En el futuro, ${meanings[2]}.`
    };
    return interpretations[area];
}

// Función para reiniciar las cartas
function resetCards() {
    document.getElementById('grid').innerHTML = '';
    document.getElementById('life-path-result').textContent = '';
}

// Función para guardar la tirada
function saveReading() {
    // Lógica para guardar la tirada
    alert('Tirada guardada');
}

// Función para cargar una tirada guardada
function loadReading() {
    // Lógica para cargar una tirada guardada
    alert('Tirada cargada');
}