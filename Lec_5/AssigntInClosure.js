function bank(){
    let balance = 0;
    function deposit(x){
        balance += x;
        return balance;
    }

    function withdraw(x){
        balance -= x;
        return balance;
    }

    function getBallance(){
        return balance;
    }

    return {deposit, withdraw, getBallance};
}

let account1 = bank();

console.log(account1.deposit(1000));
console.log(account1.withdraw(500));
console.log(account1.getBallance());