import {
  AsyncStorage, // Key-Value存储系统
} from 'react-native';

export default class DataRepository {
  // 存储网络请求到的数据
  saveRepository(url, items, callback) {
    if (!items || !url) return;
    const wrapData = { items, update_date: new Date().getTime() };
    AsyncStorage.setItem(url, JSON.stringify(wrapData), callback);
  }

  fetchRepository(url) {
    return new Promise((resolve, reject) => {
      // 先读取App本地存储数据
      this.fetchLocalRepository(url).then((wrapData) => {
        if (wrapData) {
          resolve(wrapData, true);
        } else {
          this.fetchNetRepository(url).then((data) => {
            resolve(data);
          }).catch((error) => {
            reject(error);
          });
        }
      }).catch((error) => {
        this.fetchNetRepository(url).then((data) => {
          resolve(data);
        }).catch(((error) => {
          reject(error);
        }));
      });
    });
  }

  fetchLocalRepository(url) {
    return new Promise((resolve, reject) => {
      // 读取key字段并将结果作为第二个参数传递给callback
      AsyncStorage.getItem(url, (error, result) => {
        if (!error) {
          try {
            resolve(JSON.parse(result));
          } catch (e) {
            reject(e);
            console.error(e);
          }
        } else {
          reject(error);
          console.error(error);
        }
      });
    });
  }

  fetchNetRepository(url) {
    // 请求网络数据
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => response.json())
        .catch((error) => {
          reject(error);
        }).then((responseData) => {
          if (!responseData || !responseData.items) {
            reject(new Error('responseData is null'));
            return;
          }
          resolve(responseData.items);
          this.saveRepository(url, responseData.items);
        })
        .done();
    });
  }
}
