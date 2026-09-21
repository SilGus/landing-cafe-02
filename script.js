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
