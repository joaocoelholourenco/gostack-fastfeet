import * as Yup from 'yup';

import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      avatar_id: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const deliveryman = await Deliveryman.create(req.body);

    return res.json(deliveryman);
  }

  async update(req, res) {
    return res.json();
  }

  async index(req, res) {
    const deliverymans = await Deliveryman.findAll();
    return res.json(deliverymans);
  }

  async destroy(req, res) {
    return res.json();
  }
}
export default new DeliverymanController();
