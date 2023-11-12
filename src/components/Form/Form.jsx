import React, { useCallback, useEffect, useState } from 'react';
import './Form.css';
import { useTelegram } from '../../hooks/useTelegram';

const Form = () => {
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

  const [currentStep, setCurrentStep] = useState(0);

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
    // Проверка, все ли поля заполнены
    const isFormComplete = Object.values(formData).every((value) => value.trim() !== '');

    if (isFormComplete) {
      const data = {
        auction_type: '1',
        binding_offer_time: 15,
        start: '2024-01-01',
        end: '2025-01-01',
        ...formData,
        auction_object_type: 'car',
        auction_object: {
          insurance_type: 'osago',
          vin: {
            type: 'vin',
            value: '13135211565651650',
          },
          year: 2023,
          car_type: {
            type: 'text',
            value: 'Грузовик',
          },
          car_mark: {
            type: 'text',
            value: formData.carMark,
          },
          car_model: {
            type: 'text',
            value: formData.carModel,
          },
        },
      };

      tg.sendData(JSON.stringify(data));
      tg.closeForm(); // Закрыть форму после отправки данных
    }
  }, [formData, tg]);

  useEffect(() => {
    if (currentStep === steps.length - 1) {
      tg.MainButton.setParams({
        text: 'Отправить данные',
        onClick: onSendData,
      });
    } else {
      tg.MainButton.setParams({
        text: 'Далее',
        onClick: handleNextStep,
      });
    }
  }, [currentStep, steps.length, tg.MainButton, onSendData]);

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
                {currentStep === steps.length - 1 ? 'Отправить данные' : 'Далее'}
              </button>
              {currentStep !== 0 && (
                <button onClick={handlePrevStep} disabled={currentStep === 0}>
                  Назад
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Form;
