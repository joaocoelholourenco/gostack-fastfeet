import * as Yup from 'yup';
import Recipient from '../models/Recipient';
import User from '../models/User';

class RecipientController {
  async index(req, res) {
    const recipients = await Recipient.findAll();

    return res.json(recipients);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      id_user: Yup.number().required(),
      street: Yup.string().required(),
      number: Yup.number(),
      complement: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fail' });
    }
    const userExist = await User.findOne({ where: { id: req.body.id_user } });
    if (!userExist) {
      return res.status(401).json({ error: 'User not exist' });
    }

    const recipient = await Recipient.create(req.body);
    return res.json(recipient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      id_user: Yup.number().required(),
      street: Yup.string().required(),
      number: Yup.number(),
      complement: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fail' });
    }
    const recipient = await Recipient.findOne({
      where: { id: req.body.id },
    });

    if (!recipient) {
      return res.status(401).json({ error: 'Recipient not exist' });
    }

    const recipientRes = await recipient.update(req.body);

    return res.json(recipientRes);
  }
}
export default new RecipientController();
