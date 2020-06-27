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
}
export default new DeliveriesController();
