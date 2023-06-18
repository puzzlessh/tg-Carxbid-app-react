import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [mark, setMark] = useState('');
    const [model, setModel] = useState('');
    const [vin, setVin] = useState('');
    const [frame, setFrame] = useState('');
    const [year, setYear] = useState('');
    const [lsauto, setLsauto] = useState('');
    const [kpp, setKpp] = useState('');
    const [probeg, setProbeg] = useState('');
    const [region, setRegion] = useState('');
    const [city, setCity] = useState('');
    const [desc, setDesc] = useState('');
    const [minprice, setMinprice] = useState('');

    //const [subject, setSubject] = useState('physical');
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            mark,
            model,
            vin,
            frame,
            year,
            lsauto,
            kpp,
            probeg,
            region,
            city,
            desc,
            minprice
        }
        tg.sendData(JSON.stringify(data));
    }, [mark, model, vin, frame, year, lsauto, kpp, probeg, region, city, desc, minprice])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])

    useEffect(() => {
        if(!mark || !model) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [mark, model])

    const onChangeModel= (e) => {
        setModel(e.target.value)
    }
    const onChangeVin = (e) => {
        setVin(e.target.value)
    }

    const onChangeMark = (e) => {
        setMark(e.target.value)
    }

    const onChangeFrame = (e) => {
        setFrame(e.target.value)
    }

    const onChangeYear = (e) => {
        setYear(e.target.value)
    }

    const onChangeLsauto = (e) => {
        setLsauto(e.target.value)
    }

    const onChangeKpp = (e) => {
        setKpp(e.target.value)
    }

    const onChangeProbeg = (e) => {
        setProbeg(e.target.value)
    }

    const onChangeRegion = (e) => {
        setRegion(e.target.value)
    }
    const onChangeCity = (e) => {
        setCity(e.target.value)
    }
    const onChangeDesc = (e) => {
        setDesc(e.target.value)
    }

    const onChangeMinprice = (e) => {
        setMinprice(e.target.value)
    }

    // const onChangeStreet = (e) => {
    //     setStreet(e.target.value)
    // }

    // const onChangeSubject = (e) => {
    //     setSubject(e.target.value)
    // }

    return (
        <div className={"form"}>
            <h3>Введите ваши данные</h3>
            <input
                className={'input'}
                type="text"
                placeholder={'Марка транспортного средства:'}
                value={mark}
                onChange={onChangeMark}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Модель транспортного средства:'}
                value={model}
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
                value={frame}
                onChange={onChangeFrame}
            />
                        <input
                className={'input'}
                type="text"
                placeholder={'Мощность л/с:'}
                value={lsauto}
                onChange={onChangeLsauto}
            />
                        <input
                className={'input'}
                type="text"
                placeholder={'Тип КПП:'}
                value={kpp}
                onChange={onChangeKpp}
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
                placeholder={'Пробег:'}
                value={probeg}
                onChange={onChangeProbeg}
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
                        <input
                className={'input'}
                type="text"
                placeholder={'Дополнительная информация о ТС:'}
                value={desc}
                onChange={onChangeDesc}
            />
                        <input
                className={'input'}
                type="text"
                placeholder={'Желаемая минимальная стоимость:'}
                value={minprice}
                onChange={onChangeMinprice}
            />
            {/* <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'physical'}>Физ. лицо</option>
                <option value={'legal'}>Юр. лицо</option>
            </select> */}
        </div>
    );
};

export default Form;
