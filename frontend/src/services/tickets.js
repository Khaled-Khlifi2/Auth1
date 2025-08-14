const API_URL = "http://localhost:3000";

export const getTickets = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/tickets`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

export const addTicket = async (ticket) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/tickets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(ticket)
  });
  return res.json();
};
