const { name } = require("ejs");
const { db } = require("./config/firebase");

const posters = [
  { id: "poster1", title: "BUSINESS SUPPORT", name: "Badak NGL", votes: 0 },
  { id: "poster2", title: "OPERATIONS", name: "Badak NGL", votes: 0 },
  { id: "poster3", title: "BUSINESS DEVELOPMENT & MARKETING", name: "Elnusa", votes: 0 },
  { id: "poster4", title: "EPC & OM SERVICES", name: "Elnusa", votes: 0 },
  { id: "poster5", title: "HUMAN CAPITAL", name: "Elnusa", votes: 0 },
  { id: "poster6", title: "HSSE", name: "Elnusa", votes: 0 },
  { id: "poster7", title: "LEGAL COUNSEL", name: "Elnusa", votes: 0 },
  { id: "poster8", title: "HUMAN CAPITAL", name: "Elnusa Petrofin", votes: 0 },
  { id: "poster9", title: "PMGS", name: "Elnusa", votes: 0 },
  { id: "poster10", title: "CONTROLLER", name: "PDSI", votes: 0 },
  { id: "poster11", title: "CORPORATE SECRETARY", name: "PDSI", votes: 0 },
  { id: "poster12", title: "HSSE & QUALITY", name: "PDSI", votes: 0 },
  { id: "poster13", title: "RIG SERVICES OPERATION", name: "PDSI", votes: 0 },
  { id: "poster14", title: "BUSINESS SUPPORT", name: "Regional 1 - Sumatra", votes: 0 },
  { id: "poster15", title: "DEVELOPMENT & DRILLING", name: "Regional 2 - Jawa", votes: 0 },
  { id: "poster16", title: "EXPLORATION", name: "Regional 2 - Jawa", votes: 0 },
  { id: "poster17", title: "SCM", name: "Regional 2 - Jawa", votes: 0 },
  { id: "poster18", title: "EXPLORATION ", name: "Regional 3  Kalimantan", votes: 0 },
  { id: "poster19", title: "EXPLORATION", name: "Regional 4 - Indonesia Timur", votes: 0 },
  { id: "poster20", title: "AUDIT EXECUTIVE", name: "SH Upstream", votes: 0 },
  { id: "poster21", title: "DTEC", name: "SH Upstream", votes: 0 },
  { id: "poster22", title: "EXISTING ASSETS", name: "SH Upstream", votes: 0 },
  { id: "poster23", title: "ETEC", name: "SH Upstream", votes: 0 },
  { id: "poster24", title: "HSSE", name: "Head Office SH Upstream", votes: 0 },
  { id: "poster25", title: "Legal Counsel", name: "Head Office SH Upstream", votes: 0 },
  { id: "poster26", title: "ZONA 1", name: "Regional 1 - Sumatra", votes: 0 },
  { id: "poster27", title: "ZONA 4", name: "Regional 1 - Sumatra", votes: 0 },
  { id: "poster28", title: "ZONA 5", name: "Regional 2 - Jawa", votes: 0 },
  { id: "poster29", title: "ZONA 6", name: "Regional 2 - Jawa", votes: 0 },
  { id: "poster30", title: "ZONA 7", name: "Regional 2 - Jawa", votes: 0 },
  { id: "poster31", title: "ZONA 8", name: "Regional 3 - Kalimantan", votes: 0 },
  { id: "poster32", title: "ZONA 10", name: "Regional 3 - Kalimantan", votes: 0 },
  { id: "poster33", title: "Zona 12", name: "Regional 4 - Indonesia Timur", votes: 0 },
  { id: "poster34", title: "Zona 13", name: "Regional 4 - Indonesia Timur", votes: 0 },
  { id: "poster35", title: "Zona Rokan", name: "Regional 1 - Sumatra", votes: 0 }
];

async function addPosters() {
    for (const poster of posters) {
        await db.collection("posters").doc(poster.id).set(poster);
        console.log(`✔️ Poster ${poster.id} ditambahkan`);
    }
    console.log("✅ Semua poster berhasil ditambahkan!");poster2
}

addPosters().catch(console.error);
