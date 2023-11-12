import React, { useCallback, useEffect, useState } from 'react';
import './Form.css';
import { useTelegram } from '../../hooks/useTelegram';

const Form = () => {
  const { tg } = useTelegram();

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
    };

    tg.sendData(JSON.stringify(data));
  }, [formData, tg]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    };
  }, [onSendData]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: currentStep === steps.length - 1 ? 'Отправить данные' : 'Далее',
    });
  }, [currentStep, steps.length, tg.MainButton]);

  useEffect(() => {
    if (!formData.carMark || !formData.carModel) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [formData.carMark, formData.carModel, tg.MainButton]);

  return (
    <div className={'form'}>
      <h3>Введите ваши данные</h3>
      {steps.map((step, index) => (
        <div key={step} style={{ display: index === currentStep ? 'block' : 'none' }}>
          <input
            className={'input'}
            type="text"
            placeholder={`Введите ${step}`}
            value={formData[step]}
            onChange={(e) => handleInputChange(step, e.target.value)}
          />
          {index !== steps.length - 1 && (
            <button onClick={handleNextStep}>Далее</button>
          )}
          {index !== 0 && (
            <button onClick={handlePrevStep}>Назад</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Form;
