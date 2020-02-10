import { startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';

class DeliveriesController {
  async index(req, res) {
    const deliveries = await Delivery.findAll({
      where: [
        { deliveryman_id: req.params.id },
        { start_date: null },
        { canceled_at: null },
      ],
      attributes: ['product', 'canceled_at'],
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
      ],
    });

    return res.json(deliveries);
  }

  async update(req, res) {
    if (req.body.start_date) {
      const today = new Date();

      const deliveriesToday = await Delivery.findAll({
        where: {
          deliveryman_id: req.params.id,
          start_date: {
            [Op.between]: [startOfDay(today), endOfDay(today)],
          },
        },
      });

      if (deliveriesToday.length >= 5) {
        return res.status(400).json({
          error: 'you have reached the limit of the number of daily Deliverys.',
        });
      }
    }

    const delivery = await Delivery.findByPk(req.params.delivery_id);

    delivery.update(req.body);

    return res.json(delivery);
  }
}
export default new DeliveriesController();
