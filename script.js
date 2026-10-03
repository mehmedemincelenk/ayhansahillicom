const header = document.querySelector("[data-header]");

window.addEventListener(
  "scroll",
  () => header?.classList.toggle("scrolled", window.scrollY > 16),
  { passive: true },
);

const accordionButtons = document.querySelectorAll("[data-accordion] .accordion-item > button");

accordionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";

    accordionButtons.forEach((item) => {
      item.setAttribute("aria-expanded", "false");
      const panel = item.nextElementSibling;
      if (panel) panel.hidden = true;
    });

    if (!isOpen) {
      button.setAttribute("aria-expanded", "true");
      const panel = button.nextElementSibling;
      if (panel) panel.hidden = false;
    }
  });
});

const testimonialExamples = [
  ["LGS hazırlık · 8. sınıf", "matematik kaygısının nasıl azaldığını", "özgüvenindeki değişimi ve ders sürecini"],
  ["TYT–AYT hazırlık · 12. sınıf", "netlerindeki gelişimi ve sınav hazırlığını", "çalışma disiplininde gözlemlediği değişimi"],
  ["Okula destek · 10. sınıf", "konu eksiklerini nasıl kapattığını", "okul başarısındaki gelişimi"],
  ["Ortaokul matematik · 6. sınıf", "matematiğe bakışının nasıl değiştiğini", "derse karşı artan ilgisini"],
  ["LGS hazırlık · 8. sınıf", "yeni nesil sorularda kazandığı yaklaşımı", "sınav sürecindeki güven artışını"],
  ["TYT matematik · 11. sınıf", "temelini güçlendiren çalışma biçimini", "düzenli çalışma alışkanlığını"],
  ["AYT matematik · 12. sınıf", "zor sorularda geliştirdiği çözüm yöntemini", "hedefe yönelik ilerleyişini"],
  ["Okula destek · 9. sınıf", "liseye geçişte aldığı desteği", "yeni düzene uyum sürecini"],
  ["Ortaokul matematik · 7. sınıf", "problem sorularındaki gelişimini", "soru çözme isteğindeki artışı"],
  ["YKS hazırlık · mezun", "yeniden hazırlık dönemindeki planını", "süreç boyunca sürdürülen takibi"],
  ["LGS hazırlık · 8. sınıf", "deneme analizlerinden nasıl yararlandığını", "eksiklerin düzenli kapatılmasını"],
  ["Birebir ders · 10. sınıf", "birebir dersin verimliliğini ve odaklanmayı", "ders temposundaki istikrarı ve düzeni"],
  ["Yüz yüze ders · 7. sınıf", "birebir pratikte yaşadığı gelişimi", "ders sonrasındaki olumlu değişimi"],
  ["TYT matematik · 12. sınıf", "soru çözme hızındaki gelişimi", "zaman yönetiminde gözlemlediği ilerlemeyi"],
  ["Okula destek · 5. sınıf", "matematik temelini nasıl güçlendirdiğini", "ödev ve tekrar düzenindeki gelişimi"],
  ["AYT matematik · 12. sınıf", "konular arasındaki bağlantıları fark etmesini", "zorlandığı alanlardaki ilerlemeyi"],
  ["Ortaokul matematik · 6. sınıf", "hata yapmaktan çekinmemeyi öğrenmesini", "matematik özgüvenindeki değişimi"],
  ["LGS hazırlık · 8. sınıf", "sınav temposuna nasıl hazırlandığını", "planlı çalışma alışkanlığını"],
  ["Lise matematik · 11. sınıf", "geometri çalışmalarındaki gelişimini", "ders notlarındaki ilerlemeyi"],
  ["TYT matematik · 12. sınıf", "temel sorulardan ileri sorulara geçişini", "net artışına eşlik eden çalışma düzenini"],
  ["Okula destek · 9. sınıf", "anlamadığı soruları ifade etme rahatlığını", "öğretmen–öğrenci iletişiminin etkisini"],
  ["YKS hazırlık · mezun", "kişisel çalışma planının katkısını", "motivasyonunun korunmasını"],
  ["Ortaokul matematik · 7. sınıf", "düzenli soru çözme alışkanlığını", "sorumluluk alma konusundaki gelişimi"],
  ["LGS hazırlık · 8. sınıf", "birebir soru çözümlerindeki hız ve pratikliği", "düzenli konu takibini ve sınav verimini"],
  ["Lise matematik · 10. sınıf", "zorlandığı konularda kazandığı yöntemi", "öğrenciye özel planın sonuçlarını"],
];

const slider = document.querySelector("[data-slider]");
const sliderTrack = slider?.querySelector("[data-slider-track]");

if (sliderTrack) {
  sliderTrack.innerHTML = testimonialExamples
    .map(([context, studentTheme, parentTheme], index) => {
      const number = String(index + 1).padStart(2, "0");

      return `
        <article class="family-card" data-slide>
          <div class="family-card-head">
            <div class="family-avatar" aria-hidden="true">${number}</div>
            <div><h3>[Aile ${number}] Ailesi</h3><span>${context}</span></div>
          </div>
          <div class="quote-pair">
            <blockquote>
              <span>Öğrenci</span>
              <p>“[Öğrencinin ${studentTheme} anlatan gerçek yorumu buraya gelecek.]”</p>
            </blockquote>
            <blockquote>
              <span>Veli</span>
              <p>“[Velinin ${parentTheme} anlatan gerçek yorumu buraya gelecek.]”</p>
            </blockquote>
          </div>
        </article>`;
    })
    .join("");
}

const slides = slider ? [...slider.querySelectorAll("[data-slide]")] : [];
const previousButton = slider?.querySelector("[data-slider-prev]");
const nextButton = slider?.querySelector("[data-slider-next]");
const dotsContainer = slider?.querySelector("[data-slider-dots]");
let slideCounter;

if (dotsContainer) {
  dotsContainer.innerHTML = '<span class="slider-count" aria-live="polite"></span>';
  slideCounter = dotsContainer.querySelector(".slider-count");
}

let currentPage = 0;

const getSlidesPerPage = () => (window.matchMedia("(min-width: 880px)").matches ? 2 : 1);

const showSlide = (index) => {
  if (!sliderTrack || slides.length === 0) return;

  const slidesPerPage = getSlidesPerPage();
  const pageCount = Math.ceil(slides.length / slidesPerPage);
  currentPage = (index + pageCount) % pageCount;

  const firstVisibleIndex = Math.min(currentPage * slidesPerPage, slides.length - slidesPerPage);
  const lastVisibleIndex = Math.min(firstVisibleIndex + slidesPerPage, slides.length);
  sliderTrack.style.transform = `translateX(-${slides[firstVisibleIndex].offsetLeft}px)`;

  if (slideCounter) {
    const firstNumber = String(firstVisibleIndex + 1).padStart(2, "0");
    const lastNumber = String(lastVisibleIndex).padStart(2, "0");
    const total = String(slides.length).padStart(2, "0");
    slideCounter.textContent = slidesPerPage === 1 ? `${firstNumber} / ${total}` : `${firstNumber}–${lastNumber} / ${total}`;
  }
};

previousButton?.addEventListener("click", () => showSlide(currentPage - 1));
nextButton?.addEventListener("click", () => showSlide(currentPage + 1));
showSlide(0);

let resizeTimeout;
window.addEventListener("resize", () => {
  window.clearTimeout(resizeTimeout);
  resizeTimeout = window.setTimeout(() => showSlide(currentPage), 120);
});

let touchStartX = 0;
sliderTrack?.addEventListener(
  "touchstart",
  (event) => {
    touchStartX = event.touches[0].clientX;
  },
  { passive: true },
);

sliderTrack?.addEventListener(
  "touchend",
  (event) => {
    const distance = touchStartX - event.changedTouches[0].clientX;
    if (Math.abs(distance) < 45) return;
    showSlide(distance > 0 ? currentPage + 1 : currentPage - 1);
  },
  { passive: true },
);

const revealElements = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

const contactForm = document.querySelector("[data-contact-form]");
const toast = document.querySelector("[data-toast]");
let toastTimeout;

const showToast = (message) => {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("visible"), 4200);
};

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const role = formData.get("role");
  const level = formData.get("level");
  const location = formData.get("location");
  const goal = String(formData.get("goal") || "").trim();
  const phoneNumber = contactForm.dataset.whatsappNumber?.replace(/\D/g, "") ?? "";

  const message = [
    "Merhaba Ayhan Hocam, yüz yüze matematik özel dersi hakkında bilgi almak istiyorum.",
    "",
    `Adım: ${name}`,
    `Başvuru: ${role}`,
    `Sınıf / hazırlık: ${level}`,
    location ? `İlçe / Bölge: ${location}` : "",
    goal ? `Hedef / ihtiyaç: ${goal}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  if (!phoneNumber) {
    showToast("Ayhan Hoca'nın WhatsApp numarası henüz siteye eklenmedi. Mesaj paylaşım ekranı açılıyor.");
  }

  const whatsappUrl = phoneNumber
    ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    : `https://wa.me/?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});

const yearElement = document.querySelector("[data-year]");
if (yearElement) yearElement.textContent = new Date().getFullYear();
