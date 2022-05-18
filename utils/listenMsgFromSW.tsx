const listenMsgFromSW = (callback) => {
  if (navigator && navigator.serviceWorker && navigator.serviceWorker.controller) {
    navigator.serviceWorker.addEventListener('message', (event) => {
      callback(event);
    });
  }
};

export default listenMsgFromSW;
