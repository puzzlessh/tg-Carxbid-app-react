const Form = () => {
  const [steps, setSteps] = useState([
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
  ]);
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

  const onSendData = useCallback(() => {
    // Отправка данных
    console.log('Отправка данных:', formData);
  }, [formData]);

  useEffect(() => {
    if (currentStep === steps.length) {
      // Если текущий шаг равен количеству шагов, значит, все поля заполнены
      // Показываем кнопку "Отправить данные"
      // И отправляем данные
      onSendData();
    }
  }, [currentStep, steps.length, onSendData]);

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
              {index !== steps.length - 1 && (
                <button onClick={handleNextStep}>Далее</button>
              )}
            </div>
          )}
        </div>
      ))}
      {currentStep === steps.length && (
        <button onClick={onSendData}>Отправить данные</button>
      )}
    </div>
  );
};

export default Form;
