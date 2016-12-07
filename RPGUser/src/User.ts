var Hidden: MethodDecorator = (target: any, propertyName, desc: PropertyDescriptor) => {

    const method = desc.value;

    desc.value = function () {

        if (this["HiddenPower"] != null && this["badFlag"] == false) {
          
            console.log("use Hidden");
            return target["HiddenPower"];
        } 
        else {

            this["badFlag"] = false;

            //得到战斗力缓存的值
            this["HiddenPower"] = method.apply(this);
            return method.apply(this);
        }

    }
    return desc;
}


var HpHidden: MethodDecorator = (target: any, propertyName, desc: PropertyDescriptor) => {

    const method = desc.value;

    desc.value = function () {

        if (this["hpHidden"] != null && this["badFlag"] == false) {
          
            console.log("use HpHidden");
            return target["hpHidden"];
        } 
        else {

            this["badFlag"] = false;
            this["hpHidden"] = method.apply(this);
            return method.apply(this);
        }

    }
    return desc;
}


var attackHidden: MethodDecorator = (target: any, propertyName, desc: PropertyDescriptor) => {

    const method = desc.value;

    desc.value = function () {

        if (this["attackHidden"] != null && this["badFlag"] == false) {
          
            console.log("use attackHidden");
            return target["attackHidden"];
        } 
        else {

            this["badFlag"] = false;
            this["attackHidden"] = method.apply(this);
            return method.apply(this);
        }

    }
    return desc;
}



class User{

    gold = 0;

    undealGold = 0;

    currentExp = 0;

    level = 0;

    HiddenPower = null;

    badFlag = false;

    //User与Hero为聚合关系的表现
    heroes : Hero[] = [];

    constructor(){

        this.gold = 0;
        this.undealGold = 0;
        this.currentExp = 0;
        this.level = 0;

    }

    //基础数值写法
    //heroesInTeam : Hero[] = [];

    //高阶数值写法
    get heroesInTeam(){

        return this.heroes.filter(hero => hero.isInteam);
    }


    //@Hidden
    get fightPower(){

        var result = 0;
        
        //forEach : 将数组中每个元素都执行
        this.heroesInTeam.forEach(hero => result += hero.fightPower);
        return result;
    }


    public addHero(hero : Hero){

        this.heroes.push(hero);
        this.badFlag = true;

    }

    public show(){

        console.log("User:");
        console.log("level:" + this.level);
        console.log("currentExp：" + this.currentExp);
        console.log("undealGold:" + this.undealGold);
        console.log("gold:" + this.gold);
        console.log("fightPower:" + this.fightPower)
    }

}

class Hero{

    public isInteam : boolean = false;

    private baseHp = 0;

    private baseAttack = 0;

    private  level = 0;

    private  value = 0;

    private equipments : Equipment[] = [];

    private badFlag = false;

    private HiddenPower = null;

    private hpHidden = null;

    private attackPowerHidden = null;

    constructor(baseHp : number, baseAttack : number, value : number){

        this.level = 1;
        this.isInteam = true;
        this.baseAttack = baseAttack;
        this.baseHp = baseHp;
        this.value = value;

    }

    //@HpHidden
    get hp(){

        var result = 0;
        this.equipments.forEach(e => result += e.hpPromote);
        return result + this.baseHp + (1 + 0.2 * this.value) * this.level;
    }

    //@attackHidden
    get attack(){

        var result = 0;

        //装备的攻击力累加
        this.equipments.forEach(e => result += e.attackPromote);
        return result + this.baseAttack + (1 + 0.3 * this.value) * this.level;
    }

    //@Hidden
    get fightPower(){

        var result = 0;
        this.equipments.forEach(e => result += e.fightPower);
        return result + (this.hp * 300 + this.attack * 500) * 0.5;

    }

    public addEquipment(equipment : Equipment){

        this.equipments.push(equipment);
        this.badFlag = true;

    }

    public show(){

        console.log("Hero:");
        console.log("level:" + this.level);
        console.log("value:" + this.value);
        console.log("attack:" + this.attack);
        console.log("hp:" + this.hp);
        console.log("fightPower:" + this.fightPower);
    }

}


class Equipment{

    private jewels : Jewel[] = [];

    private quality : equipmentQuality;

    private baseAttack = 0;

    private baseHp = 0;

    private HiddenPower = null;

    private badFlag = false;

    private hpHidden = null;

    private attackPowerHidden = null;

    constructor(quality : equipmentQuality, baseAttack : number, baseHp : number){

        this.quality = quality;
        this.baseAttack = baseAttack;
        this.baseHp = baseHp;
    }


    //@attackHidden
    get attackPromote(){

        var result = 0;
        this.jewels.forEach(e => result += e.attackPromote);
        return result + (this.quality * 20) + this.baseAttack;
    }

    //@HpHidden
    get hpPromote(){

        var result = 0;
        this.jewels.forEach(e => result += e.hpPromote);
        return result + (this.quality * 10) + this.baseHp;
    }

    //@Hidden
    get fightPower(){

        var result = 0;
        this.jewels.forEach(e => result += e.fightPower);       
        return result + (this.hpPromote * 300 + this.attackPromote * 500) * 0.8;

    }

    public addJewel(jewel : Jewel){

        this.jewels.push(jewel);
        this.badFlag = true;

    }

    public show(){

        console.log("Equipment:");
        console.log("level:" + this.quality);
        console.log("hpPromote:" + this.hpPromote);
        console.log("attackPromote:" + this.attackPromote);
        console.log("fightPower:" + this.fightPower);
    }

}


class Jewel{
  
    private level : jewelLevel;

    private hpPromoteCoefficient = 0;

    private attackPromoteCoefficient = 0;

    constructor(level : jewelLevel, hpPromoteCoefficient : number, attackPromoteCoefficient : number){

        this.level = level;
        this.hpPromoteCoefficient = hpPromoteCoefficient;
        this.attackPromoteCoefficient = attackPromoteCoefficient;

    }

    get hpPromote(){

        return this.hpPromoteCoefficient * this.level;
    }

    get attackPromote(){

        return this.attackPromoteCoefficient * this.level;
    }

    
    get fightPower(){

        return this.hpPromote * 300 + this.attackPromote * 500;
    }

    public show(){

        console.log("Jewel:");
        console.log("level:" + this.level);
        console.log("hpPromote:" + this.hpPromote);
        console.log("attackPromote:" + this.attackPromote);
        console.log("fightPower:" + this.fightPower);
    }
}

//一级，二级，三级宝石
enum jewelLevel{

    one = 1,
    two = 2,
    three = 3
}

//装备品质分为绿装，蓝装，紫装，金装
enum equipmentQuality{

    green = 1,
    blue = 2,
    purple = 3,
    gold = 4
}

//英雄稀有度
enum heroValue{

    r = 1,
    sr = 2,
    ssr = 3
}


