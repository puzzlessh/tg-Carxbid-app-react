import React, { useCallback, useEffect, useState } from 'react';
import './Form.css';
import { useTelegram } from '../../hooks/useTelegram';


const Form = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    carMark: '',
    carModel: '',
    vin: '',
    caseNumber: '',
    insuranceType: '',
    carType: '',
    year: 0,
    price: 0,
    region: '',
    city: '',
  });

  const { tg } = useTelegram();

  const onNextStep = useCallback(() => {
    setStep((prevStep) => prevStep + 1);
  }, []);

  const onSendData = useCallback(() => {
    // Отправка данных на сервер
    tg.sendData(JSON.stringify(formData));
    // Сброс данных и переход на первый шаг
    setFormData({
      carMark: '',
      carModel: '',
      vin: '',
      caseNumber: '',
      insuranceType: '',
      carType: '',
      year: 0,
      price: 0,
      region: '',
      city: '',
    });
    setStep(0);
  }, [formData, tg]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', step === 10 ? onSendData : onNextStep);
    return () => {
      tg.offEvent('mainButtonClicked', step === 10 ? onSendData : onNextStep);
    };
  }, [step, onSendData, onNextStep]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: step === 10 ? 'Отправить данные' : 'Далее',
    });
  }, [step]);

  const renderInput = (fieldName, placeholder) => (
    <div>
      <h3>{placeholder}</h3>
      <input
        className={'input'}
        type="text"
        placeholder={placeholder}
        value={formData[fieldName]}
        onChange={(e) => setFormData((prevData) => ({ ...prevData, [fieldName]: e.target.value }))}
      />
    </div>
  );

  return (
    <div className={'form'}>
      {step === 0 && renderInput('carMark', 'Марка транспортного средства:')}
      {step === 1 && renderInput('carModel', 'Модель транспортного средства:')}
      {step === 2 && renderInput('vin', 'VIN:')}
      {step === 3 && renderInput('caseNumber', 'FRAME:')}
      {step === 4 && renderInput('insuranceType', 'Мощность л/с:')}
      {step === 5 && renderInput('carType', 'Тип КПП:')}
      {step === 6 && renderInput('year', 'Год выпуска:')}
      {step === 7 && renderInput('price', 'Цена:')}
      {step === 8 && renderInput('region', 'Регион:')}
      {step === 9 && renderInput('city', 'Город:')}
    </div>
  );
};

export default Form;
