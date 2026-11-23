// ============================================================
//  PERFUMERÍA JR — Lógica del carrito de compras
//  Maneja: agregar, quitar, cambiar cantidades y calcular total.
//  También conecta con WhatsApp para enviar el pedido.
// ============================================================

// --- El carrito es un array de objetos {product, ml, price, qty} ---
let cart = [];

// ─── NÚMERO DE WHATSAPP (cambia este número cuando quieras) ───
const WHATSAPP_NUMBER = '573126618447'; // +57 Colombia

// --- Agrega un producto al carrito ---
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  // Leemos el tamaño activo seleccionado
  const card    = document.getElementById(`product-${productId}`);
  const activeSize = card.querySelector('.size-btn.active');
  const ml      = parseInt(activeSize.getAttribute('data-ml'));
  const price   = parseInt(activeSize.getAttribute('data-price'));

  // Buscamos si ya existe en el carrito
  const existingIndex = cart.findIndex(
    item => item.product.id === productId && item.ml === ml
  );

  if (existingIndex >= 0) {
    // Si ya está, solo aumentamos la cantidad
    cart[existingIndex].qty++;
  } else {
    // Si no está, lo agregamos con cantidad 1
    cart.push({ product, ml, price, qty: 1 });
  }

  // Animación visual: flash en el botón
  const btn = document.getElementById(`btn-${productId}`);
  btn.classList.add('added');
  setTimeout(() => btn.classList.remove('added'), 600);

  updateCart();
  openCart();
}

// --- Cambia la cantidad de un ítem del carrito ---
function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);  // Si llega a 0, lo elimina
  }
  updateCart();
}

// --- Elimina un ítem del carrito ---
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// --- Abre el panel lateral del carrito ---
function openCart() {
  document.getElementById('cart-drawer').classList.add('open');
  document.getElementById('cart-overlay').classList.add('visible');
  document.body.style.overflow = 'hidden';  // Bloquea el scroll del fondo
}

// --- Cierra el panel lateral del carrito ---
function closeCart() {
  document.getElementById('cart-drawer').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('visible');
  document.body.style.overflow = '';
}

// --- Recalcula y redibuja el carrito completo ---
function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartCount = document.getElementById('cart-count');
  const cartEmpty = document.getElementById('cart-empty');

  // Total de unidades para el badge del ícono
  const totalUnits = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = totalUnits;
  cartCount.style.display = totalUnits > 0 ? 'flex' : 'none';

  // Si el carrito está vacío, mostramos el mensaje vacío
  if (cart.length === 0) {
    cartItems.innerHTML = '';
    cartEmpty.style.display = 'flex';
    cartTotal.textContent = '$0';
    return;
  }

  cartEmpty.style.display = 'none';

  // Dibujamos cada ítem del carrito
  cartItems.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <img src="${item.product.image}"
           alt="${item.product.name}"
           class="cart-item-img"
           onerror="this.src='assets/images/placeholder.png'">
      <div class="cart-item-details">
        <p class="cart-item-name">${item.product.name}</p>
        <p class="cart-item-size">${item.ml}ml</p>
        <p class="cart-item-price">${formatCOP(item.price * item.qty)}</p>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="changeQty(${index}, -1)" aria-label="Reducir cantidad">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${index}, 1)" aria-label="Aumentar cantidad">+</button>
        <button class="remove-btn" onclick="removeFromCart(${index})" aria-label="Eliminar del carrito">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
            <path d="M10 11v6"/><path d="M14 11v6"/>
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
          </svg>
        </button>
      </div>
    </div>
  `).join('');

  // Calculamos el total
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  cartTotal.textContent = formatCOP(total);
}

// --- Genera el mensaje para WhatsApp con el resumen del pedido ---
function sendWhatsApp() {
  if (cart.length === 0) {
    alert('¡Tu carrito está vacío! Agrega algún perfume primero. 🛒');
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  let message = '🌟 *Hola, PERFUMERÍA JR!* Quiero hacer el siguiente pedido:\n\n';

  cart.forEach(item => {
    message += `• *${item.product.name}* — ${item.ml}ml x${item.qty} = ${formatCOP(item.price * item.qty)}\n`;
  });

  message += `\n💰 *Total: ${formatCOP(total)}*\n\n`;
  message += '¿Me podrías confirmar disponibilidad y forma de pago? ¡Gracias! 😊';

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// --- Inicializamos los eventos del carrito al cargar la página ---
document.addEventListener('DOMContentLoaded', () => {
  // Cerrar carrito al hacer clic en el overlay (área oscura del fondo)
  const overlay = document.getElementById('cart-overlay');
  if (overlay) {
    overlay.addEventListener('click', closeCart);
  }

  // Inicializamos el contador del carrito
  updateCart();
});
