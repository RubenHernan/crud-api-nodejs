const User = require('../models/user.model');

exports.validUser = (req, res, next) => {
  const { name, email, password, role } =
    req.body;
  if (name === false) {
    return res.status(400).json({
      status: 'error',
      message: 'the name is required',
    });
  }
  if (email === false) {
    return res.status(400).json({
      status: 'error',
      message: 'the email is required',
    });
  }
  if (password === false) {
    return res.status(400).json({
      status: 'error',
      message: 'the pass is required',
    });
  }
  if (role === false) {
    return res.status(400).json({
      status: 'error',
      message: 'the role is required',
    });
  }
  next();
};

exports.validExistUser = async (
  req,
  res,
  next
) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
    });
  }
  req.user = user;
  next();
};
