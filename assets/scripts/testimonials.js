const testimonialContent = document.querySelector('.testimonial-content');
let testimonials;

const testimonialBuilder = {
  testimonialParagraphs: (testimonialText) => {
    let testimonialTextElement;
    if (
      !!testimonialText
      && Array.isArray(testimonialText)
    ) {
      testimonialText.forEach((paragraph, i) => {
        testimonialTextElement += `<p>&ldquo;${paragraph}${(i === testimonialText.length + 1) ? '&rdquo;': ''}</p>`; // Add &rdquo; inside the *final* closing </p> tag ONLY.
      });
    }
    if (!!testimonialTextElement) {
      return testimonialTextElement;
    }
  },
  testimonialCards: (testimonial) => {
    const testimonialText = testimonialParagraphs(testimonial.text);
    const testimonialCard = `<div class="col-4"><blockquote cite="${testimonial.citeLink}">${testimonialText}</blockquote><p class="attribution">&ndash;&nbsp;<a href="${testimonial.citeLink}" target="_blank"><cite>${testimonial.author.firstName} ${testimonial.author.lastName}</cite></a></p></div>`

    if (!!testimonialCard && !!testimonialText) {
      testimonialContent.appendChild(testimonialCard);
    }
  },
}

if (
  !!testimonialContent
  && !!window.digitalData
  && !!window.digitalData.titles
  && window.digitalData.titles.length === 1
  && !!window.digitalData.titles[0].testimonials
  && Array.isArray(window.digitalData.titles[0].testimonials)
) {
  testimonials = window.digitalData.titles[0].testimonials;
  testimonials.forEach(testimonial => {
    testimonialBuilder.testimonialCards(testimonial);
  });
}