/**
 * Created by shubham on 13/6/17.
 */

var creditCardController = function () {
    var creditCardData = require('../../../../data-plugins/cerdit-card/list.json');

    var completed_number = function (prefix, format) {
        var change,creditCardNo ="";
        for(var i=0;i<prefix.length;i++){
            change = 0;
            if(format.charAt(i) ==="X"){
                creditCardNo+=prefix.charAt(i);
                change=1;
            }
            if(change === 0){
                creditCardNo+=format.charAt(i)
            }
        }

        while(creditCardNo.length< format.length-1){
            change = 0;
            if(format.charAt(creditCardNo.length-1) ==="X"){
                creditCardNo+=Math.floor(Math.random()*10).toString();
                change = 1
            }
            if(change === 0){
                creditCardNo+=format.charAt(creditCardNo.length-1);
            }
        }
        return creditCardNo;
    };

    var creditCard = function () {
        var index =Math.floor(Math.random()*creditCardData.length);
        var type = creditCardData[index].name;
        console.log(type);
        var creditCardNoFormat = creditCardData[index].ccformat[Math.floor(Math.random()*creditCardData[index].ccformat.length)];
        var creditCardNoPrefix = creditCardData[index].ccprefix[Math.floor(Math.random()*creditCardData[index].ccprefix.length)];
        console.log(creditCardNoPrefix);
        return {
            "Type":type,
            "creditCardNo":completed_number(creditCardNoPrefix,creditCardNoFormat)
        };

    };


    var creditCardGenerator = function (req,res) {
       var creditCardList = [];

        for(var i=0;i<req.query.n;i++){
         creditCardList.push(creditCard());
        }
        res.json(creditCardList);
    };
    var specificCreditCard = function (req,res) {
        var specifiedCreditCardList = [];
        var specifiedCreditCard = req.params.specifiedCreditCard;
        for(var i=0;i<req.query.n;i++){
            for(var j=0;j<creditCardData.length;j++){
                if(creditCardData[j].short === specifiedCreditCard){
                    break;
                }
            }
            var creditCardNoFormat = creditCardData[j].ccformat[Math.floor(Math.random()*creditCardData[j].ccformat.length)];
            var creditCardNoPrefix = creditCardData[j].ccprefix[Math.floor(Math.random()*creditCardData[j].ccprefix.length)];
            specifiedCreditCardList.push(completed_number(creditCardNoPrefix,creditCardNoFormat));
        }
        res.json(specifiedCreditCardList);
    };
    var cvv = function (req,res) {
        var cvvList =[];
        for(var i=0;i<req.query.n;i++){
            cvvList.push(Math.random()*(888)+111)
        }
        res.json(cvvList);
    };

    return{
        creditCard:creditCardGenerator,
        specificCreditCard:specificCreditCard,
        cvv:cvv
    }
};

module.exports = creditCardController;