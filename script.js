const cards = document.querySelectorAll('.card')

const observer = new IntersectionObserver(
    entries => {
        // add 'show' class when intersecting
        entries.forEach(entry => {
            entry.target.classList.toggle('show', entry.isIntersecting)
            // if (entry.isIntersecting) observer.unobserve(entry.target)
        })
    },
    {
        threshold: 1
        //rootMargin: '100px' // positive: pre-loading 
    })

cards.forEach(card => {
    observer.observe(card)
})


// -- infinite scroll --
// mock api
const cardContainer = document.querySelector('.card-container')

function loadNewCards() {
    for (let i = 0; i < 10; i++) {
        const card = document.createElement('div')
        card.textContent = 'New Card'
        card.classList.add('card')
        observer.observe(card)
        cardContainer.append(card)
    }
}

const lastCardNode = document.querySelector('.card:last-child')

const lastCardObserver = new IntersectionObserver((entries) => {
    const lastCard = entries[0]
    if (!lastCard.isIntersecting) return // if not last card, do nothing
    loadNewCards() // if last card, call func
    lastCardObserver.unobserve(lastCard.target)
    lastCardObserver.observe(lastCardNode)
}, {
    rootMargin: '100px'
})

lastCardObserver.observe(lastCardNode)


