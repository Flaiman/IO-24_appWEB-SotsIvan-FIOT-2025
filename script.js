document.getElementById('apply-filter').addEventListener('click', () => {
    const maxPriceInput = document.getElementById('max-price').value.trim();
    let brand = document.getElementById('brand-filter').value.trim();
    if (!brand || brand === '') brand = 'all';
    const cards = document.querySelectorAll('.col[data-price][data-brand]');
    const minAllowedPrice = parseFloat(document.body.getAttribute('data-min-price')) || 3000;

    let warning = document.getElementById('price-warning');
    if (!warning) {
        warning = document.createElement('div');
        warning.id = 'price-warning';
        warning.style.color = 'red';
        warning.style.marginTop = '10px';
        document.querySelector('#filter-block').appendChild(warning);
    }

    const maxPrice = parseFloat(maxPriceInput);

    if (!isNaN(maxPrice) && maxPrice < minAllowedPrice) {
        warning.textContent = 'Мінімальна сума повинна бути не менше '+ minAllowedPrice + " грн";
        cards.forEach(card => card.style.display = 'none');
        return;
    } else {
        warning.textContent = '';
    }

    cards.forEach(card => {
        const price = parseFloat(card.getAttribute('data-price'));
        const cardBrand = card.getAttribute('data-brand');

        const priceValid = isNaN(maxPrice) || price <= maxPrice;
        const brandValid = brand === 'all' || cardBrand === brand;
        const meetsMin = price >= minAllowedPrice;

        if (priceValid && brandValid && meetsMin) {
            card.style.display = 'inherit';
        } else {
            card.style.display = 'none';
        }
    });
});