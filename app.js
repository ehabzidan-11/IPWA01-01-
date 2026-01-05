
//  Tabelle befüllen
 const data = [
    { country: "Deutschland", company: "Volkswagen", year: 2023, emission: 95.1 },
    { country: "Deutschland", company: "BASF", year: 2023, emission: 67.4 },
    { country: "Deutschland", company: "Siemens", year: 2023, emission: 45.2 },
    { country: "Österreich", company: "VOEST Alpine", year: 2023, emission: 39.8 },
    { country: "Schweiz", company: "Nestlé", year: 2023, emission: 54.6 },
    { country: "Frankreich", company: "TotalEnergies", year: 2023, emission: 88.7 },
    { country: "Frankreich", company: "Airbus", year: 2023, emission: 31.4 },
    { country: "Italien", company: "Enel", year: 2023, emission: 72.3 },
    { country: "Spanien", company: "Repsol", year: 2023, emission: 64.1 },
    { country: "Niederlande", company: "Shell NL", year: 2023, emission: 210.9 },
    { country: "Belgien", company: "Solvay", year: 2023, emission: 22.5 },
    { country: "Polen", company: "PKN Orlen", year: 2023, emission: 103.2 },
    { country: "Tschechien", company: "Skoda Auto", year: 2023, emission: 41.5 },
    { country: "Schweden", company: "Volvo Group", year: 2023, emission: 36.7 },
    { country: "Norwegen", company: "Equinor", year: 2023, emission: 59.2 },
    { country: "Dänemark", company: "Ørsted", year: 2023, emission: 18.4 },
    { country: "Finnland", company: "Nokia", year: 2023, emission: 12.7 },
    { country: "Portugal", company: "Galp Energia", year: 2023, emission: 33.8 },
    { country: "Griechenland", company: "Hellenic Petroleum", year: 2023, emission: 92.5 },
    { country: "Ungarn", company: "MOL Group", year: 2023, emission: 74.9 }
];

//  DOM-Elemente

const tableBody = document.querySelector("#dataTable tbody");
const filterCountry = document.querySelector("#filterCountry");
const filterCompany = document.querySelector("#filterCompany");
const toggleDir = document.querySelector("#toggleDir");

// ===============================
//  Sicherheitsfunktion: Kein injizierter Code
// ===============================
function sanitize(text) {
    const div = document.createElement("div");
    div.textContent = text;     // verwandelt alles in reinen Text
    return div.textContent;
}

// ===============================
//  Tabelle rendern
// ===============================
function renderTable(rows) {
    tableBody.innerHTML = "";

    rows.forEach(item => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${sanitize(item.country)}</td>
            <td>${sanitize(item.company)}</td>
            <td>${sanitize(item.year)}</td>
            <td>${sanitize(item.emission)}</td>
        `;
        tableBody.appendChild(tr);
    });
}

// Erste Anzeige der Tabelle
renderTable(data);

// ===============================
//  Filtern nach Land & Unternehmen
// ===============================
function applyFilters() {
    const country = filterCountry.value.toLowerCase();
    const company = filterCompany.value.toLowerCase();

    const filtered = data.filter(item =>
        item.country.toLowerCase().includes(country) &&
        item.company.toLowerCase().includes(company)
    );

    renderTable(filtered);
}

filterCountry.addEventListener("input", applyFilters);
filterCompany.addEventListener("input", applyFilters);

// ===============================
//  Sortieren der Tabelle
// ===============================
let sortDirection = 1;

document.querySelectorAll("#dataTable th").forEach(th => {
    th.addEventListener("click", () => {
        const column = th.dataset.column;

        data.sort((a, b) => {
            return a[column] > b[column] ? sortDirection : -sortDirection;
        });

        sortDirection *= -1;
        renderTable(data);
    });
});

// ===============================
//  LTR / RTL Umschalten
// ===============================
toggleDir.addEventListener("click", () => {
    const html = document.documentElement;
    html.dir = html.dir === "ltr" ? "rtl" : "ltr";
});
