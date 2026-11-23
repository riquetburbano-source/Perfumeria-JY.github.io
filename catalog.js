// ============================================================
//  JY PERFUMERÍA — Lógica del catálogo
//  Tarjeta limpia (solo imagen + nombre). Clic → modal con
//  imagen grande, notas y descripción.
// ============================================================

let currentCategory = 'todos';
let currentSearch   = '';

const WA_NUMBER_1 = '573126618447';
const WA_NUMBER_2 = '573042772862';

// ─── Renderiza las tarjetas ─────────────────────────────────
function renderProducts() {
  const grid      = document.getElementById('products-grid');
  const noResults = document.getElementById('no-results');

  const filtered = products.filter(p => {
    const matchCat    = currentCategory === 'todos' || p.category === currentCategory;
    const matchSearch = p.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
                        p.notes.toLowerCase().includes(currentSearch.toLowerCase()) ||
                        p.description.toLowerCase().includes(currentSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '';
    noResults.style.display = 'flex';
    return;
  }
  noResults.style.display = 'none';

  grid.innerHTML = filtered.map(product => {
    const badgeHTML = product.badge
      ? `<span class="product-badge">${product.badge}</span>`
      : '';
    return `
      <article class="product-card"
               id="product-${product.id}"
               role="listitem"
               onclick="openModal(${product.id})"
               tabindex="0"
               aria-label="Ver detalles de ${product.name}"
               onkeydown="if(event.key==='Enter')openModal(${product.id})">
        ${badgeHTML}

        <div class="product-image-wrapper">
          <img src="${product.image}"
               alt="${product.name}"
               class="product-image"
               loading="lazy"
               onerror="this.style.opacity='0.2'">
          <!-- Pista visual de que es clicable -->
          <div class="product-click-hint" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
            <span>Ver detalles</span>
          </div>
        </div>

        <div class="product-card-footer">
          <div class="product-category-tag">${categoryLabel(product.category)}</div>
          <h3 class="product-name">${product.name}</h3>
        </div>
      </article>
    `;
  }).join('');
}

// ─── MODAL ──────────────────────────────────────────────────
function openModal(productId) {
  const p = products.find(x => x.id === productId);
  if (!p) return;

  const waText = encodeURIComponent(
    `Hola, vi el catálogo de JY Perfumería y quiero consultar el precio de *${p.name}*.`
  );

  document.getElementById('modal-image').src = p.image;
  document.getElementById('modal-image').alt = p.name;
  document.getElementById('modal-category').textContent = categoryLabel(p.category);
  document.getElementById('modal-name').textContent = p.name;
  document.getElementById('modal-notes').textContent = p.notes;
  document.getElementById('modal-desc').textContent  = p.description;
  document.getElementById('modal-wa-1').href = `https://wa.me/${WA_NUMBER_1}?text=${waText}`;
  document.getElementById('modal-wa-2').href = `https://wa.me/${WA_NUMBER_2}?text=${waText}`;

  const modal = document.getElementById('product-modal');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Foco al modal para accesibilidad
  modal.querySelector('.modal-close').focus();
}

function closeModal() {
  document.getElementById('product-modal').classList.remove('open');
  document.body.style.overflow = '';
}

// Cerrar con Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ─── Filtrar por categoría ───────────────────────────────────
function filterByCategory(category) {
  currentCategory = category;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    const isActive = btn.getAttribute('data-category') === category;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive);
  });
  renderProducts();
}

// ─── Búsqueda ────────────────────────────────────────────────
function searchProducts(query) {
  currentSearch = query;
  renderProducts();
}

// ─── Etiqueta de categoría ───────────────────────────────────
function categoryLabel(cat) {
  const labels = { hombre: '♂ Hombre', mujer: '♀ Mujer', unisex: '⊕ Unisex' };
  return labels[cat] || cat;
}

// ─── Inicialización ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', e => searchProducts(e.target.value));
  }

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => filterByCategory(btn.getAttribute('data-category')));
  });
});
