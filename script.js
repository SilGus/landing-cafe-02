// Editá este listado para reemplazar los testimonios de muestra.
const testimonials = [
  {
    quote: 'Con la tabla de diagnóstico entendí por qué mi café salía agrio. Cambié una sola variable y la diferencia fue evidente.',
    name: 'Marina, 34',
    context: 'Prensa francesa',
  },
  {
    quote: 'Dejé de comprar café por el envase. Ahora sé mirar la fecha, el tueste y elegir algo que funciona con mi cafetera.',
    name: 'Nicolás, 41',
    context: 'Cafetera italiana',
  },
  {
    quote: 'El recetario me dio opciones que puedo hacer sin máquina de espresso. Ya tengo tres bebidas que repito los fines de semana.',
    name: 'Sofía, 29',
    context: 'V60 y espumador manual',
  },
  {
    quote: 'No tenía ganas de hacer un curso de barista. Tuve la suerte de encontrar este método y ahora sí preparo café de especialidad como en una cafetería, pero en casa.',
    name: 'Federico, 38',
    context: 'Cafetera Moka',
  },
  {
    quote: 'Pensaba que necesitaba una cafetera nueva. Ajusté la molienda y las proporciones con lo que ya tenía, y el café cambió por completo.',
    name: 'Martín, 36',
    context: 'Prensa francesa',
  },
  {
    quote: 'Ahora, cuando vienen amigos, puedo preparar varias tazas sin improvisar. Me gusta que me pregunten cómo aprendí a hacerlo.',
    name: 'Diego, 43',
    context: 'V60 y cafetera italiana',
  },
];

const quote = document.querySelector('#testimonial-quote');
const author = document.querySelector('#testimonial-name');
const context = document.querySelector('#testimonial-context');
const dots = document.querySelector('#testimonial-dots');
const previous = document.querySelector('#testimonial-prev');
const next = document.querySelector('#testimonial-next');
let currentSlide = 0;

function renderTestimonial() {
  const testimonial = testimonials[currentSlide];
  quote.textContent = `“${testimonial.quote}”`;
  author.textContent = testimonial.name;
  context.textContent = testimonial.context;

  dots.querySelectorAll('button').forEach((dot, index) => {
    dot.classList.toggle('is-active', index === currentSlide);
    dot.setAttribute('aria-current', index === currentSlide ? 'true' : 'false');
  });
}

testimonials.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.setAttribute('aria-label', `Ir al testimonio ${index + 1}`);
  dot.addEventListener('click', () => {
    currentSlide = index;
    renderTestimonial();
  });
  dots.appendChild(dot);
});

previous.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
  renderTestimonial();
});

next.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % testimonials.length;
  renderTestimonial();
});

renderTestimonial();

const countdownHours = document.querySelector('#countdown-hours');
const countdownMinutes = document.querySelector('#countdown-minutes');
const countdownSeconds = document.querySelector('#countdown-seconds');

function updateCountdown() {
  if (!countdownHours || !countdownMinutes || !countdownSeconds) return;

  const now = new Date();
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  const remaining = Math.max(0, endOfDay.getTime() - now.getTime());
  const hours = Math.floor(remaining / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1_000);

  countdownHours.textContent = String(hours).padStart(2, '0');
  countdownMinutes.textContent = String(minutes).padStart(2, '0');
  countdownSeconds.textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1_000);

const hero = document.querySelector('#inicio');
const checkout = document.querySelector('#checkout');
const stickyCta = document.querySelector('#sticky-cta');
let heroVisible = true;
let checkoutVisible = false;

function updateStickyCta() {
  stickyCta.classList.toggle('is-visible', !heroVisible && !checkoutVisible);
}

const heroObserver = new IntersectionObserver(([entry]) => {
  heroVisible = entry.isIntersecting;
  updateStickyCta();
}, { threshold: 0.05 });

const checkoutObserver = new IntersectionObserver(([entry]) => {
  checkoutVisible = entry.isIntersecting;
  updateStickyCta();
}, { threshold: 0.05 });

heroObserver.observe(hero);
checkoutObserver.observe(checkout);
