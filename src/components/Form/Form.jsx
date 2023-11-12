import React, { useCallback, useEffect, useState } from 'react';
import './Form.css';
import { useTelegram } from '../../hooks/useTelegram';

const Form = () => {
  const [auctionType, setAuctionType] = useState('');
  const [bindingOfferTime, setBindingOfferTime] = useState(15);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [price, setPrice] = useState(0);
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [caseNumber, setCaseNumber] = useState('');
  const [auctionObjectType, setAuctionObjectType] = useState('');

  const [insuranceType, setInsuranceType] = useState('');
  const [vin, setVin] = useState('');
  const [year, setYear] = useState(0);
  const [carType, setCarType] = useState('');
  const [carMark, setCarMark] = useState('');
  const [carModel, setCarModel] = useState('');

  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      auction_type: "1",
      binding_offer_time: 15,
      start:"2024-01-01",
      end: "2025-01-01",
      price,
      region,
      city,
      case_number: "Номер дела",
      auction_object_type: "car",
      auction_object: {
        insurance_type: "osago",
        vin: {
          type: "vin",
          value: "13135211565651650",
        },
        year:2023,
        car_type: {
          type: 'text',
          value: "Грузовик",
        },
        car_mark: {
          type: 'text',
          value: carMark,
        },
        car_model: {
          type: 'text',
          value: carModel,
        },
      },
    };

    tg.sendData(JSON.stringify(data));
  }, [
    auctionType,
    bindingOfferTime,
    start,
    end,
    price,
    region,
    city,
    caseNumber,
    auctionObjectType,
    insuranceType,
    vin,
    year,
    carType,
    carMark,
    carModel,
  ]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    };
  }, [onSendData]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'Отправить данные',
    });
  }, []);

  useEffect(() => {
    if (!carMark || !carModel) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [carMark, carModel]);

  const onChangeModel = (e) => {
    setCarModel(e.target.value);
  };
  const onChangeVin = (e) => {
    setVin(e.target.value);
  };

  const onChangeMark = (e) => {
    setCarMark(e.target.value);
  };

  const onChangeYear = (e) => {
    setYear(e.target.value);
  };

  const onChangeRegion = (e) => {
    setRegion(e.target.value);
  };
  const onChangeCity = (e) => {
    setCity(e.target.value);
  };
  const onChangeDesc = (e) => {
    setCaseNumber(e.target.value);
  };

  const onChangeMinprice = (e) => {
    setPrice(e.target.value);
  };

  return (
    <div className={'form'}>
      <h3>Введите ваши данные</h3>
      <input
        className={'input'}
        type="text"
        placeholder={'Марка транспортного средства:'}
        value={carMark}
        onChange={onChangeMark}
      />
      <input
        className={'input'}
        type="text"
        placeholder={'Модель транспортного средства:'}
        value={carModel}
        onChange={onChangeModel}
      />
      <input
        className={'input'}
        type="text"
        placeholder={'VIN:'}
        value={vin}
        onChange={onChangeVin}
      />
      <input
        className={'input'}
        type="text"
        placeholder={'FRAME:'}
        value={caseNumber}
        onChange={onChangeDesc}
      />
      <input
        className={'input'}
        type="text"
        placeholder={'Мощность л/с:'}
        value={insuranceType}
        onChange={(e) => setInsuranceType(e.target.value)}
      />
      <input
        className={'input'}
        type="text"
        placeholder={'Тип КПП:'}
        value={carType}
        onChange={(e) => setCarType(e.target.value)}
      />
      <input
        className={'input'}
        type="text"
        placeholder={'Год выпуска:'}
        value={year}
        onChange={onChangeYear}
      />
      <input
        className={'input'}
        type="text"
        placeholder={'Цена:'}
        value={price}
        onChange={onChangeMinprice}
      />
      <input
        className={'input'}
        type="text"
        placeholder={'Регион:'}
        value={region}
        onChange={onChangeRegion}
      />
      <input
        className={'input'}
        type="text"
        placeholder={'Город:'}
        value={city}
        onChange={onChangeCity}
      />
      {/* <input
        className={'input'}
        type="text"
        placeholder={'Дополнительная информация о ТС:'}
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <input
        className={'input'}
        type="text"
        placeholder={'Желаемая минимальная стоимость:'}
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      /> */}
    </div>
  );
};

export default Form;
