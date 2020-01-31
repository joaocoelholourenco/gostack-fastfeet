import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email } = req.body;

    const userExist = await User.findOne({ where: { email } });

    if (userExist) {
      return res.status(400).send('User already exist');
    }
    const user = await User.create(req.body);

    return res.json({ user });
  }

  async update(req, res) {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    const { id, name, provider } = await user.update(req.body);

    return res.json({ id, name, provider });
  }
}

export default new UserController();
