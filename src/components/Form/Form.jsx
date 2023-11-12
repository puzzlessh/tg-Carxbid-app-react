import React, { useCallback, useEffect, useState } from 'react';
import './Form.css';
import { useTelegram } from '../../hooks/useTelegram';

const Form = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    'carMark',
    'carModel',
    'vin',
    'caseNumber',
    'insuranceType',
    'carType',
    'year',
    'price',
    'region',
    'city',
  ];

  const [formData, setFormData] = useState({
    carMark: '',
    carModel: '',
    vin: '',
    caseNumber: '',
    insuranceType: '',
    carType: '',
    year: '',
    price: '',
    region: '',
    city: '',
  });

  const { tg } = useTelegram();

  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const onSendData = useCallback(() => {
    // Отправка данных
    console.log('Отправка данных:', formData);
    // Здесь может быть ваша логика отправки данных
  }, [formData]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', handleNextStep);
    return () => {
      tg.offEvent('mainButtonClicked', handleNextStep);
    };
  }, [handleNextStep, tg]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: currentStep === steps.length - 1 ? 'Отправить данные' : 'Далее',
    });
  }, [currentStep, steps.length, tg]);

  return (
    <div className={'form'}>
      <h3>Введите ваши данные</h3>
      <div>
        <input
          className={'input'}
          type="text"
          placeholder={`Введите ${steps[currentStep]}`}
          value={formData[steps[currentStep]]}
          onChange={(e) => handleInputChange(steps[currentStep], e.target.value)}
        />
      </div>
      <div>
        {currentStep > 0 && (
          <button onClick={handlePrevStep}>Назад</button>
        )}
        {currentStep < steps.length - 1 && (
          <button onClick={handleNextStep}>Далее</button>
        )}
        {currentStep === steps.length - 1 && (
          <button onClick={onSendData}>Отправить данные</button>
        )}
      </div>
    </div>
  );
};

export default Form;
