import React, { useEffect, useState } from 'react';

const API = process.env.REACT_APP_API_BASE_URL;

// Simple page to choose a service and time before login
function BarberPage() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const barberId = 1; // hardcoded demo

  useEffect(() => {
    fetch(`${API}/services?barber_id=${barberId}`)
      .then(res => res.json())
      .then(setServices)
      .catch(() => setServices([]));
  }, []);

  useEffect(() => {
    if (selectedService) {
      fetch(`${API}/availabilities?barber_id=${barberId}`)
        .then(res => res.json())
        .then(setSlots)
        .catch(() => setSlots([]));
    }
  }, [selectedService]);

  return (
    <div style={{ padding: '1rem', color: 'var(--primary-color)' }}>
      <h2>Escolha um serviço</h2>
      <ul>
        {services.map(s => (
          <li key={s.service_id}>
            <button onClick={() => setSelectedService(s)} style={{ background: 'var(--secondary-color)', color: '#fff', border: 0, padding: '0.5rem', marginBottom: '0.5rem' }}>
              {s.service_name} - R${s.price}
            </button>
          </li>
        ))}
      </ul>

      {selectedService && (
        <>
          <h3>Horários disponíveis</h3>
          <ul>
            {slots.map(slot => (
              <li key={slot.availability_id}>
                <button onClick={() => setSelectedSlot(slot)} style={{ background: 'var(--secondary-color)', color: '#fff', border: 0, padding: '0.5rem', marginBottom: '0.5rem' }}>
                  {slot.weekday} {slot.start_time} - {slot.end_time}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {selectedSlot && (
        <div style={{ marginTop: '1rem' }}>
          <a href="/login">Fazer login para confirmar</a>
        </div>
      )}
    </div>
  );
}

export default BarberPage;
