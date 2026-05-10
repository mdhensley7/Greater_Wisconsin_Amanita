// crossReference.js - iNaturalist cross-referencing for Amanita species

const API_BASE = 'https://api.inaturalist.org/v1';
let map;
let speciesLayers = {};
let speciesColors = ['red', 'blue', 'green', 'orange', 'purple', 'brown'];

async function fetchSpeciesData(speciesNames) {
    try {
        document.getElementById('content').innerHTML = '<div class="loading">Loading species data...</div>';

        // Initialize map
        initMap();

        const allData = [];

        for (let i = 0; i < speciesNames.length; i++) {
            const species = speciesNames[i];
            const color = speciesColors[i % speciesColors.length];

            try {
                // Search for taxon
                const taxaResponse = await fetch(`${API_BASE}/taxa?q=${encodeURIComponent(species)}&rank=species`);
                const taxaData = await taxaResponse.json();

                if (!taxaData.results || taxaData.results.length === 0) {
                    throw new Error(`Species "${species}" not found on iNaturalist`);
                }

                const taxon = taxaData.results[0];
                const taxonId = taxon.id;

                // Fetch observations
                const obsResponse = await fetch(`${API_BASE}/observations?taxon_id=${taxonId}&quality_grade=research&per_page=10&swlat=40&swlng=-100&nelat=50&nelng=-80`);
                const obsData = await obsResponse.json();

                // Fetch full taxon for description
                const fullTaxaResponse = await fetch(`${API_BASE}/taxa/${taxonId}`);
                const fullTaxaData = await fullTaxaResponse.json();
                const description = fullTaxaData.wikipedia_summary || 'No description available from iNaturalist.';

                allData.push({
                    name: species,
                    taxon: taxon,
                    observations: obsData.results || [],
                    description: description,
                    color: color
                });

            } catch (error) {
                console.error(`Error fetching data for ${species}:`, error);
                allData.push({
                    name: species,
                    error: error.message,
                    color: color
                });
            }

            // Rate limit: wait 1 second between requests
            if (i < speciesNames.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }

        renderData(allData);

    } catch (error) {
        console.error('Error in fetchSpeciesData:', error);
        document.getElementById('content').innerHTML = `<p>Error loading data: ${error.message}</p>`;
    }
}

function initMap() {
    map = L.map('map-container').setView([45, -90], 4); // Center on North America

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
}

function renderData(speciesData) {
    const content = document.getElementById('content');
    const filters = document.getElementById('filters');

    // Clear loading
    content.innerHTML = '';

    // Create filters
    filters.innerHTML = '<h3>Map Filters:</h3>';
    speciesData.forEach((species, index) => {
        if (!species.error) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `filter-${index}`;
            checkbox.checked = true;
            checkbox.addEventListener('change', () => toggleLayer(index));

            const label = document.createElement('label');
            label.htmlFor = `filter-${index}`;
            label.textContent = species.name;
            label.style.color = species.color;

            filters.appendChild(checkbox);
            filters.appendChild(label);
        }
    });

    // Create layers and render sections
    speciesData.forEach((species, index) => {
        const layerGroup = L.layerGroup().addTo(map);
        speciesLayers[index] = layerGroup;

        if (species.error) {
            content.innerHTML += `
                <div class="species-section">
                    <h2 class="species-title">${species.name}</h2>
                    <p>Error: ${species.error}</p>
                </div>
            `;
            return;
        }

        // Add markers to map
        species.observations.forEach(obs => {
            if (obs.location) {
                const [lat, lng] = obs.location.split(',');
                L.circleMarker([lat, lng], {
                    color: species.color,
                    fillColor: species.color,
                    fillOpacity: 0.5,
                    radius: 5
                }).addTo(layerGroup).bindPopup(`${species.name}<br>${obs.observed_on || 'Date unknown'}`);
            }
        });

        // Render section
        const galleryHtml = species.observations.slice(0, 20).map(obs => {
            const photo = obs.photos && obs.photos[0];
            if (photo) {
                return `<img src="${photo.url.replace('square', 'medium')}" alt="${species.name} observation">`;
            }
            return '';
        }).join('');

        content.innerHTML += `
            <div class="species-section">
                <h2 class="species-title">${species.name}</h2>
                <p><strong>Scientific Name:</strong> ${species.taxon.name}</p>
                <p><strong>Observations:</strong> ${species.observations.length} research-grade</p>
                <h3>Image Gallery</h3>
                <div class="gallery">${galleryHtml}</div>
                <h3>Description</h3>
                <div class="description">${species.description}</div>
            </div>
        `;
    });

    // Fit map to all markers
    // const allLayers = Object.values(speciesLayers).filter(layer => layer.getLayers().length > 0);
    // if (allLayers.length > 0) {
    //     const group = L.featureGroup(allLayers);
    //     map.fitBounds(group.getBounds());
    // }
}

function toggleLayer(index) {
    const layer = speciesLayers[index];
    const checkbox = document.getElementById(`filter-${index}`);

    if (checkbox.checked) {
        map.addLayer(layer);
    } else {
        map.removeLayer(layer);
    }
}