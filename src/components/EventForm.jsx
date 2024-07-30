import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { isBefore, parse } from 'date-fns';

const FormContainer = styled.div`
  background: #D5CAC8;
  padding: 20px;
  border-radius: 8px;
  color: black;
  font-size: 14px;
  font-weight: bold;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  color: #000000;
  font-weight: bold;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white; /* Arka planı beyaz yapar */
  color: black; /* Yazı rengini siyah yapar */
  font-weight: bold; /* Yazı kalın yapar */
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px;
  background: #1F79A7;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const CloseButton = styled(Button)`
  background-color: #883122;
  margin-left: 15px;

  &:hover {
    background-color: #c82333;
  }
`;

const EventForm = ({ onAddEvent, onUpdateEvent, selectedEvent, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    status: 'Devam Ediyor'
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedEvent) {
      setFormData({
        title: selectedEvent.title,
        description: selectedEvent.description,
        startDate: selectedEvent.startDate,
        endDate: selectedEvent.endDate,
        startTime: selectedEvent.startTime,
        endTime: selectedEvent.endTime,
        status: selectedEvent.status
      });
    }
  }, [selectedEvent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mevcut tarihi al
    const now = new Date();

    // Kullanıcının seçtiği tarih ve saatleri birleştir
    const eventStartDate = parse(`${formData.startDate} ${formData.startTime}`, 'yyyy-MM-dd HH:mm', new Date());
    const eventEndDate = parse(`${formData.endDate} ${formData.endTime}`, 'yyyy-MM-dd HH:mm', new Date());

    // Geçerlilik kontrolü
    if (isBefore(eventStartDate, now)) {
      setError('Etkinlik başlangıç tarihi ve saati, mevcut tarih ve saatten önce olamaz.');
      return;
    }

    if (isBefore(eventEndDate, eventStartDate)) {
      setError('Etkinlik bitiş tarihi ve saati, başlangıç tarihi ve saatinden önce olamaz.');
      return;
    }

    // Hata mesajını temizle
    setError('');

    // Etkinlik oluşturma veya güncelleme işlemi
    if (selectedEvent) {
      onUpdateEvent({ ...selectedEvent, ...formData });
    } else {
      onAddEvent({ ...formData, id: Date.now() });
    }

    onClose();
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Başlık</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">Açıklama</Label>
          <TextArea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="startDate">Başlangıç Tarihi</Label>
          <Input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="endDate">Bitiş Tarihi</Label>
          <Input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="startTime">Başlangıç Saati</Label>
          <Input
            type="time"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="endTime">Bitiş Saati</Label>
          <Input
            type="time"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </FormGroup>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button type="submit">{selectedEvent ? 'Güncelle' : 'Ekle'}</Button>
        <CloseButton type="button" onClick={onClose}>Kapat</CloseButton>
      </form>
    </FormContainer>
  );
};

export default EventForm;
