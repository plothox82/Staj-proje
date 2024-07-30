import React from 'react';

const SurveyFormStep2 = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2>Adım 2: Ek Bilgiler</h2>
      <form>
        <label>En Sevdiğiniz Renk:</label>
        <input type="text" name="favoriteColor" value={formData.favoriteColor} onChange={handleChange} />

        <label>İlk Öğretmeninizin İsmi:</label>
        <input type="text" name="firstTeacher" value={formData.firstTeacher} onChange={handleChange} />

        <label>Şirketten Memnun Kaldınız mı?</label>
        <div>
          <label>
            <input
              type="radio"
              name="satisfaction"
              value="Evet"
              checked={formData.satisfaction === "Evet"}
              onChange={handleChange}
            />
            Evet
          </label>
          <label>
            <input
              type="radio"
              name="satisfaction"
              value="Hayır"
              checked={formData.satisfaction === "Hayır"}
              onChange={handleChange}
            />
            Hayır
          </label>
        </div>

        <button type="button" onClick={prevStep}>Geri</button>
        <button type="button" onClick={nextStep}>Devam Et</button>
      </form>
    </div>
  );
};

export default SurveyFormStep2;
