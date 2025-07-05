import React, { useEffect, useState } from 'react';

const API = 'http://localhost:8080/Corta_Fila_Back/public';

function BarberPage() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const barberId = 1;

  useEffect(() => {
    fetch(`${API}/services.php?barber_id=${barberId}`)
      .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
      .then(setServices)
      .catch(() => setServices([]));
  }, []);

  useEffect(() => {
    if (selectedService) {
      fetch(`${API}/availabilities.php?barber_id=${barberId}&service_id=${selectedService.service_id}`)
        .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
        .then(setSlots)
        .catch(() => setSlots([]));
    } else {
      setSlots([]);
    }
  }, [selectedService]);

  return (
    <div style={{ padding: '1rem', color: '#171717' }}>
      <h2>Escolha um serviço</h2>
      <ul>
        {services.map(s => (
          <li key={s.service_id}>
            <button
              onClick={() => {
                setSelectedService(s);
                setSelectedSlot(null);
              }}
              style={{
                background: selectedService?.service_id === s.service_id ? '#C38A42' : '#171717',
                color: '#fff',
                border: 0,
                padding: '0.5rem',
                marginBottom: '0.5rem'
              }}>
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
                <button
                  onClick={() => setSelectedSlot(slot)}
                  style={{
                    background: selectedSlot?.availability_id === slot.availability_id ? '#C38A42' : '#171717',
                    color: '#fff',
                    border: 0,
                    padding: '0.5rem',
                    marginBottom: '0.5rem'
                  }}>
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
