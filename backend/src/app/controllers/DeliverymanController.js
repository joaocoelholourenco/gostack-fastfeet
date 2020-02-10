import * as Yup from 'yup';

import File from '../models/File';
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

  async index(req, res) {
    const { page = 1, per_page = 20 } = req.query;

    const deliverymans = await Deliveryman.findAll({
      order: ['name'],
      attributes: ['id', 'name', 'avatar_id', 'email'],
      limit: per_page,
      offset: (page - 1) * per_page,
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });
    return res.json(deliverymans);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      avatar_id: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliveryman = await Deliveryman.findOne({
      where: { id: req.params.id },
    });

    const { name, email, avatar_id } = await deliveryman.update(req.body);

    return res.json({ name, email, avatar_id });
  }

  async destroy(req, res) {
    await Deliveryman.destroy({
      where: { id: req.params.id },
    });
    return res.json();
  }
}
export default new DeliverymanController();
