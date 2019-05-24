// method model

const methodGY = require('../Model/GopY/Method');
const modelGY = require('../Model/GopY/FeedBack');
// ----------------------------
const format=require('dateformat');
const BreadCrumb = require('../content/breadCrumb');
let bread = (req) => {
    return BreadCrumb.find((item) => item.key === req.path);
}
module.exports = {
    createGopY: async (req, res) => {
        let now = new Date();
        let date=format(now,"h:MM:ss TT ,d/mm/yyyy");
        console.log(date);
        let data = { ...req.body,ngay:date, file: req.file.filename };
        let gopY = await new modelGY(data);
        gopY.save((err) => {
            if (err) {
                req.session.mess = 0;
                res.redirect('/gop-y');
            }
            else {
                if( req.session.count == null)
                    req.session.count = 0;
                req.session.count +=1
                req.session.mess = 1;
                res.redirect('/gop-y');
            }

        });
    },
    loadPage: async (req, res) => {
        if (req.isAuthenticated()) {
            let list = await modelGY.find({}).sort({ngay:-1});
            console.log(list);
            let link = bread(req);
            res.render('admin', { title: 'QL thư góp ý', link: link, user: req.user, list: list, path: 'GopY', count: req.session.count })
        }
        else
            res.redirect('/logIn');
    },
    updateCheck: (req, res) => {
        modelGY.findOneAndUpdate({ _id: req.params.idGY }, { $set: { check: false } }, (err) => {
            if (err)
                res.status(500).json({ mess: 'fail' });
            else {
                if (req.session.count > 0) {
                    req.session.count -= 1;
                }
                else
                    req.session.count = 0;
                res.status(200).json({ mess: 'success',count:req.session.count });
            }

        })
    },
    deleteGY: (req, res) => {
        modelGY.find({ _id: req.params.idGY }, (err, data) => {
            console.log(data);
            console.log(data[0].check);
            if (data[0].check) {
                if (req.session.count > 0) {
                    req.session.count -= 1;
                }
                else
                    req.session.count = 0;
                modelGY.findOneAndRemove({ _id: req.params.idGY }, (err) => {
                    console.log(req.session.count);
                    if (err)
                        res.status(500).json({ mess: 'fail' });
                    else
                        res.status(200).json({ mess: 'success' });
                })
            }
            else {
                modelGY.findOneAndRemove({ _id: req.params.idGY }, (err) => {
                    console.log(req.session.count);
                    if (err)
                        res.status(500).json({ mess: 'fail' });
                    else
                        res.status(200).json({ mess: 'success' });
                })

            }

        })
    }
}