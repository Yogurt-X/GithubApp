export default class ArrayUtils {
    /**
     * 更新数组，若item已存在则将其从数组中删除，若不存在则将其添加到数组
     * @param {*} array
     * @param {*} item
     */
    static updateArray(array, item) {
        for (let i = 0, len = array.length; i < len; i++) {
            const temp = array[i];
            if (item === temp) {
                array.slice(i, 1);
                return;
            }
        }
        array.push(item);
    }

    /**
     * 将数组中指定元素移除
     */
    static remove(array, item) {
        if (!array) return;
        for (let i = 0, l = array.length; i < l; i++) {
            if (item === array[i])array.splice(i, 1);
        }
    }

    /**
     * 判断两个数组的元素是否一一对应
     * @param {*} arr1
     * @param {*} arr2
     */
    static isEqual(arr1, arr2) {
        if (!(arr1 && arr2)) return false;
        if (arr1.length !== arr2.length) return false;
        return arr2.every((item, i) => item === arr1[i]);
    }
}
