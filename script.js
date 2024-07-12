/*Remote Storage Implementierung*/
const STORAGE_TOKEN = "JVZ4G3QMZD0NASHXAQ7MY9F8ID693UKFM8EZ4Z2F";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

/**
 * This function is to save a Value to remote Storage
 * 
 * @param {string} key -savekeyword
 * @param {string} value -value to save
 * @returns 
 */
async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

/**
 * This function is to load a Value from remote Storage
 * 
 * @param {String} key -savekeyword to load the value from
 * @returns 
 */
async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.data) {
        return res.data.value;
      }
      throw `Could not find data with key "${key}".`;
    });
}