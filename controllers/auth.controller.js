const User = require('../models/user.model');
const AppError = require('../utils/appErrors');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');

//REGISTER USER
exports.create = catchAsync(
  async (req, res, next) => {
    const { requestTime } = req;
    const { name, email, password, role } =
      req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (user) {
      return next(
        new AppError(
          'User with that email already exists',
          404
        )
      );
    }

    const salt = await bcrypt.genSalt(12);
    const encryptedPass = await bcrypt.hash(
      password,
      salt
    );

    const userCreate = await User.create({
      name,
      email,
      password: encryptedPass,
      role,
    });

    const token = await generateJWT(
      userCreate.id
    );

    res.status(201).json({
      status: 'success',
      message: 'The user has been created!',
      requestTime,
      token,
      user: {
        id: userCreate.id,
        name: userCreate.name,
        email: userCreate.email,
        profifeImg: userCreate.profifeImgUrl,
        role: userCreate.role,
      },
    });
  }
);

exports.login = catchAsync(
  async (req, res, next) => {
    //1 traernos la informacion de la req.body
    const { email, password } = req.body;

    //2. buscar el usuario y revisar si existe
    const user = await User.findOne({
      where: {
        email: email.toLowerCase(),
        status: 'active',
      },
    });

    if (!user) {
      return next(
        new AppError(
          'The user could not be found',
          404
        )
      );
    }

    //3 validar si la contraseña es correcta

    if (
      !(await bcrypt.compare(
        password,
        user.password
      ))
    ) {
      return next(
        new AppError('Invalid credentials', 401)
      );
    }

    //4. generar el jsonwebtoken
    const token = await generateJWT(user.id);

    //5 enviar la respuesta al cliente
    res.status(200).json({
      status: 'success',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profileImgUrl: user.profileImgUrl,
        role: user.role,
      },
    });
  }
);

exports.updatedPassword = catchAsync(
  async (req, res, next) => {
    const { user } = req;
    const { currentPassword, newPassword } =
      req.body;

    if (
      !(await bcrypt.compare(
        currentPassword,
        user.password
      ))
    ) {
      return next(
        new AppError('Incorrect password', 401)
      );
    }

    const salt = await bcrypt.genSalt(12);
    const encryptedPassword = await bcrypt.hash(
      newPassword,
      salt
    );

    await user.update({
      password: encryptedPassword,
      passwordChangedAt: new Date(),
    });

    return res.status(200).json({
      status: 'success',
      message:
        'The user password was updated successfully!',
    });
  }
);

exports.renew = catchAsync(
  async (req, res, next) => {
    const { sessionUser } = req;
    //verificar si expiro?
    const token = await generateJWT(
      sessionUser.id
    );

    return res.status(200).json({
      status: 'success',
      token,
      user: {
        id: sessionUser.id,
        name: sessionUser.name,
        email: sessionUser.email,
        role: sessionUser.role,
      },
    });
  }
);
