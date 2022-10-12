const button = document.querySelector('button');
const output = document.querySelector('p');

const getPosition = (opt) => {
  const promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        resolve(success);
      },
      (error) => {
        reject(error);
      },
      opt
    );
  });
  return promise;
};

const setTimer = (duration) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Done!');
    }, duration);
  });
  return promise;
};

async function trackUserHandler() {
  let posData, timerData;
  try {
    posData = await getPosition();
    timerData = await setTimer(2000);
  } catch (error) {
    console.log('error' + error);
  }
  console.log(timerData, posData);

  setTimer(1000).then(() => {
    console.log('Timer done!');
  });
  console.log('Getting position...');
}

button.addEventListener('click', trackUserHandler);

// 가장 먼저 완료된 것을 반환하는 Promise
Promise.race([getPosition(), setTimer(1000)]).then((data) => {
  console.log(data);
});

// 모든 Promise가 완료되면 반환하는 Promise
Promise.all([getPosition(), setTimer(1000)]).then((promiseData) => {
  console.log(promiseData);
});

// 성공하던 실패하던 무조건 반환하는 Promise
Promise.allSettled([getPosition(), setTimer(1000)]).then((promiseData) => {
  console.log(promiseData);
});