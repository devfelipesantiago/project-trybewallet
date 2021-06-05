const currencyApi = async () => {
  try {
    const result = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await result.json();
    delete response.USDT;
    return response;
  } catch (error) {
    return console.log(error);
  }
};

export default currencyApi;
