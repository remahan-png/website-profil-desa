  // Load current content into admin form
window.addEventListener("load", () => {
  loadCurrentContent();
  checkLoginStatus();
});

// Function to load current content into form
function loadCurrentContent() {
  const aboutText =
    localStorage.getItem("about-text") ||
    "Desa Lendang Belo terletak di kecamatan [Kecamatan], kabupaten [Kabupaten], provinsi [Provinsi]. Desa ini dikenal dengan keindahan alamnya, keramahan penduduknya, dan potensi pertanian yang melimpah. Dengan luas wilayah sekitar [Luas] hektar, desa ini memiliki [Jumlah] penduduk yang mayoritas bermata pencaharian sebagai petani.";
  const statPenduduk =
    localStorage.getItem("about-penduduk") ||
    localStorage.getItem("stat-penduduk") ||
    "500+";
  const statLuas =
    localStorage.getItem("about-luas") ||
    localStorage.getItem("stat-luas") ||
    "200 Ha";
  const statDusun =
    localStorage.getItem("about-dusun") ||
    localStorage.getItem("stat-dusun") ||
    "5";
  const kepalaDesa =
    localStorage.getItem("kepala-desa") || "[Nama Kepala Desa]";

  document.getElementById("about-text").value = aboutText;
  document.getElementById("stat-penduduk").value = statPenduduk;
  document.getElementById("stat-luas").value = statLuas;
  document.getElementById("stat-dusun").value = statDusun;
  document.getElementById("kepala-desa").value = kepalaDesa;

  // Load population data
  const penduduk = JSON.parse(localStorage.getItem("penduduk") || "{}");
  document.getElementById("penduduk-total").value = penduduk.total || "";
  document.getElementById("penduduk-laki").value = penduduk.laki || "";
  document.getElementById("penduduk-perempuan").value = penduduk.perempuan || "";
}

// Handle profil form submission
document.getElementById("profil-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const aboutText = document.getElementById("about-text").value;
  const statPenduduk = document.getElementById("stat-penduduk").value;
  const statLuas = document.getElementById("stat-luas").value;
  const statDusun = document.getElementById("stat-dusun").value;
  const kepalaDesa = document.getElementById("kepala-desa").value;

  // Save to localStorage
  localStorage.setItem("about-text", aboutText);
  localStorage.setItem("about-penduduk", statPenduduk);
  localStorage.setItem("about-luas", statLuas);
  localStorage.setItem("about-dusun", statDusun);
  localStorage.setItem("kepala-desa", kepalaDesa);

  alert("Profil desa berhasil disimpan!");
});

// Handle penduduk form submission
document
  .getElementById("penduduk-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const total = document.getElementById("penduduk-total").value;
    const laki = document.getElementById("penduduk-laki").value;
    const perempuan = document.getElementById("penduduk-perempuan").value;

    const penduduk = {
      total: total,
      laki: laki,
      perempuan: perempuan
    };

    localStorage.setItem("penduduk", JSON.stringify(penduduk));
    localStorage.setItem("stat-penduduk", total);
    localStorage.setItem("stat-laki-laki", laki);
    localStorage.setItem("stat-perempuan", perempuan);

    alert("Data penduduk berhasil disimpan!");
    loadDashboard(); // Update dashboard
  });

// Handle berita form submission
document.getElementById("berita-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("berita-title").value;
  const category = document.getElementById("berita-category").value;
  const content = document.getElementById("berita-content").value;
  const file = document.getElementById("berita-file").files[0];

  if (title && content) {
    const berita = JSON.parse(localStorage.getItem("berita") || "[]");
    const beritaItem = {
      title,
      category,
      content,
      date: new Date().toLocaleDateString(),
    };

    if (editingBeritaIndex !== -1) {
      // Update existing
      berita[editingBeritaIndex].title = title;
      berita[editingBeritaIndex].category = category;
      berita[editingBeritaIndex].content = content;
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          berita[editingBeritaIndex].image = event.target.result;
          localStorage.setItem("berita", JSON.stringify(berita));
          resetBeritaForm();
          loadBerita();
          alert("Berita berhasil diupdate!");
        };
        reader.readAsDataURL(file);
      } else {
        localStorage.setItem("berita", JSON.stringify(berita));
        resetBeritaForm();
        loadBerita();
        alert("Berita berhasil diupdate!");
      }
    } else {
      // Add new
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          beritaItem.image = event.target.result;
          berita.push(beritaItem);
          localStorage.setItem("berita", JSON.stringify(berita));
          resetBeritaForm();
          loadBerita();
          alert("Berita berhasil ditambahkan!");
        };
        reader.readAsDataURL(file);
      } else {
        berita.push(beritaItem);
        localStorage.setItem("berita", JSON.stringify(berita));
        resetBeritaForm();
        loadBerita();
        alert("Berita berhasil ditambahkan!");
      }
    }
  }
});

function resetBeritaForm() {
  document.getElementById("berita-title").value = "";
  document.getElementById("berita-category").value = "Umum";
  document.getElementById("berita-content").value = "";
  document.getElementById("berita-file").value = "";
  editingBeritaIndex = -1;
  document.querySelector("#berita-form button[type='submit']").textContent =
    "Tambah Berita";
}

// Handle galeri form submission
document.getElementById("galeri-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const file = document.getElementById("galeri-file").files[0];
  const caption = document.getElementById("galeri-caption").value;

  if (caption) {
    const galeri = JSON.parse(localStorage.getItem("galeri") || "[]");
    const galeriItem = { caption };

    if (editingGaleriIndex !== -1) {
      // Update existing
      galeri[editingGaleriIndex].caption = caption;
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          galeri[editingGaleriIndex].url = event.target.result;
          localStorage.setItem("galeri", JSON.stringify(galeri));
          resetGaleriForm();
          loadGaleri();
          alert("Gambar berhasil diupdate!");
        };
        reader.readAsDataURL(file);
      } else {
        localStorage.setItem("galeri", JSON.stringify(galeri));
        resetGaleriForm();
        loadGaleri();
        alert("Gambar berhasil diupdate!");
      }
    } else {
      // Add new
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          galeriItem.url = event.target.result;
          galeri.push(galeriItem);
          localStorage.setItem("galeri", JSON.stringify(galeri));
          resetGaleriForm();
          loadGaleri();
          alert("Gambar berhasil ditambahkan!");
        };
        reader.readAsDataURL(file);
      } else {
        alert("Mohon upload file gambar!");
      }
    }
  } else {
    alert("Mohon isi keterangan!");
  }
});

function resetGaleriForm() {
  document.getElementById("galeri-file").value = "";
  document.getElementById("galeri-caption").value = "";
  editingGaleriIndex = -1;
  document.querySelector("#galeri-form button[type='submit']").textContent =
    "Tambah Gambar";
}

// Handle login form submission
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Simple authentication (in a real app, this should be server-side)
  if (username === "admin" && password === "admin123") {
    localStorage.setItem("isLoggedIn", "true");
    showAdminPanel();
  } else {
    alert("Username atau password salah!");
  }
});

// Handle logout
document.getElementById("logout-btn").addEventListener("click", function () {
  localStorage.removeItem("isLoggedIn");
  showLoginSection();
});

// Function to check login status
function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === "true") {
    showAdminPanel();
  } else {
    showLoginSection();
  }
}

// Function to show admin panel
function showAdminPanel() {
  document.getElementById("login-section").style.display = "none";
  document.getElementById("admin-panel").style.display = "block";
}

// Function to show login section
function showLoginSection() {
  document.getElementById("login-section").style.display = "block";
  document.getElementById("admin-panel").style.display = "none";
}

// Navigation functions
document
  .getElementById("nav-dashboard")
  .addEventListener("click", function (e) {
    e.preventDefault();
    showSection("dashboard");
  });

document.getElementById("nav-hero").addEventListener("click", function (e) {
  e.preventDefault();
  showSection("hero");
});

document.getElementById("nav-berita").addEventListener("click", function (e) {
  e.preventDefault();
  showSection("berita");
});

document.getElementById("nav-galeri").addEventListener("click", function (e) {
  e.preventDefault();
  showSection("galeri");
});

document.getElementById("nav-penduduk").addEventListener("click", function (e) {
  e.preventDefault();
  showSection("penduduk");
});

document.getElementById("nav-profil").addEventListener("click", function (e) {
  e.preventDefault();
  showSection("profil");
});

document.getElementById("nav-sejarah").addEventListener("click", function (e) {
  e.preventDefault();
  showSection("sejarah");
});

document
  .getElementById("nav-pemerintah")
  .addEventListener("click", function (e) {
    e.preventDefault();
    showSection("pemerintah");
  });

document.getElementById("nav-visi").addEventListener("click", function (e) {
  e.preventDefault();
  showSection("visi");
});

document
  .getElementById("nav-statistik")
  .addEventListener("click", function (e) {
    e.preventDefault();
    showSection("statistik");
  });

document.getElementById("nav-potensi").addEventListener("click", function (e) {
  e.preventDefault();
  showSection("potensi");
});

document.getElementById("nav-kontak").addEventListener("click", function (e) {
  e.preventDefault();
  showSection("kontak");
});

document.getElementById("nav-peta").addEventListener("click", function (e) {
  e.preventDefault();
  showSection("peta");
});

function showSection(section) {
  const sections = [
    "dashboard",
    "hero",
    "profil",
    "sejarah",
    "pemerintah",
    "penduduk",
    "visi",
    "statistik",
    "potensi",
    "berita",
    "galeri",
    "kontak",
    "peta",
  ];
  sections.forEach((s) => {
    document.getElementById(s + "-section").style.display =
      s === section ? "block" : "none";
  });
  if (section === "dashboard") loadDashboard();
  if (section === "berita") loadBerita();
  if (section === "galeri") loadGaleri();
  if (section === "sejarah") loadSejarah();
  if (section === "pemerintah") loadPemerintah();
  if (section === "penduduk") loadPenduduk();
  if (section === "visi") loadVisi();
  if (section === "statistik") loadStatistik();
  if (section === "potensi") loadPotensi();
  if (section === "kontak") loadKontak();
  if (section === "peta") loadPeta();
}

// Load dashboard stats
function loadDashboard() {
  const penduduk = JSON.parse(localStorage.getItem("penduduk") || "{}");
  const berita = JSON.parse(localStorage.getItem("berita") || "[]");
  const galeri = JSON.parse(localStorage.getItem("galeri") || "[]");

  const statsHtml = `
    <p>Total Penduduk: ${penduduk.total || 0}</p>
    <p>Laki-laki: ${penduduk.laki || 0}</p>
    <p>Perempuan: ${penduduk.perempuan || 0}</p>
    <p>Jumlah Berita: ${berita.length}</p>
    <p>Jumlah Galeri: ${galeri.length}</p>
  `;
  document.getElementById("dashboard-stats").innerHTML = statsHtml;
}

// Load berita list in admin
function loadBerita() {
  const berita = JSON.parse(localStorage.getItem("berita") || "[]");
  const listHtml = berita
    .map(
      (item, index) => `
    <div class="berita-item">
      <h4>${item.title}</h4>
      <p>${item.content}</p>
      <small>${item.date}</small>
      <button onclick="editBerita(${index})">Edit</button>
      <button onclick="deleteBerita(${index})">Hapus</button>
    </div>
  `
    )
    .join("");
  document.getElementById("berita-list").innerHTML = listHtml;
}

// Load galeri list in admin
function loadGaleri() {
  const galeri = JSON.parse(localStorage.getItem("galeri") || "[]");
  const listHtml = galeri
    .map(
      (item, index) => `
    <div class="galeri-item">
      <img src="${item.url}" alt="${item.caption}" style="width:100px; height:100px;">
      <p>${item.caption}</p>
      <button onclick="editGaleri(${index})">Edit</button>
      <button onclick="deleteGaleri(${index})">Hapus</button>
    </div>
  `
    )
    .join("");
  document.getElementById("galeri-list").innerHTML = listHtml;
}

// Edit functions
let editingBeritaIndex = -1;
let editingGaleriIndex = -1;

function editBerita(index) {
  const berita = JSON.parse(localStorage.getItem("berita") || "[]");
  const item = berita[index];
  document.getElementById("berita-title").value = item.title;
  document.getElementById("berita-category").value = item.category;
  document.getElementById("berita-content").value = item.content;
  editingBeritaIndex = index;
  document.querySelector("#berita-form button[type='submit']").textContent =
    "Update Berita";
}

function editGaleri(index) {
  const galeri = JSON.parse(localStorage.getItem("galeri") || "[]");
  const item = galeri[index];
  document.getElementById("galeri-caption").value = item.caption;
  editingGaleriIndex = index;
  document.querySelector("#galeri-form button[type='submit']").textContent =
    "Update Gambar";
}

// Delete functions
function deleteBerita(index) {
  const berita = JSON.parse(localStorage.getItem("berita") || "[]");
  berita.splice(index, 1);
  localStorage.setItem("berita", JSON.stringify(berita));
  loadBerita();
}

function deleteGaleri(index) {
  const galeri = JSON.parse(localStorage.getItem("galeri") || "[]");
  galeri.splice(index, 1);
  localStorage.setItem("galeri", JSON.stringify(galeri));
  loadGaleri();
}

// Handle sejarah form submission
document
  .getElementById("sejarah-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const text = document.getElementById("sejarah-text").value;
    const file = document.getElementById("sejarah-image").files[0];

    localStorage.setItem("sejarah-text", text);

    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        localStorage.setItem("sejarah-image", event.target.result);
        alert("Sejarah berhasil disimpan!");
      };
      reader.readAsDataURL(file);
    } else {
      alert("Sejarah berhasil disimpan!");
    }
  });

// Handle pemerintah form submission
document
  .getElementById("pemerintah-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const sekretaris = document.getElementById("sekretaris-desa").value;
    const bendahara = document.getElementById("bendahara-desa").value;

    localStorage.setItem("sekretaris-desa", sekretaris);
    localStorage.setItem("bendahara-desa", bendahara);

    alert("Data pemerintah berhasil disimpan!");
  });

// Handle visi form submission
document.getElementById("visi-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const visi = document.getElementById("visi-text").value;
  const misi = document.getElementById("misi-text").value;

  localStorage.setItem("visi-text", visi);
  localStorage.setItem("misi-text", misi);

  alert("Visi & Misi berhasil disimpan!");
});

// Handle statistik forms submission
document
  .getElementById("education-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const melekHuruf = document.getElementById("melek-huruf").value;
    const jumlahSekolah = document.getElementById("jumlah-sekolah").value;
    const jumlahSiswa = document.getElementById("jumlah-siswa").value;

    localStorage.setItem("stat-melek-huruf", melekHuruf);
    localStorage.setItem("stat-sekolah", jumlahSekolah);
    localStorage.setItem("stat-siswa", jumlahSiswa);

    alert("Data pendidikan berhasil disimpan!");
  });

document.getElementById("health-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const puskesmas = document.getElementById("jumlah-puskesmas").value;
  const posyandu = document.getElementById("jumlah-posyandu").value;
  const tenagaMedis = document.getElementById("jumlah-tenaga-medis").value;

  localStorage.setItem("stat-puskesmas", puskesmas);
  localStorage.setItem("stat-posyandu", posyandu);
  localStorage.setItem("stat-tenaga-medis", tenagaMedis);

  alert("Data kesehatan berhasil disimpan!");
});

document
  .getElementById("economy-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const pertanian = document.getElementById("persentase-pertanian").value;
    const perdagangan = document.getElementById("persentase-perdagangan").value;
    const lainnya = document.getElementById("persentase-lainnya").value;

    localStorage.setItem("stat-pertanian", pertanian);
    localStorage.setItem("stat-perdagangan", perdagangan);
    localStorage.setItem("stat-lainnya", lainnya);

    alert("Data ekonomi berhasil disimpan!");
  });

document
  .getElementById("infrastructure-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const jalanAspal = document.getElementById("panjang-jalan-aspal").value;
    const jembatan = document.getElementById("jumlah-jembatan").value;
    const irigasi = document.getElementById("panjang-irigasi").value;

    localStorage.setItem("stat-jalan-aspal", jalanAspal);
    localStorage.setItem("stat-jembatan", jembatan);
    localStorage.setItem("stat-irigasi", irigasi);

    alert("Data infrastruktur berhasil disimpan!");
  });

document
  .getElementById("agriculture-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const lahanSawah = document.getElementById("lahan-sawah").value;
    const lahanKering = document.getElementById("lahan-kering").value;
    const produksiPadi = document.getElementById("produksi-padi").value;

    localStorage.setItem("stat-lahan-sawah", lahanSawah);
    localStorage.setItem("stat-lahan-kering", lahanKering);
    localStorage.setItem("stat-produksi-padi", produksiPadi);

    alert("Data pertanian berhasil disimpan!");
  });

document
  .getElementById("tourism-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const objekWisata = document.getElementById("jumlah-objek-wisata").value;
    const wisatawanPerTahun = document.getElementById(
      "wisatawan-per-tahun"
    ).value;
    const potensiWisata = document.getElementById("potensi-wisata").value;

    localStorage.setItem("stat-objek-wisata", objekWisata);
    localStorage.setItem("stat-wisatawan-per-tahun", wisatawanPerTahun);
    localStorage.setItem("stat-potensi-wisata", potensiWisata);

    alert("Data pariwisata berhasil disimpan!");
  });

// Handle potensi form submission
document
  .getElementById("potensi-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const pertanian = document.getElementById("potensi-pertanian").value;
    const pariwisata = document.getElementById("potensi-pariwisata").value;
    const kerajinan = document.getElementById("potensi-kerajinan").value;

    localStorage.setItem("potensi-pertanian", pertanian);
    localStorage.setItem("potensi-pariwisata", pariwisata);
    localStorage.setItem("potensi-kerajinan", kerajinan);

    alert("Potensi berhasil disimpan!");
  });

// Handle kontak form submission
document.getElementById("kontak-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const alamat = document.getElementById("kontak-alamat").value;
  const telepon = document.getElementById("kontak-telepon").value;
  const email = document.getElementById("kontak-email").value;

  localStorage.setItem("kontak-alamat", alamat);
  localStorage.setItem("kontak-telepon", telepon);
  localStorage.setItem("kontak-email", email);

  alert("Kontak berhasil disimpan!");
});

// Handle hero form submission
document.getElementById("hero-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const file = document.getElementById("hero-image").files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      localStorage.setItem("hero-image", event.target.result);
      alert("Gambar hero berhasil disimpan!");
    };
    reader.readAsDataURL(file);
  } else {
    alert("Mohon upload file gambar!");
  }
});

// Handle peta form submission
document.getElementById("peta-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const embed = document.getElementById("peta-embed").value;

  localStorage.setItem("peta-embed", embed);

  alert("Peta berhasil disimpan!");
});

// Load functions for new sections
function loadSejarah() {
  const text = localStorage.getItem("sejarah-text") || "";
  document.getElementById("sejarah-text").value = text;
}

function loadPemerintah() {
  const sekretaris = localStorage.getItem("sekretaris-desa") || "";
  const bendahara = localStorage.getItem("bendahara-desa") || "";

  document.getElementById("sekretaris-desa").value = sekretaris;
  document.getElementById("bendahara-desa").value = bendahara;
}

function loadVisi() {
  const visi = localStorage.getItem("visi-text") || "";
  const misi = localStorage.getItem("misi-text") || "";

  document.getElementById("visi-text").value = visi;
  document.getElementById("misi-text").value = misi;
}

function loadStatistik() {
  // Education
  document.getElementById("melek-huruf").value =
    localStorage.getItem("stat-melek-huruf") || "";
  document.getElementById("jumlah-sekolah").value =
    localStorage.getItem("stat-sekolah") || "";
  document.getElementById("jumlah-siswa").value =
    localStorage.getItem("stat-siswa") || "";

  // Health
  document.getElementById("jumlah-puskesmas").value =
    localStorage.getItem("stat-puskesmas") || "";
  document.getElementById("jumlah-posyandu").value =
    localStorage.getItem("stat-posyandu") || "";
  document.getElementById("jumlah-tenaga-medis").value =
    localStorage.getItem("stat-tenaga-medis") || "";

  // Economy
  document.getElementById("persentase-pertanian").value =
    localStorage.getItem("stat-pertanian") || "";
  document.getElementById("persentase-perdagangan").value =
    localStorage.getItem("stat-perdagangan") || "";
  document.getElementById("persentase-lainnya").value =
    localStorage.getItem("stat-lainnya") || "";

  // Infrastructure
  document.getElementById("panjang-jalan-aspal").value =
    localStorage.getItem("stat-jalan-aspal") || "";
  document.getElementById("jumlah-jembatan").value =
    localStorage.getItem("stat-jembatan") || "";
  document.getElementById("panjang-irigasi").value =
    localStorage.getItem("stat-irigasi") || "";

  // Agriculture
  document.getElementById("lahan-sawah").value =
    localStorage.getItem("stat-lahan-sawah") || "";
  document.getElementById("lahan-kering").value =
    localStorage.getItem("stat-lahan-kering") || "";
  document.getElementById("produksi-padi").value =
    localStorage.getItem("stat-produksi-padi") || "";

  // Tourism
  document.getElementById("jumlah-objek-wisata").value =
    localStorage.getItem("stat-objek-wisata") || "";
  document.getElementById("wisatawan-per-tahun").value =
    localStorage.getItem("stat-wisatawan-per-tahun") || "";
  document.getElementById("potensi-wisata").value =
    localStorage.getItem("stat-potensi-wisata") || "";
}

function loadPotensi() {
  document.getElementById("potensi-pertanian").value =
    localStorage.getItem("potensi-pertanian") || "";
  document.getElementById("potensi-pariwisata").value =
    localStorage.getItem("potensi-pariwisata") || "";
  document.getElementById("potensi-kerajinan").value =
    localStorage.getItem("potensi-kerajinan") || "";
}

function loadKontak() {
  document.getElementById("kontak-alamat").value =
    localStorage.getItem("kontak-alamat") || "";
  document.getElementById("kontak-telepon").value =
    localStorage.getItem("kontak-telepon") || "";
  document.getElementById("kontak-email").value =
    localStorage.getItem("kontak-email") || "";
}

function loadPeta() {
  document.getElementById("peta-embed").value =
    localStorage.getItem("peta-embed") || "";
}

function loadPenduduk() {
  const penduduk = JSON.parse(localStorage.getItem("penduduk") || "{}");
  document.getElementById("penduduk-total").value = penduduk.total || "";
  document.getElementById("penduduk-laki").value = penduduk.laki || "";
  document.getElementById("penduduk-perempuan").value = penduduk.perempuan || "";
}
