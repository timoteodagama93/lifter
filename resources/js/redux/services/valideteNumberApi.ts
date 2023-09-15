import axios from "axios";


const options = {
  method: 'GET',
  url: 'https://phonenumbervalidatefree.p.rapidapi.com/ts_PhoneNumberValidateTest.jsp',
  params: {
    number: '927678173',
    country: 'AO'
  },
  headers: {
    'X-RapidAPI-Key': 'f9c3363700msh1e412db46f8ee28p15c6a1jsnecafece01753',
    'X-RapidAPI-Host': 'phonenumbervalidatefree.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}