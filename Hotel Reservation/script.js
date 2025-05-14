const form = document.getElementById('reservationForm');
const list = document.getElementById('reservationList');

let reservations = JSON.parse(localStorage.getItem('reservations')) || [];

function saveData() {
  localStorage.setItem('reservations', JSON.stringify(reservations));
}

function renderReservations() {
  list.innerHTML = '';
  reservations.forEach((res, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${res.name}</strong> - Room ${res.room}
      <br/>
      <button class="edit" onclick="editReservation(${index})">Edit</button>
      <button class="delete" onclick="deleteReservation(${index})">Delete</button>
    `;
    list.appendChild(li);
  });
}

function isRoomAvailable(room, excludeIndex = -1) {
  return !reservations.some((res, idx) => res.room === room && idx !== excludeIndex);
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const room = parseInt(document.getElementById('room').value);

  if (!isRoomAvailable(room)) {
    alert("Room already reserved!");
    return;
  }

  reservations.push({ name, room });
  saveData();
  renderReservations();
  form.reset();
});

function editReservation(index) {
  const res = reservations[index];
  const newName = prompt("Enter new name:", res.name);
  const newRoom = parseInt(prompt("Enter new room number:", res.room));

  if (newName && newRoom && isRoomAvailable(newRoom, index)) {
    reservations[index] = { name: newName, room: newRoom };
    saveData();
    renderReservations();
  } else {
    alert("Invalid input or room already taken.");
  }
}

function deleteReservation(index) {
  if (confirm("Are you sure you want to delete this reservation?")) {
    reservations.splice(index, 1);
    saveData();
    renderReservations();
  }
}

renderReservations();
