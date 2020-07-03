import {
  startOfDay,
  endOfDay,
  isAfter,
  isBefore,
  parseISO,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
} from 'date-fns';
import { Op } from 'sequelize';

import Delivery from '../models/Delivery';

class CheckInDelivery {
  async update(req, res) {
    const today = new Date();
    const { id, delivery_id } = req.params;

    const start = setMilliseconds(
      setSeconds(setMinutes(setHours(today, 18), 0), 0),
      0
    );
    const end = setMilliseconds(
      setSeconds(setMinutes(setHours(today, 8), 0), 0),
      0
    );
    const { start_date } = req.body;

    const delivery = await Delivery.findByPk(delivery_id);
    if (id != delivery.deliveryman_id) {
      return res.status(400).json({
        error: 'This delivery is not your',
      });
    }

    if (
      !(
        isAfter(parseISO(start_date), end) &&
        isBefore(parseISO(start_date), start)
      )
    ) {
      return res.status(400).json({
        error: 'Not available',
      });
    }

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

    delivery.update(req.body);
    return res.json(delivery);
  }
}

export default new CheckInDelivery();
