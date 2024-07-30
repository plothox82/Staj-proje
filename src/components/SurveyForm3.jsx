import React from 'react';

const SurveyFormStep3 = ({ formData, prevStep, handleSubmit }) => {
  const [checked, setChecked] = React.useState(false);

  return (
    <div>
      <h2>Adım 3: Özet ve Onay</h2>
      <div>
        <p><strong>Ad:</strong> {formData.firstName}</p>
        <p><strong>Soyad:</strong> {formData.lastName}</p>
        <p><strong>Yaş:</strong> {formData.age}</p>
        <p><strong>E-posta:</strong> {formData.email}</p>
        <p><strong>Telefon:</strong> {formData.phone}</p>
        <p><strong>En Sevdiğiniz Renk:</strong> {formData.favoriteColor}</p>
        <p><strong>İlk Öğretmeninizin İsmi:</strong> {formData.firstTeacher}</p>
        <p><strong>Şirketten Memnun Kaldınız mı?:</strong> {formData.satisfaction}</p>
      </div>
      <label>
        <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
        Seçtiklerimi okudum, onaylıyorum
      </label>
      <div>
        <button type="button" onClick={prevStep}>Geri</button>
        <button type="button" onClick={handleSubmit} disabled={!checked}>Gönder</button>
      </div>
    </div>
  );
};

export default SurveyFormStep3;
