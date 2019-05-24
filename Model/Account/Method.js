const modelAccount=require('./Account');
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports={
    getListAccount:async () => {
        let data=await modelAccount.find()
        return data;
    },
    getAccountByUser:(user) => {
        let data = modelAccount.find({username:user});
        
        return data;
    },
    checkAccount:(tk,done) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(tk[0].password, salt, (err, hash) => {
                bcrypt.compare(tk[0].password, hash, (err, res) => {
                    if (res)
                        return done(null, tk[0]);
                    else
                        return done(null, false);
                })
            });
        });
    },
    addAccount:(user,pass,role) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(pass, salt, (err, hash) => {
                let data = {
                    username: user,
                    password: hash,
                    role: role
                };
                let account = new modelAccount(data);
                if (account.save()) {
                    return 1;
                }
                else
                    return err;
            });
        });
    },
    updateAccount:(id,us,pas,role) => {
       
    },
    deleteAccount:async (id) => {
        modelAccount.findOneAndRemove({_id:id},(err) => {
            if(err)
             return console.log(err);
        });
    }
}