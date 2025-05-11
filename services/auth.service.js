const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Progress = require('../models/Progress');

const register = async (group, password) => {
  const existingUser = await User.findOne({ group });
  if (existingUser) throw new Error('Grupo já registrado');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ group, password: hashedPassword });

  await Progress.create({ userId: user._id });

  return user;
};

const login = async (group, password) => {
    const user = await User.findOne({ group });
    if (!user) throw new Error('Grupo não encontrado');
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Senha incorreta');
  
    const token = jwt.sign({ id: user._id, group: user.group }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });
  
    // ✅ Cria progresso se não existir
    const existingProgress = await Progress.findOne({ userId: user._id });
    if (!existingProgress) {
      await Progress.create({ userId: user._id });
    }
  
    return { token };
  };
  

module.exports = { register, login };
