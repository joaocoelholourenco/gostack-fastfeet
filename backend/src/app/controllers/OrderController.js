import * as Yup from 'yup';

import Mail from '../../lib/Mail';

import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';

class OrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliveryman = await Deliveryman.findOne({
      where: { id: req.body.deliveryman_id },
    });

    if (!deliveryman) {
      res.status(400).json({ error: 'Deliveryman not exist' });
    }

    const recipient = await Recipient.findOne({
      where: { id: req.body.recipient_id },
    });

    if (!recipient) {
      res.status(400).json({ error: 'Recipient not exist' });
    }

    const order = await Order.create(req.body);

    await Mail.sendMail({
      to: `${deliveryman.name}, <${deliveryman.email}>`,
      subject: 'Nova Encomenda disponivel',
      text: 'Nova ecomenda...',
    });

    return res.json(order);
  }

  async index(req, res) {
    const orders = await Order.findAll();
    return res.json(orders);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const deliveryman = await Deliveryman.findOne({
      where: { id: req.body.deliveryman_id },
    });

    if (!deliveryman) {
      res.status(400).json({ error: 'Deliveryman not exist' });
    }

    const recipient = await Recipient.findOne({
      where: { id: req.body.recipient_id },
    });

    if (!recipient) {
      res.status(400).json({ error: 'Recipient not exist' });
    }

    const order = await Order.findOne({
      where: { id: req.params.id },
    });
    await order.update(req.body);
    return res.json(order);
  }

  async destroy(req, res) {
    const order = await Order.destroy({ where: { id: req.params.id } });
    return res.json(order);
  }
}
export default new OrderController();
