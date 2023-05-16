import prompts from "prompts";

function generateRandomPassword(length, getRandNumbers, getSpecialCharacters){
  let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if(getRandNumbers) charset += '0123456789';
  if(getSpecialCharacters) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

  let password = '';
  for(let i = 0; i< length; i++){
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

function getPasswordChooseOptions() {
  return new Promise((resolve, reject) => {
    prompts([
      {
        type: 'number',
        name: 'passwordLength',
        message: 'Enter the length of a password',
        validate: value => value > 0 || "Number must be positive"
      },
      {
        type: 'confirm',
        name: 'getNumbers',
        message: 'Do you want to include numbers ?',
        initial: true
      },
      {
        type: 'confirm',
        name: 'getSpecialCharacters',
        message: 'Do you want to include special characters ?',
        initial: true
      }
    ])
        .then(response => resolve(response))
        .catch(error => reject(error))
  })
}

getPasswordChooseOptions()
  .then(response => {
    const passwordLength = response.passwordLength;
    const getRandNumbers = response.getRandNumbers;
    const getSpecialCharacters = response.getSpecialCharacters;

    const password = generateRandomPassword(passwordLength, getRandNumbers, getSpecialCharacters);
    console.log("Your generated password is: ", password);
  })

.catch(error => console.error(error));