import React from 'react';

const SurveyFormStep1 = ({ formData, setFormData, nextStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2>Adım 1: Kullanıcı Bilgileri</h2>
      <form>
        <label>Ad:</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />

        <label>Soyad:</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />

        <label>Yaş:</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} />

        <label>E-posta:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />

        <label>Telefon:</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />

        <button type="button" onClick={nextStep}>Devam Et</button>
      </form>
    </div>
  );
};

export default SurveyFormStep1;
