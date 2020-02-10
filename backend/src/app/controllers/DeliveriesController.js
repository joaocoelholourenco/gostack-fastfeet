import Order from '../models/Order';

class DeliveriesController {
  async index(req, res) {
    const deliveries = await Order.findAll({
      where: [{ deliveryman_id: req.params.id }, { start_date: null }],
    });

    return res.json(deliveries);
  }

  async update(req, res) {
    const delivery = await Order.findByPk(req.params.order_id);

    return res.json(delivery);
  }
}
export default new DeliveriesController();
