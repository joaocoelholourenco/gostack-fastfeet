import * as Yup from 'yup';

import Delivery from '../models/Delivery';
import DeliveryProblem from '../models/DeliveryProblem';

class DeliveryProblemController {
  async store(req, res) {
    const schema = Yup.object().shape({
      delivery_id: Yup.number().required(),
      description: Yup.string().required(),
    });

    if (!schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation is fails' });
    }

    const deliveryProblem = await DeliveryProblem.create(req.body);

    return res.json(deliveryProblem);
  }

  async index(req, res) {
    const deliveryProblems = await DeliveryProblem.findAll();

    return res.json(deliveryProblems);
  }

  async show(req, res) {
    const delivery = await DeliveryProblem.findAll({
      where: { delivery_id: req.params.id },
    });

    return res.json(delivery);
  }

  async update(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);

    delivery.canceled_at = new Date();

    await delivery.save();

    return res.json(delivery);
  }
}
export default new DeliveryProblemController();
