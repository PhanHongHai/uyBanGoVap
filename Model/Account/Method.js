const modelAccount = require('./Account');
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = {
    getListAccount: async () => {
        let data = await modelAccount.find()
        return data;
    },
    getAccountByUser: (user) => {
        let data = modelAccount.find({ username: user });

        return data;
    },
    checkAccount: (tk, done) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.compare(tk.pass, tk[0].password, (err, res) => {
                    console.log(res);
                    if (res)
                        return done(null, tk[0]);
                    else
                        return done(null, false);
                })
        });
    },
    addAccount: (user, pass, role) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(pass, salt, (err, hash) => {
                let data = {
                    username: user,
                    password: hash,
                    role: role
                };
                let account = new modelAccount(data);
                account.save((err) => {
                    if (err)
                        return false;
                    return true;
                })

            });
        });
    },
    updateAccount:async (id, user, pass, role) => {
        if (pass !== "") {
            bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.hash(pass, salt, (err, hash) => {
                    let data = {
                        username: user,
                        password: hash,
                        role: role
                    };
                    modelAccount.findOneAndUpdate({ _id: id }, { $set: data }, (err) => {
                        if (err) {
                            throw err;
                            return false;
                        }
                        return true;
                    })
                });
            });
        }
        else {
            let data = {
                username: user,
                role: role
            };
            console.log(id);
            console.log(data);
            modelAccount.findOneAndUpdate({ _id: id }, { $set: data }, (err) => {
                if (err) {
                    throw err;
                    return false;
                }
                return true;
            })
        }

    },
    deleteAccount: async (id) => {
        modelAccount.findOneAndRemove({ _id: id }, (err) => {
            if (err)
                return false;
            return true;
        });
    }
}