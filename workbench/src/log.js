export default (...args) => {
  if (!process.silence) {
    console.log(new Date().toISOString(), ...args);
  }
}