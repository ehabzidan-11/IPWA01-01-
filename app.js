
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

// enthält immer die aktuell angezeigten Zeilen (nach Filter)
let currentRows = [...data];

// Sortierung: 1 = aufsteigend, -1 = absteigend
let sortDirection = 1;

// merkt sich die zuletzt sortierte Spalte (z. B. "country")
let currentSortColumn = null;

//  Sicherheitsfunktion: Kein injizierter Code
function sanitize(text) {
    const div = document.createElement("div");
    div.textContent = text;     // verwandelt alles in reinen Text
    return div.textContent;
}

//  Tabelle rendern
function renderTable(rows) {
    tableBody.innerHTML = "";

     if (rows.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 4;
        td.textContent = "Keine Treffer – bitte Suchbegriff anpassen.";
        tr.appendChild(td);
        tableBody.appendChild(tr);
        return;
    }

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


function sortRows(column) {
  currentRows.sort((a, b) => {
    const av = a[column];
    const bv = b[column];

    // Zahlen sauber vergleichen (year, emission)
    if (typeof av === "number" && typeof bv === "number") {
      return (av - bv) * sortDirection;
    }

    // Text vergleichen (country, company)
    // localeCompare ist besser bei Umlauten etc.
    return String(av).localeCompare(String(bv), "de",
    { sensitivity: "base" }) * sortDirection;
  });

  renderTable(currentRows);
}



//  Filtern nach Land & Unternehmen
function applyFilters() {
    const country = filterCountry.value.trim().toLowerCase();
    const company = filterCompany.value.trim().toLowerCase();

    currentRows = data.filter(item =>
        item.country.toLowerCase().includes(country) &&
        item.company.toLowerCase().includes(company)
    );

     if (currentSortColumn) {
    sortRows(currentSortColumn);
  } else {
    renderTable(currentRows);
  }
}

filterCountry.addEventListener("input", applyFilters);
filterCompany.addEventListener("input", applyFilters);

document.querySelectorAll("#dataTable th").forEach(th => {
  th.addEventListener("click", () => {
    const column = th.dataset.column;

    // gleiche Spalte: Richtung wechseln
    // neue Spalte: Richtung zurück auf aufsteigend setzen
    if (currentSortColumn === column) {
      sortDirection *= -1;
    } else {
      currentSortColumn = column;
      sortDirection = 1;
    }

    sortRows(column);
  });
});



//  Leserichtung ändern
toggleDir.addEventListener("click", () => {
    const html = document.documentElement;
    html.dir = html.dir === "ltr" ? "rtl" : "ltr";
});

renderTable(currentRows);
