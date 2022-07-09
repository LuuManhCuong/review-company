let Account = require("../models/account");
let Company = require("../models/company");

class authentication {
  authet(req, res, next) {
    if (req.cookies.userId) {
      next();
    } else {
      res.redirect("/login");
    }
  }

  async getUserAndAvt(req, res, next) {
    if (req.cookies.userId) {
      await Account.findById({ _id: req.cookies.userId }).then((user) => {
        if (user) {
          res.locals.avatar = user.avatar;
          res.locals.userName = user.userName;
          res.locals.slug = user.slug;
          res.locals.idUser = user._id;
        }
      });
    }
    next();
  }
}
module.exports = new authentication();
