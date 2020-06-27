import { startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import Delivery from '../models/Delivery';

class CheckInDelivery {
  async update(req, res) {
    const today = new Date();
    const { id } = req.params;

    const deliveriesToday = await Delivery.findAll({
      where: {
        deliveryman_id: id,
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

    const { delivery_id } = req.params;
    const delivery = await Delivery.findByPk(delivery_id);

    if (delivery_id !== delivery.deliveryman_id) {
      return res.status(400).json({
        error: 'This delivery is not your',
      });
    }
    if (delivery.start_date) {
      return res.status(400).json({
        error: 'This delivery has started',
      });
    }

    delivery.update(req.body);
    return res.json(delivery);
  }
}

export default new CheckInDelivery();
