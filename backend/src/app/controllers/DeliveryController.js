import * as Yup from 'yup';

import Mail from '../../lib/Mail';

import Delivery from '../models/Delivery';
import File from '../models/File';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';

class DeliveryController {
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

    const delivery = await Delivery.create(req.body);

    await Mail.sendMail({
      to: `${deliveryman.name}, <${deliveryman.email}>`,
      subject: 'Nova Encomenda disponivel',
      template: 'newDelivery',
      context: {
        provider: deliveryman.name,
        user: recipient.name,
        street: recipient.street,
        number: recipient.number,
        complement: recipient.complement,
        zipcode: recipient.zip_code,
      },
    });

    return res.json(delivery);
  }

  async index(req, res) {
    const deliverys = await Delivery.findAll({
      attributes: ['product', 'start_date', 'end_date', 'canceled_at'],
      include: [
        {
          model: Recipient,
          attributes: [
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'zip_code',
          ],
        },
        {
          model: Deliveryman,
          attributes: ['email', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });
    return res.json(deliverys);
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

    const delivery = await Delivery.findOne({
      where: { id: req.params.id },
    });
    await delivery.update(req.body);
    return res.json(delivery);
  }

  async destroy(req, res) {
    const order = await Delivery.findByPk(req.params.id);

    order.canceled_at = new Date();

    await order.save();

    return res.json(order);
  }
}
export default new DeliveryController();
