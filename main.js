const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const Selectedmovie = document.getElementById('movie');

populateUI();

let ticketPrice = parseInt(Selectedmovie.value);

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update count and total
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatIndex = [...selectedSeats].map(function (seat) {
        return [...seats].indexOf(seat);
    });

    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));

    selectedCountSeats = selectedSeats.length;

    count.innerText = selectedCountSeats;
    total.innerText = selectedCountSeats * ticketPrice;
}

// Get data from local storage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach(function (seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = JSON.parse(localStorage.getItem('selectedMovieIndex'));

    if (selectedMovieIndex !== null) {
        Selectedmovie.selectedIndex = selectedMovieIndex;
    }
}

// Movie select event
Selectedmovie.addEventListener('change', function (e) {
    ticketPrice = parseInt(e.target.value);
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// Seat click event
container.addEventListener('click', function (e) {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});

//initial count and total set
updateSelectedCount();