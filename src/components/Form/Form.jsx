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
  }, [formData, tg]);

  useEffect(() => {
    if (currentStep === steps.length) {
      // Если текущий шаг равен количеству шагов, значит, все поля заполнены
      // Показываем кнопку "Отправить данные"
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
