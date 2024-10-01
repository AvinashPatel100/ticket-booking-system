// DOM elements
const ticketForm = document.getElementById('ticketForm');
const ticketList = document.getElementById('ticketList');
const totalTickets = document.getElementById('totalTickets');
const openTickets = document.getElementById('openTickets');
const closedTickets = document.getElementById('closedTickets');
const ticketListHeading = document.getElementById('ticketListHeading');

let tickets = [];

// Function to add a new ticket
function addTicket(title, description, priority) {
  const ticket = {
    id: Date.now(),
    title,
    description,
    priority,
    status: 'Open' // All tickets start as 'Open'
  };
  
  tickets.push(ticket);
  renderTickets();
  updateStats();
}

// Function to render tickets based on type
function renderTickets(type = 'all') {
  ticketList.innerHTML = ''; // Clear the current tickets
  
  let filteredTickets = tickets;

  if (type === 'open') {
    filteredTickets = tickets.filter(ticket => ticket.status === 'Open');
    ticketListHeading.textContent = 'Open Tickets';
  } else if (type === 'closed') {
    filteredTickets = tickets.filter(ticket => ticket.status === 'Closed');
    ticketListHeading.textContent = 'Closed Tickets';
  } else {
    ticketListHeading.textContent = 'All Tickets';
  }

  filteredTickets.forEach(ticket => {
    const ticketEl = document.createElement('div');
    ticketEl.classList.add('ticket');

    ticketEl.innerHTML = `
      <h3>${ticket.title}</h3>
      <p>${ticket.description}</p>
      <p><strong>Priority:</strong> ${ticket.priority}</p>
      <span class="status ${ticket.status === 'Open' ? 'open' : 'closed'}">${ticket.status}</span>
      <button onclick="toggleStatus(${ticket.id})">${ticket.status === 'Open' ? 'Close' : 'Reopen'} Ticket</button>
      <button onclick="deleteTicket(${ticket.id})">Delete Ticket</button>
    `;

    ticketList.appendChild(ticketEl);
  });
}

// Function to update ticket statistics
function updateStats() {
  const total = tickets.length;
  const open = tickets.filter(ticket => ticket.status === 'Open').length;
  const closed = tickets.filter(ticket => ticket.status === 'Closed').length;

  totalTickets.textContent = total;
  openTickets.textContent = open;
  closedTickets.textContent = closed;
}

// Function to toggle ticket status (Open/Closed)
function toggleStatus(id) {
  tickets = tickets.map(ticket => {
    if (ticket.id === id) {
      ticket.status = ticket.status === 'Open' ? 'Closed' : 'Open';
    }
    return ticket;
  });

  renderTickets();
  updateStats();
}

// Function to delete a ticket
function deleteTicket(id) {
  tickets = tickets.filter(ticket => ticket.id !== id);

  renderTickets();
  updateStats();
}

// Handle form submission
ticketForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const priority = document.getElementById('priority').value;

  if (title && description && priority) {
    addTicket(title, description, priority);
    ticketForm.reset(); // Clear the form
  }
});

// Show all tickets
function showAllTickets() {
  renderTickets('all');
}

// Show only open tickets
function showOpenTickets() {
  renderTickets('open');
}

// Show only closed tickets
function showClosedTickets() {
  renderTickets('closed');
}

