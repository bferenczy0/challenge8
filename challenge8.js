class letterNumber{
    constructor(){
        this._characters = this._generateCharacters();
    }

    _generateCharacters(){
        const fs = require('fs');
        var file = fs.readFileSync("character_set.txt");
        file = file.toString().split('\n').slice(2);
        var characters = {}
        characters[' '] = '1';
        for (var line in file){
            var codes = file[line].split(',');
            if (codes[0] == ''){
                characters[','] = '78';
            }
            else{
            characters[codes[0].trim()] = codes[1].trim(); 
            }
        }
        return characters; 
    }

    _convert(character){
        return this._characters[character];
    }

    _offset(value, offset){
        value = parseInt(value);
        value = (value + offset) % 100; 
        value = value.toString(); 
        if (value.length == 1){
            return '0' + value; 
        }
        else{
            return value; 
        }
    }
    
    _convertString(string, offset){
        var newString = ""; 
        for (var char in string){
            newString = newString + this._offset(this._convert(string[char]), offset); 
        }
        return newString; 
    }

    encrypt(string, offset){
        return this._convertString(string, offset); 
    }

    convertNum(code){
        if (code[0]==='0'){
            code = code[1];
        }
        return Object.keys(this.characters).find(key => this.characters[key] === code); 
        
    }

    decrypt(number,offset){
        var str = "";
        for (let i=0; i<number.length; i+=2){
            let x = number[i]+number[i+1];
            str += this.convertNum(x);
        }
        return str;
    }
}

var l = new letterNumber(); 
console.log(l.encrypt("a", 1)); // "03"
console.log(l.encrypt("Ed", 4)); // "3609"
console.log(l.encrypt("Hi, Ed!", 302)); // "37128003340756"

const a = l.decrypt("0681497203762572077292808186837291878577878677459172878672928772928081917275818880779025", 4771); // a human-readable sentence
const b = l.decrypt("21774590777279878686737286777776729287727587857772938872958192807273728677957287867750", 4771); // a human-readable sentence
const c = l.decrypt("0772928081868372077280739477728293919272928077729280818679507299728477929277903584779292779072919374919281929392818786727581888077902572107792459172768772819225", 4771); // a human-readable sentence

console.log(a); 
console.log(b);
console.log(c); 
