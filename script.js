// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Hamburger menu toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// Dropdown menu toggle for mobile
document.querySelectorAll(".dropbtn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const dropdownContent = this.nextElementSibling;
      dropdownContent.classList.toggle("active");
    }
  });
});

// Contact form submission
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Simple validation
  if (name && email && message) {
    alert(
      `Terima kasih ${name}! Pesan Anda telah dikirim. Kami akan segera menghubungi Anda.`
    );
    contactForm.reset();
  } else {
    alert("Mohon lengkapi semua field.");
  }
});

// Gallery lightbox functionality (simple version)
function updateGalleryLightbox() {
  // Remove existing event listeners by cloning and replacing
  const galleryGrid = document.querySelector(".gallery-grid");
  if (galleryGrid) {
    const clonedGrid = galleryGrid.cloneNode(true);
    galleryGrid.parentNode.replaceChild(clonedGrid, galleryGrid);

    // Add lightbox to new images
    const galleryImages = clonedGrid.querySelectorAll("img");
    galleryImages.forEach((img) => {
      img.addEventListener("click", () => {
        const modal = document.createElement("div");
        modal.style.position = "fixed";
        modal.style.top = "0";
        modal.style.left = "0";
        modal.style.width = "100%";
        modal.style.height = "100%";
        modal.style.backgroundColor = "rgba(0,0,0,0.8)";
        modal.style.display = "flex";
        modal.style.alignItems = "center";
        modal.style.justifyContent = "center";
        modal.style.zIndex = "10000";
        modal.style.cursor = "pointer";

        const modalImg = document.createElement("img");
        modalImg.src = img.src;
        modalImg.style.maxWidth = "90%";
        modalImg.style.maxHeight = "90%";
        modalImg.style.objectFit = "contain";

        modal.appendChild(modalImg);
        document.body.appendChild(modal);

        modal.addEventListener("click", () => {
          document.body.removeChild(modal);
        });
      });
    });
  }
}

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Apply animations to sections
document.querySelectorAll("section > .container").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(section);
});

// Header background change on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.background =
      "linear-gradient(135deg, rgba(44, 62, 80, 0.95), rgba(52, 152, 219, 0.95))";
  } else {
    header.style.background = "linear-gradient(135deg, #2c3e50, #3498db)";
  }
});

// Typing effect for hero text (optional enhancement)
const heroText = document.querySelector(".hero h2");
const originalText = heroText.textContent;
heroText.textContent = "";

let i = 0;
function typeWriter() {
  if (i < originalText.length) {
    heroText.textContent += originalText.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
}

// Start typing effect after page load
window.addEventListener("load", () => {
  setTimeout(typeWriter, 1000);
  loadContentFromStorage();
});

// Reload content when page becomes visible (e.g., when navigating back from admin page)
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    loadContentFromStorage();
  }
});

// Polling mechanism to check for localStorage changes every 2 seconds
let lastStorageCheck = Date.now();
setInterval(() => {
  const currentTime = Date.now();
  // Only check if page is visible to avoid unnecessary operations
  if (!document.hidden) {
    // Check if any relevant localStorage keys have changed
    const keysToCheck = [
      "galeri",
      "berita",
      "hero-image",
      "sejarah-image",
      "about-text",
      "kepala-desa",
      "sekretaris-desa",
      "bendahara-desa",
      "visi-text",
      "misi-text",
      "sejarah-text",
      "penduduk",
      "stat-penduduk",
      "stat-laki-laki",
      "stat-perempuan",
      "about-penduduk",
      "about-luas",
      "about-dusun",
      "kontak-alamat",
      "kontak-telepon",
      "kontak-email",
    ];

    let hasChanges = false;
    keysToCheck.forEach((key) => {
      const currentValue = localStorage.getItem(key);
      const lastValue = sessionStorage.getItem(`last_${key}`);
      if (currentValue !== lastValue) {
        hasChanges = true;
        sessionStorage.setItem(`last_${key}`, currentValue || "");
      }
    });

    if (hasChanges) {
      loadContentFromStorage();
    }
  }
  lastStorageCheck = currentTime;
}, 2000); // Check every 2 seconds

// Listen for localStorage changes to update content responsively
window.addEventListener("storage", function (e) {
  if (e.key === "penduduk") {
    loadDemografi();
  }
  if (e.key === "hero-image") {
    const heroImage = localStorage.getItem("hero-image");
    if (heroImage) {
      document.querySelector(
        ".hero"
      ).style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${heroImage}")`;
    }
  }
  if (e.key === "galeri") {
    loadGaleri();
  }
  if (e.key === "berita") {
    loadBerita();
  }
  if (e.key === "sejarah-image") {
    const sejarahImage = localStorage.getItem("sejarah-image");
    if (sejarahImage) {
      document.getElementById("sejarah-image").src = sejarahImage;
    }
  }
  // Update stats when population data changes
  if (e.key.startsWith("stat-") || e.key.startsWith("about-")) {
    const element = document.getElementById(e.key);
    if (element) {
      const value = localStorage.getItem(e.key);
      if (value) {
        element.textContent = value;
      }
    }
  }
  // Update text content
  if (
    [
      "about-text",
      "kepala-desa",
      "sekretaris-desa",
      "bendahara-desa",
      "visi-text",
      "sejarah-text",
    ].includes(e.key)
  ) {
    const element = document.getElementById(e.key);
    if (element) {
      const value = localStorage.getItem(e.key);
      if (value) {
        element.textContent = value;
      }
    }
  }
  // Update misi-text
  if (e.key === "misi-text") {
    const value = localStorage.getItem("misi-text");
    if (value) {
      document.getElementById("misi-text").innerHTML = value;
    }
  }
  // Update potensi content
  if (e.key.startsWith("potensi-")) {
    const element = document.getElementById(e.key);
    if (element) {
      const value = localStorage.getItem(e.key);
      if (value) {
        element.textContent = value;
      }
    }
  }
  // Update contact info
  if (e.key.startsWith("kontak-")) {
    const value = localStorage.getItem(e.key);
    if (value) {
      if (e.key === "kontak-alamat") {
        document.querySelector(
          "#contact .contact-info p:nth-child(2)"
        ).innerHTML = "<strong>Alamat:</strong> " + value;
      } else if (e.key === "kontak-telepon") {
        document.querySelector(
          "#contact .contact-info p:nth-child(3)"
        ).innerHTML = "<strong>Telepon:</strong> " + value;
      } else if (e.key === "kontak-email") {
        document.querySelector(
          "#contact .contact-info p:nth-child(4)"
        ).innerHTML = "<strong>Email:</strong> " + value;
      }
    }
  }
});

// Function to load content from localStorage
function loadContentFromStorage() {
  // Load text content elements
  const textElements = [
    "about-text",
    "kepala-desa",
    "sekretaris-desa",
    "bendahara-desa",
    "visi-text",
    "sejarah-text",
  ];

  textElements.forEach((id) => {
    const value = localStorage.getItem(id);
    if (value) {
      document.getElementById(id).textContent = value;
    }
  });

  // Load misi-text as innerHTML for list items
  const misiText = localStorage.getItem("misi-text");
  if (misiText) {
    document.getElementById("misi-text").innerHTML = misiText;
  }

  // Load sejarah-image src
  const sejarahImage = localStorage.getItem("sejarah-image");
  if (sejarahImage) {
    document.getElementById("sejarah-image").src = sejarahImage;
  }

  // Load all stat elements
  const statElements = document.querySelectorAll('[id^="stat-"]');
  statElements.forEach((element) => {
    const key = element.id;
    const value = localStorage.getItem(key);
    if (value) {
      element.textContent = value;
    }
  });

  // Load about section stats
  const aboutStatElements = ["about-penduduk", "about-luas", "about-dusun"];
  aboutStatElements.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      const value = localStorage.getItem(id);
      if (value) {
        element.textContent = value;
      }
    }
  });

  // Load additional stat elements with "stat-" prefix
  const additionalStatElements = [
    "stat-melek-huruf",
    "stat-sekolah",
    "stat-siswa",
    "stat-puskesmas",
    "stat-posyandu",
    "stat-tenaga-medis",
    "stat-pertanian",
    "stat-perdagangan",
    "stat-lainnya",
    "stat-jalan-aspal",
    "stat-jembatan",
    "stat-irigasi",
    "stat-lahan-sawah",
    "stat-lahan-kering",
    "stat-produksi-padi",
    "stat-objek-wisata",
    "stat-wisatawan-per-tahun",
    "stat-potensi-wisata",
  ];

  additionalStatElements.forEach((key) => {
    const element = document.getElementById(key);
    if (element) {
      const value = localStorage.getItem(key);
      if (value) {
        element.textContent = value;
      }
    }
  });

  // Load all potensi elements
  const potensiElements = document.querySelectorAll('[id^="potensi-"]');
  potensiElements.forEach((element) => {
    const key = element.id;
    const value = localStorage.getItem(key);
    if (value) {
      element.textContent = value;
    }
  });

  // Load contact information
  const contactAlamat = localStorage.getItem("kontak-alamat");
  const contactTelepon = localStorage.getItem("kontak-telepon");
  const contactEmail = localStorage.getItem("kontak-email");

  if (contactAlamat) {
    document.querySelector("#contact .contact-info p:nth-child(2)").innerHTML =
      "<strong>Alamat:</strong> " + contactAlamat;
  }
  if (contactTelepon) {
    document.querySelector("#contact .contact-info p:nth-child(3)").innerHTML =
      "<strong>Telepon:</strong> " + contactTelepon;
  }
  if (contactEmail) {
    document.querySelector("#contact .contact-info p:nth-child(4)").innerHTML =
      "<strong>Email:</strong> " + contactEmail;
  }

  // Load hero background image
  const heroImage = localStorage.getItem("hero-image");
  if (heroImage) {
    document.querySelector(
      ".hero"
    ).style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${heroImage}")`;
  }

  // Load dynamic content
  loadBerita();
  loadGaleri();
}

// Load berita from localStorage
function loadBerita() {
  const berita = JSON.parse(localStorage.getItem("berita") || "[]");
  const newsGrid = document.querySelector(".news-grid");

  if (berita.length > 0) {
    const beritaHtml = berita
      .map(
        (item, index) => `
      <div class="news-item" data-index="${index}">
        <img src="${
          item.image || "https://via.placeholder.com/300x200?text=Berita"
        }" alt="Berita" />
        <h3>${item.title}</h3>
        <div class="news-summary">
          <p>${item.content.substring(0, 100)}...</p>
          <small>${item.date}</small>
        </div>
        <div class="news-full" style="display: none;">
          <p>${item.content}</p>
          <small>${item.date}</small>
        </div>
        <a href="#" class="read-more">Baca Selengkapnya</a>
      </div>
    `
      )
      .join("");
    newsGrid.innerHTML = beritaHtml;

    // Add event listeners to read-more links
    document.querySelectorAll(".read-more").forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const newsItem = this.closest(".news-item");
        const summary = newsItem.querySelector(".news-summary");
        const full = newsItem.querySelector(".news-full");
        if (full.style.display === "none") {
          full.style.display = "block";
          summary.style.display = "none";
          this.textContent = "Tutup";
        } else {
          full.style.display = "none";
          summary.style.display = "block";
          this.textContent = "Baca Selengkapnya";
        }
      });
    });
  }
}

// Load galeri from localStorage
function loadGaleri() {
  const galeri = JSON.parse(localStorage.getItem("galeri") || "[]");
  const galleryGrid = document.querySelector(".gallery-grid");

  if (galeri.length > 0) {
    const galeriHtml = galeri
      .map(
        (item) => `
      <img src="${item.url}" alt="${item.caption}" />
    `
      )
      .join("");
    galleryGrid.innerHTML = galeriHtml;
  }
}
// Function to load aparatur data from CMS
async function loadAparaturData() {
  try {
    // Fetch aparatur data from CMS JSON file
    const response = await fetch('/_data/aparatur.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const aparaturData = await response.json();

    // Get the container element
    const container = document.getElementById('aparatur-list-container');
    if (!container) {
      console.error('Container element with ID "aparatur-list-container" not found');
      return;
    }

    // Clear existing content
    container.innerHTML = '';

    // Loop through each aparatur item and create HTML elements
    aparaturData.forEach(apatur => {
      // Create card element using Bootstrap structure
      const cardDiv = document.createElement('div');
      cardDiv.className = 'col-md-4 mb-4';

      const cardHtml = `
        <div class="card h-100">
          <img src="${apatur.foto || 'https://via.placeholder.com/300x200?text=Aparatur'}" class="card-img-top" alt="${apatur.nama}" style="height: 200px; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title">${apatur.nama}</h5>
            <p class="card-text"><strong>Jabatan:</strong> ${apatur.jabatan}</p>
            ${apatur.tugas && apatur.tugas.length > 0 ? `
              <p class="card-text"><strong>Tugas:</strong></p>
              <ul class="list-unstyled">
                ${apatur.tugas.map(tugas => `<li>• ${tugas['poin-tugas'] || tugas}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
        </div>
      `;

      cardDiv.innerHTML = cardHtml;
      container.appendChild(cardDiv);
    });

    console.log('Aparatur data loaded successfully from CMS');

  } catch (error) {
    console.error('Error loading aparatur data from CMS:', error);
    // Fallback: show error message in container
    const container = document.getElementById('aparatur-list-container');
    if (container) {
      container.innerHTML = '<div class="col-12"><p class="text-center">Data aparatur sedang dimuat...</p></div>';
    }
  }
}
