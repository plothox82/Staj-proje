import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import EventForm from './EventForm';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isToday, isSameDay, addWeeks, subWeeks } from 'date-fns';
import { tr } from 'date-fns/locale';

const CalendarAppContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: relative; 
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
`;

const CalendarNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const NavButton = styled.button`
  margin: 0 10px;
  padding: 10px;
  background-color: #883122;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

const WeekInfo = styled.div`
  color: #ffa500; /* Turuncu */
  font-weight: bold;
`;

const CalendarTable = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
`;

const CalendarCell = styled.div`
  padding: 10px;
  text-align: center;
  background-color: ${(props) => props.hasEvents ? '#c78100' : '#fff'};
  color: ${(props) => props.hasEvents ? '#883122' : '#000'};
  border: 1px solid #ddd;
  cursor: pointer;
  ${(props) => props.isToday && 'border: 4px solid #883122;'}
  ${(props) => props.isSelected && 'background-color: #e2cb7e;'}
`;

const EventButton = styled.button`
  margin: 10px 0;
  padding: 10px;
  background-color: #883122;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const EventsContainer = styled.div`
  margin-top: 20px;
  color: #000000;
`;

const EventCard = styled.div`
  background: #D5CAC8;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  color: black;
  margin-top: 10px;
`;

const EventTitle = styled.h1`
  display: flex;
  flex-direction: column; 
  align-items: center; /* Başlığı ortalar */
  margin: 0; /* Varsayılan margin değerini sıfırla */
  font-size: 24px; /* İsteğe bağlı: Başlık boyutunu ayarlayın */
  color: #333; /* İsteğe bağlı: Başlık rengini ayarlayın */
`;

const EventDetail = styled.p`
  margin: 10px 0; /* Her bir detay arasında boşluk ekler */
  line-height: 1.5; /* Satırlar arasındaki boşluğu artırır */
`;

const ButtonIptal = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const ButtonOnay = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: -60px;
`;

const Button = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: ${(props) => props.bgColor || '#0f2741'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  height: 35px;
  width: 100px;
`;

const UpdateButton = styled(Button)`
  background-color: #1F79A7;
`;

const DeleteButton = styled(Button)`
  background-color: #AB9C75;
`;

const CalendarApp = () => {
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('events'));
    if (Array.isArray(savedEvents)) {
      setEvents(savedEvents);
    } else {
      setEvents([]);
    }
  }, []);

  const handleAddEvent = (event) => {
    setEvents((prevEvents) => {
      const newEvents = [...prevEvents, event];
      localStorage.setItem('events', JSON.stringify(newEvents));
      return newEvents;
    });
    setShowEventForm(false);
  };

  const handleUpdateEvent = (updatedEvent) => {
    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      );
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      return updatedEvents;
    });
    setShowEventForm(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.filter((event) => event.id !== eventId);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      return updatedEvents;
    });
  };

  const handleUpdateStatus = (eventId, status) => {
    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.map((event) =>
        event.id === eventId ? { ...event, status } : event
      );
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      return updatedEvents;
    });
  };

  const days = eachDayOfInterval({ start: currentWeek, end: endOfWeek(currentWeek, { weekStartsOn: 1 }) });

  const renderCalendarCells = () => {
    return days.map((day) => {
      const isCurrentDay = isToday(day);
      const isSelectedDay = isSameDay(day, selectedDate);
      const eventsForDay = events.filter((event) => isSameDay(new Date(event.startDate), day));
      return (
        <CalendarCell
          key={day}
          onClick={() => setSelectedDate(day)}
          hasEvents={eventsForDay.length > 0}
          isToday={isCurrentDay}
          isSelected={isSelectedDay}
        >
          <div><strong>{format(day, 'd.M.yyyy', { locale: tr })}</strong></div>
          <div>{format(day, 'EEEE', { locale: tr })}</div>
          {eventsForDay.length > 0 && (
            <div>( {eventsForDay.length} Etkinlik )</div>
          )}
        </CalendarCell>
      );
    });
  };

  const renderEvents = () => {
    const eventsForSelectedDate = events.filter((event) =>
      isSameDay(new Date(event.startDate), selectedDate)
    );
    return eventsForSelectedDate.map((event) => (
      <EventCard key={event.id}>
        <br/>
        <EventTitle>{event.title}</EventTitle>
        <EventDetail><strong>Etkinlik Detaylar: </strong><br />{event.description}</EventDetail>
        <EventDetail><strong>Başlangıç ve Bitiş Tarihleri: </strong>{format(new Date(event.startDate), 'dd MMM yyyy', { locale: tr })} - {format(new Date(event.endDate), 'dd MMM yyyy', { locale: tr })}</EventDetail>
        <EventDetail><strong>Başlangıç ve Bitiş Saatleri: </strong>{event.startTime} - {event.endTime}</EventDetail>
        <EventDetail><strong>Durum: </strong>{event.status}</EventDetail>
        <br />
        <ButtonOnay>
          <Button bgColor="#28a745" onClick={() => handleUpdateStatus(event.id, 'Tamamlandı')}>Tamamlandı</Button>
          <Button bgColor="#dc3545" onClick={() => handleUpdateStatus(event.id, 'İptal Edildi')}>İptal Edildi</Button>
        </ButtonOnay>
        <ButtonIptal>
          <UpdateButton onClick={() => {
            setSelectedEvent(event);
            setShowEventForm(true);
          }}>Güncelle</UpdateButton>
          <DeleteButton onClick={() => handleDeleteEvent(event.id)}>Sil</DeleteButton>
        </ButtonIptal>
      </EventCard>
    ));
  };
  
  const handlePreviousWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  return (
    <CalendarAppContainer>
      <CalendarHeader>
        <CalendarNavigation>
          <NavButton onClick={handlePreviousWeek}>Önceki Hafta</NavButton>
          <WeekInfo>{format(currentWeek, 'd MMMM yyyy', { locale: tr })} - {format(endOfWeek(currentWeek, { weekStartsOn: 1 }), 'd MMMM yyyy', { locale: tr })}</WeekInfo>
          <NavButton onClick={handleNextWeek}>Sonraki Hafta</NavButton>
        </CalendarNavigation>
      </CalendarHeader>

      <CalendarTable>
        {renderCalendarCells()}
      </CalendarTable>

      <EventButton onClick={() => setShowEventForm(true)}>Yeni Etkinlik Ekle</EventButton>

      {showEventForm && (
        <EventForm
          onAddEvent={handleAddEvent}
          onUpdateEvent={handleUpdateEvent}
          selectedEvent={selectedEvent}
          onClose={() => {
            setShowEventForm(false);
            setSelectedEvent(null);
          }}
        />
      )}

      <EventsContainer>
        {renderEvents()}
      </EventsContainer>
    </CalendarAppContainer>
  );
};

export default CalendarApp;
