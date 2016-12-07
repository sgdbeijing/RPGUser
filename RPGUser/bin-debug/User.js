//@Hidden
var User = (function () {
    function User() {
        this.gold = 0;
        this.undealGold = 0;
        this.currentExp = 0;
        this.level = 0;
        //User与Hero为聚合关系的表现
        this.heroes = [];
        this.gold = 0;
        this.undealGold = 0;
        this.currentExp = 0;
        this.level = 0;
    }
    var d = __define,c=User,p=c.prototype;
    d(p, "heroesInTeam"
        //基础数值写法
        //heroesInTeam : Hero[] = [];
        //高阶数值写法
        ,function () {
            return this.heroes.filter(function (hero) { return hero.isInteam; });
        }
    );
    d(p, "fightPower"
        ,function () {
            var result = 0;
            //forEach : 将数组中每个元素都执行
            this.heroesInTeam.forEach(function (hero) { return result += hero.fightPower; });
            return result;
        }
    );
    p.addHero = function (hero) {
        this.heroes.push(hero);
    };
    p.show = function () {
        console.log("User:");
        console.log("level:" + this.level);
        console.log("currentExp：" + this.currentExp);
        console.log("undealGold:" + this.undealGold);
        console.log("gold:" + this.gold);
        console.log("fightPower:" + this.fightPower);
    };
    return User;
}());
egret.registerClass(User,'User');
var Hero = (function () {
    function Hero(baseHp, baseAttack, value) {
        this.isInteam = false;
        this.baseHp = 0;
        this.baseAttack = 0;
        this.level = 0;
        this.value = 0;
        this.equipments = [];
        this.level = 1;
        this.isInteam = true;
        this.baseAttack = baseAttack;
        this.baseHp = baseHp;
        this.value = value;
    }
    var d = __define,c=Hero,p=c.prototype;
    d(p, "hp"
        ,function () {
            var result = 0;
            this.equipments.forEach(function (e) { return result += e.hpPromote; });
            return result + this.baseHp + (1 + 0.2 * this.value) * this.level;
        }
    );
    d(p, "attack"
        ,function () {
            var result = 0;
            //将所有装备的攻击力累加
            this.equipments.forEach(function (e) { return result += e.attackPromote; });
            return result + this.baseAttack + (1 + 0.3 * this.value) * this.level;
        }
    );
    d(p, "fightPower"
        ,function () {
            var result = 0;
            this.equipments.forEach(function (e) { return result += e.fightPower; });
            return result + (this.hp * 300 + this.attack * 500) * 0.5;
        }
    );
    p.addEquipment = function (equipment) {
        this.equipments.push(equipment);
    };
    p.show = function () {
        console.log("Hero:");
        console.log("level:" + this.level);
        console.log("value:" + this.value);
        console.log("attack:" + this.attack);
        console.log("hp:" + this.hp);
        console.log("fightPower:" + this.fightPower);
    };
    return Hero;
}());
egret.registerClass(Hero,'Hero');
var Equipment = (function () {
    function Equipment(quality, baseAttack, baseHp) {
        this.jewels = [];
        this.baseAttack = 0;
        this.baseHp = 0;
        this.quality = quality;
        this.baseAttack = baseAttack;
        this.baseHp = baseHp;
    }
    var d = __define,c=Equipment,p=c.prototype;
    d(p, "attackPromote"
        ,function () {
            var result = 0;
            this.jewels.forEach(function (e) { return result += e.attackPromote; });
            return result + (this.quality * 20) + this.baseAttack;
        }
    );
    d(p, "hpPromote"
        ,function () {
            var result = 0;
            this.jewels.forEach(function (e) { return result += e.hpPromote; });
            return result + (this.quality * 10) + this.baseHp;
        }
    );
    d(p, "fightPower"
        ,function () {
            var result = 0;
            this.jewels.forEach(function (e) { return result += e.fightPower; });
            return result + (this.hpPromote * 300 + this.attackPromote * 500) * 0.8;
        }
    );
    p.addJewel = function (jewel) {
        this.jewels.push(jewel);
    };
    p.show = function () {
        console.log("Equipment:");
        console.log("level:" + this.quality);
        console.log("hpPromote:" + this.hpPromote);
        console.log("attackPromote:" + this.attackPromote);
        console.log("fightPower:" + this.fightPower);
    };
    return Equipment;
}());
egret.registerClass(Equipment,'Equipment');
var Jewel = (function () {
    function Jewel(level, hpPromoteCoefficient, attackPromoteCoefficient) {
        this.hpPromoteCoefficient = 0;
        this.attackPromoteCoefficient = 0;
        this.level = level;
        this.hpPromoteCoefficient = hpPromoteCoefficient;
        this.attackPromoteCoefficient = attackPromoteCoefficient;
    }
    var d = __define,c=Jewel,p=c.prototype;
    d(p, "hpPromote"
        ,function () {
            return this.hpPromoteCoefficient * this.level;
        }
    );
    d(p, "attackPromote"
        ,function () {
            return this.attackPromoteCoefficient * this.level;
        }
    );
    d(p, "fightPower"
        ,function () {
            return this.hpPromote * 300 + this.attackPromote * 500;
        }
    );
    p.show = function () {
        console.log("Jewel:");
        console.log("level:" + this.level);
        console.log("hpPromote:" + this.hpPromote);
        console.log("attackPromote:" + this.attackPromote);
        console.log("fightPower:" + this.fightPower);
    };
    return Jewel;
}());
egret.registerClass(Jewel,'Jewel');
//一级，二级，三级宝石
var jewelLevel;
(function (jewelLevel) {
    jewelLevel[jewelLevel["one"] = 1] = "one";
    jewelLevel[jewelLevel["two"] = 2] = "two";
    jewelLevel[jewelLevel["three"] = 3] = "three";
})(jewelLevel || (jewelLevel = {}));
//装备品质分为绿装，蓝装，紫装，金装
var equipmentQuality;
(function (equipmentQuality) {
    equipmentQuality[equipmentQuality["green"] = 1] = "green";
    equipmentQuality[equipmentQuality["blue"] = 2] = "blue";
    equipmentQuality[equipmentQuality["purple"] = 3] = "purple";
    equipmentQuality[equipmentQuality["gold"] = 4] = "gold";
})(equipmentQuality || (equipmentQuality = {}));
//英雄稀有度
var heroValue;
(function (heroValue) {
    heroValue[heroValue["r"] = 1] = "r";
    heroValue[heroValue["sr"] = 2] = "sr";
    heroValue[heroValue["ssr"] = 3] = "ssr";
})(heroValue || (heroValue = {}));
//# sourceMappingURL=User.js.map