const authService = require('../services/auth.service');

const register = async (req, res) => {
  try {
    const { group, password } = req.body;
    const user = await authService.register(group, password);
    res.status(201).json({ message: 'Grupo registrado com sucesso', group: user.group });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { group, password } = req.body;
    const { token } = await authService.login(group, password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { register, login };
