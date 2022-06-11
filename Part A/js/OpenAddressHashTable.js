class KeyValuePair {
    constructor(initKey, initValue) {
        this.key = initKey;
        this.value = initValue;
    }
    
    toString() {
        return "(" + this.key + ", " + this.value.toString() + ")";
    }
}

export default class OpenAddressHashTable {
    constructor(initLength, initKeyLength) {
        this.length = initLength;
        this.size = 0;
        this.keyLength = initKeyLength;
        this.hashTable = [];
    }

    hashCode(key) {
        let charsSum = 0;
        for (let i = 0; i < key.length; i++) {
            let keyChar = key.charAt(i);
            let charAsNum = keyChar.charCodeAt(0);
            charsSum += charAsNum;
        }
        return charsSum % this.length;
    }

    generateKey() {
        let key = "";
        for (let i = 0; i < this.keyLength; i++) {
            let randomNum = Math.floor(Math.random() * 36);
            let randomChar;
            if (randomNum < 10) {
                randomNum += 48;
                randomChar = String.fromCharCode(randomNum);
            }
            else {
                randomNum += 55;
                randomChar = String.fromCharCode(randomNum);
            }
            key += randomChar;
        }
        return key;
    }
    
    // @todo - YOU MUST DEFINE THIS METHOD
    getValue(key) {
        let index = this.hashCode(key);
        let count = 0;

        while (count < this.length) {
            let testKVP = this.hashTable[index];
            if (testKVP == null) {
                return null;
            }
            else if (testKVP.key == key) {
                return testKVP.value;
            }
            index++;
            if (index == this.length) {
                index = 0;
            }
            count++;
        }
        return null;
    }
    
    // @todo - YOU MUST DEFINE THIS METHOD
    removeValue(key) {
        let index = this.hashCode(key);
        let count = 0;
        while (count < this.length) {
            let testKVP = this.hashTable[index];
            if (testKVP == null) {
                return;
            } else if (testKVP.key == key) {
                delete this.hashTable[index];
                this.hashCode[index] = null;
                this.size--;
                let temp = [];
                let counter = 0;
                for (let i = 0; i < this.length; i++) {
                    let item = this.hashTable[i];
                    if (item != null) {
                        temp[counter] = item;
                        counter++;
                    }
                    this.hashTable[i] = null;
                }
                this.size = 0;
                for (let i = 0; i < counter; i++) {
                    let item = temp[i];
                    let keyToRehash = item.key;
                    let valueToRehash = item.value;
                    this.putValue(keyToRehash, valueToRehash);

                    delete temp[i];
                }
                return;
            }
            index++;
            if (index == this.length) {
                index = 0;
            }
            count++;
        }
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    putValue(key, item) {
        let index = this.hashCode(key);
        let count = 0;
        while (count < this.length) {
            let testKVP = this.hashTable[index];
            if (testKVP == null) {
                this.hashTable[index] = new KeyValuePair(key, item);
                this.size++;
                return;
            } else if (testKVP.key == key) {
                this.hashTable[index].value = item;
                this.size++;
                return;
            }
            index++;
            if (index == this.length) {
                index  = 0;
            }
            count++;
        }
        let temp = this.hashTable;
        this.length = this.length * 2;
        this.hashTable = [];
        for (let i = 0; i < this.length; i++) {
            this.hashTable[i] = null;
        }
        let numToCopy = this.size;
        this.size = 0;
        for (let i = 0; i < numToCopy; i++) {
            let kvp = temp[i];
            let keyToMove = kvp.key;
            let valueToMove = kvp.value;
            this.putValue(keyToMove, valueToMove);
            delete temp[i];
        }
        this.putValue(key, item);
    }
    
    toString() {
        let text = "[\n";
        for (let i = 0; i < this.length; i++) {
            let kvp = this.hashTable[i];
            let kvpDescription = "null";
            if (kvp != null) {
                kvpDescription = kvp.toString();
            }
            text += "   " + i + ": " + kvpDescription + "\n";
        }
        text += "]\n";
        return text;
    }
};