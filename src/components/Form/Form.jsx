import React, { useCallback, useEffect, useState } from 'react';
import './Form.css';
import { useTelegram } from '../../hooks/useTelegram';


const Form = () => {
  const [currentStep, setCurrentStep] = useState(0);
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
    setCurrentStep(0);
  }, [formData, tg]);

  const onNextStep = useCallback(() => {
    setCurrentStep((prevStep) => prevStep + 1);
  }, []);

  const onChangeField = (fieldName, value) => {
    setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
  };

  const renderInput = (fieldName, placeholder) => (
    <input
      className={'input'}
      type="text"
      placeholder={placeholder}
      value={formData[fieldName]}
      onChange={(e) => onChangeField(fieldName, e.target.value)}
    />
  );

  useEffect(() => {
    tg.onEvent('mainButtonClicked', currentStep === 10 ? onSendData : onNextStep);
    return () => {
      tg.offEvent('mainButtonClicked', currentStep === 10 ? onSendData : onNextStep);
    };
  }, [currentStep, onSendData, onNextStep]);

  useEffect(() => {
    if (!formData.carMark || !formData.carModel) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [formData.carMark, formData.carModel]);

  return (
    <div className={'form'}>
      <h3>Введите ваши данные</h3>
      {currentStep === 0 && renderInput('carMark', 'Марка транспортного средства:')}
      {currentStep === 1 && renderInput('carModel', 'Модель транспортного средства:')}
      {currentStep === 2 && renderInput('vin', 'VIN:')}
      {currentStep === 3 && renderInput('caseNumber', 'FRAME:')}
      {currentStep === 4 && renderInput('insuranceType', 'Мощность л/с:')}
      {currentStep === 5 && renderInput('carType', 'Тип КПП:')}
      {currentStep === 6 && renderInput('year', 'Год выпуска:')}
      {currentStep === 7 && renderInput('price', 'Цена:')}
      {currentStep === 8 && renderInput('region', 'Регион:')}
      {currentStep === 9 && renderInput('city', 'Город:')}
      {currentStep === 10 && <button onClick={onSendData}>Отправить данные</button>}
    </div>
  );
};

export default Form;
