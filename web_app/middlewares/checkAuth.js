exports.isPrivate = (req, res, next) => {
  console.log(req.session);
  if (req.session.authority !== undefined) {
    return next();
  } 
  else {
    req.flash('dialog_error_msg', 'Please login first!');
    res.redirect('/login');
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.session.authority !== 'System Admin') {
    req.flash('dialog_error_msg', 'Cannot access route!');
    res.redirect('/home')
  }
  else {
    return next();
  }
};

exports.isSales = (req, res, next) => {
  if (!(req.session.authority === 'Sales Employee' || req.session.authority === 'System Admin')) {
    req.flash('dialog_error_msg', 'Cannot access route!');
    res.redirect('/home')
  }
  else {
    return next();
  }
}

exports.isPurchasing = (req, res, next) => {

  if (!(req.session.authority === 'Purchasing Employee' || req.session.authority === 'System Admin')) {
    req.flash('dialog_error_msg', 'Cannot access route!');
    res.redirect('/home')
  }
  else {
    return next();
  }
}

exports.isLogistics = (req, res, next) => {
  if (!(req.session.authority === 'Logistics Employee' || req.session.authority === 'System Admin')) {
    req.flash('dialog_error_msg', 'Cannot access route!');
    res.redirect('/home')
  }
  else {
    return next();
  }
}