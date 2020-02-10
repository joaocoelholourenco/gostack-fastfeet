import Order from '../models/Order';
import Recipient from '../models/Recipient';

class OrderDeliveriesController {
  async index(req, res) {
    const deliveriesDelivery = await Order.findAll({
      where: [{ deliveryman_id: req.params.id }, { canceled_at: null }],
      attributes: ['product', 'end_date', 'start_date'],
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

    const deliveries = await deliveriesDelivery.filter(delivery => {
      return delivery.end_date !== null;
    });

    return res.json(deliveries);
  }
}
export default new OrderDeliveriesController();
