import React, { useCallback, useEffect, useState } from 'react';
import './Form.css';
import { useTelegram } from '../../hooks/useTelegram';

const Form = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { tg } = useTelegram();

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

  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const onSendData = useCallback(() => {
    // Отправка данных
    console.log('Отправка данных:', formData);
    // Ваш код для отправки данных в телеграм
  }, [formData]);

  useEffect(() => {
    if (currentStep === steps.length) {
      // Если текущий шаг равен количеству шагов, значит, все поля заполнены
      // Показываем кнопку "Отправить данные"
      // И отправляем данные
      tg.MainButton.setParams({
        text: 'Отправить данные',
      });
    } else {
      tg.MainButton.setParams({
        text: 'Далее',
      });
    }
  }, [currentStep, steps.length, tg.MainButton]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', () => {
      if (currentStep === steps.length) {
        onSendData();
      } else {
        handleNextStep();
      }
    });

    return () => {
      tg.offEvent('mainButtonClicked', () => {
        if (currentStep === steps.length) {
          onSendData();
        } else {
          handleNextStep();
        }
      });
    };
  }, [currentStep, steps.length, onSendData, tg]);

  return (
    <div className={'form'}>
      <h3>Введите ваши данные</h3>
      {steps.map((step, index) => (
        <div key={step}>
          {index === currentStep && (
            <div>
              <input
                className={'input'}
                type="text"
                placeholder={`Введите ${step}`}
                value={formData[step]}
                onChange={(e) => handleInputChange(step, e.target.value)}
              />
              <button onClick={handleNextStep} disabled={currentStep === steps.length - 1}>
                Далее
              </button>
              <button onClick={handlePrevStep} disabled={currentStep === 0}>
                Назад
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Form;
