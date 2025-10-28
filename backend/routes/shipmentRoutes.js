const express = require('express');
const {
  createShipment,
  getShipments,
  getShipmentById,
  updateShipmentInfo,
  updateShipmentStatus,
  uploadShipmentDocuments,
  getTrackingData,
} = require('../controllers/shipmentController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(protect);

router.route('/')
  .post(authorize('vendor', 'freight_agency'), createShipment)
  .get(getShipments);

router.route('/:id')
  .get(getShipmentById)
  .patch(authorize('vendor', 'freight_agency'), updateShipmentInfo);

router.patch('/:id/status', authorize('freight_agency'), updateShipmentStatus);
router.post('/:id/documents', authorize('vendor', 'freight_agency'), uploadShipmentDocuments);
router.get('/:id/tracking', getTrackingData);

module.exports = router;
