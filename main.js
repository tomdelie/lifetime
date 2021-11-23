window.addEventListener('DOMContentLoaded', () => {
  const year = document.querySelector('.year');
  const container = document.querySelector('.container');
  const formDOM = document.querySelector('form');
  const birthdayDOM = document.querySelector('form > input#birthday');

  if (year && container) {
    for (let i = 1 ; i < 90 ; i++) {
      const yearCloned = year.cloneNode(true);
      container.appendChild(yearCloned);
    }
  }

  formDOM.addEventListener('submit', async (event) => await updateLifeElapsed(event, birthdayDOM));
});

const resetLifeElapsed = () => {
  const months = document.querySelectorAll('.month');
  months.forEach((monthDOM) => {
    monthDOM.classList.remove('month-full');
    monthDOM.classList.remove('month-active');
    monthDOM.classList.add('month-empty');
  });
};

const updateLifeElapsed = async (event, birthdayDOM) => {
  event.preventDefault();
  resetLifeElapsed();
  const birthday = new Date(birthdayDOM.value);
  const now = new Date();
  
  const years = now.getFullYear() - birthday.getFullYear();
  const monthsDiff = now.getMonth() - birthday.getMonth();
  const diffMonths = (years*12) + monthsDiff;
 
  const months = document.querySelectorAll('.month');
  
  let monthsIndex = 1;
  for (const monthDOM of months) {
    if (monthsIndex <= diffMonths) {
      console.log(monthsIndex, diffMonths)
      monthDOM.classList.remove('month-empty');
      monthDOM.classList.add('month-full');

      await new Promise((resolve, reject) => {
        setTimeout(() => resolve(), 1);
      });
    }

    if (monthsIndex === diffMonths+1) {
      monthDOM.classList.remove('month-empty');
      monthDOM.classList.add('month-active');
    }

    monthsIndex++;
  }
}