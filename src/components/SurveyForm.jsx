import React, { useState } from "react";
import styled from "styled-components";

const SurveyFormWrapper = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background: #D5CAC8;
  border-radius: 8px;
`;

const FormStep = styled.div`
  display: ${(props) => (props.active ? "block" : "none")};
`;

const FormTitle = styled.h3`
  text-align: center;
  margin-bottom: 20px;
  color: #ff0000;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  color: #000000;
`;

const SummaryLabel = styled(Label)`
  font-weight: bold;
  color: #000000;
  margin-top: 5px;
  font-size:20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color:#ffffff;
  color: black;
  
`;

const RadioGroup = styled.div`
  display: flex;
  justify-content: space-between;
  
`;

const RadioLabel = styled.label`
  margin-right: 10px;
  color:black;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: ${(props) => (props.primary ? "#1c4788" : "#a32a2a")};
  color: #fff;
  &:hover {
    background: ${(props) => (props.primary ? "#163466" : "#bbb")};
  }
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  input {
    margin-left: -270px;
    margin-top: 10px;
    margin-bottom: 12px;
    background-color:#D5CAC8;
  }

  label {
    margin-top: 5px;
    margin-left: -260px;
    color: #555;
    float: left;
    margin-top: 10px;
    margin-bottom: 12px;
  }
`;

const TermsLabel = styled.label`
  margin-left: 10px;
  color: #5f2525;
  cursor: pointer;
`;

const SurveyForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    age: "",
    email: "",
    phone: "",
    favoriteColor: "",
    firstTeacher: "",
    companySatisfaction: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Anketiniz başarıyla kaydedilmiştir.");
    // Anket verilerini gönderme işlemi burada yapılabilir.
  };

  const handleTermsClick = () => {
    setFormData((prevData) => ({
      ...prevData,
      termsAccepted: !prevData.termsAccepted,
    }));
  };

  return (
    <SurveyFormWrapper>
      <FormTitle><h2>Anket Formu</h2></FormTitle>
      <form onSubmit={handleSubmit}>
        <FormStep active={step === 1}>
          <br/>
          <FormGroup>
          <br/>
            <Label>Ad</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Soyad</Label>
            <Input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Yaş</Label>
            <Input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Telefon</Label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <ButtonGroup>
            <Button type="button" onClick={handleNext} primary>
              Devam Et
            </Button>
          </ButtonGroup>
        </FormStep>
        <FormStep active={step === 2}>
          <FormGroup>
            <Label>En Sevdiğiniz Renk</Label>
            <Input
              type="text"
              name="favoriteColor"
              value={formData.favoriteColor}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>İlk Öğretmeninizin İsmi</Label>
            <Input
              type="text"
              name="firstTeacher"
              value={formData.firstTeacher}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Şirketten Memnun Musunuz?</Label>
            <RadioGroup>
              <RadioLabel>
                <Input
                  type="radio"
                  name="companySatisfaction"
                  value="yes"
                  checked={formData.companySatisfaction === "yes"}
                  onChange={handleChange}
                  required
                />{" "}
                Evet
              </RadioLabel>
              <RadioLabel>
                <Input
                  type="radio"
                  name="companySatisfaction"
                  value="no"
                  checked={formData.companySatisfaction === "no"}
                  onChange={handleChange}
                  required
                />{" "}
                Hayır
              </RadioLabel>
            </RadioGroup>
          </FormGroup>
          <ButtonGroup>
            <Button type="button" onClick={handleBack}>
              Geri
            </Button>
            <Button type="button" onClick={handleNext} primary>
              Devam Et
            </Button>
          </ButtonGroup>
        </FormStep>
        <FormStep active={step === 3}>
          <FormGroup>
          <SummaryLabel><h3>Önizleme</h3></SummaryLabel>
          <br/>
            <SummaryLabel>Ad: </SummaryLabel> {formData.name}
          </FormGroup>
          <FormGroup>
            <SummaryLabel>Soyad: </SummaryLabel> {formData.surname}
          </FormGroup>
          <FormGroup>
            <SummaryLabel>Yaş: </SummaryLabel> {formData.age}
          </FormGroup>
          <FormGroup>
            <SummaryLabel>Email: </SummaryLabel> {formData.email}
          </FormGroup>
          <FormGroup>
            <SummaryLabel>Telefon: </SummaryLabel> {formData.phone}
          </FormGroup>
          <FormGroup>
            <SummaryLabel>En Sevdiğiniz Renk: </SummaryLabel>{" "}
            {formData.favoriteColor}
          </FormGroup>
          <FormGroup>
            <SummaryLabel>İlk Öğretmeninizin İsmi: </SummaryLabel>{" "}
            {formData.firstTeacher}
          </FormGroup>
          <FormGroup>
            <SummaryLabel>Şirketten Memnun Musunuz?: </SummaryLabel>{" "}
            {formData.companySatisfaction === "yes" ? "Evet" : "Hayır"}
          </FormGroup>
          <FormGroup className="checkbox-group">
            <CheckboxWrapper>
              <Input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                required
              />
              <TermsLabel onClick={handleTermsClick}>
                Seçtiklerimi okudum onaylıyorum
              </TermsLabel>
            </CheckboxWrapper>
          </FormGroup>
          <ButtonGroup>
            <Button type="button" onClick={handleBack}>
              Geri
            </Button>
            <Button type="submit" primary disabled={!formData.termsAccepted}>
              Gönder
            </Button>
          </ButtonGroup>
        </FormStep>
      </form>
    </SurveyFormWrapper>
  );
};

export default SurveyForm;
