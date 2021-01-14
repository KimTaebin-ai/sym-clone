export class StorageUtil {

    public static get(key) {
        let obj;
        try{
            obj = localStorage.getItem(key);
            obj = JSON.parse(obj);
        } catch(e){

        }
        return obj;
    }

    public static set(key, value) {
        try{
            let obj = JSON.stringify(value);
            localStorage.setItem(key, obj);
        } catch(e){
            localStorage.setItem(key, value);
        }
    }

    public static remove(key) {
        localStorage.removeItem(key);
    }

    public static clear() {
        localStorage.clear();
    }

}
