import Order from '../models/Order';

class OrderDeliveriesController {
  async index(req, res) {
    const deliveriesDelivery = await Order.findAll({
      where: [{ deliveryman_id: req.params.id }],
    });

    const deliveries = await deliveriesDelivery.filter(delivery => {
      return delivery.end_date !== null;
    });

    return res.json(deliveries);
  }
}
export default new OrderDeliveriesController();
