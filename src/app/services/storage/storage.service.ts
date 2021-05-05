import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // Store the value
  async store(storageKey: string, value: any) {
    const encryptedValue = JSON.stringify(value);
    await Storage.set({
      key: storageKey,
      value: encryptedValue
    });
  }

  // Get the value
  async get(storageKey: string) {
    const ret = await Storage.get({ key: storageKey });
    if (!ret.value) {
      return false;
    }
    return JSON.parse(ret.value);
  }

  async removeStorageItem(storageKey: string) {
    await Storage.remove({ key: storageKey });
  }

  // Clear storage
  async clear() {
    await Storage.clear();
  }
}
