export default {
    getItem: function(key) {
        let value;
        try {
            value = localStorage.getItem(key);
        } catch (ex) {
            //开发环境下提示error
            if(__DEV__) {
                console.log('localStorage.getItem 报错' , ex.message);
            }
        } finally {
            return value;
        }
    },
    setItem: function(key, value) {
        try {
            //ios safari 无痕模式下localstorage.setItem 报错
            localStorage.setItem(key, value);
        } catch (ex) {
            //开发模式下报错
            if(__DEV__) {
                console.log('localstorage.setItem 报错', ex.message);
            }
        }
    }
}