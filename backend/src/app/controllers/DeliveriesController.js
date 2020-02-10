import Order from '../models/Order';

class DeliveriesController {
  async index(req, res) {
    const deliveries = await Order.findAll({
      where: [
        { deliveryman_id: req.params.id },
        { start_date: null },
        { canceled_at: null },
      ],
    });

    return res.json(deliveries);
  }

  async update(req, res) {
    const delivery = await Order.findByPk(req.params.order_id);

    await delivery.update(req.body);

    return res.json(delivery);
  }
}
export default new DeliveriesController();
