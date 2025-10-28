const express = require('express');
const {
  createOffer,
  getOffers,
  getOfferById,
  updateOffer,
  deleteOffer,
  initiateNegotiation,
  updateNegotiation,
  acceptOffer,
  rejectOffer,
} = require('../controllers/offerController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(protect);

router.route('/')
    .post(authorize('vendor'), createOffer)
    .get(getOffers);

router.route('/:id')
    .get(getOfferById)
    .patch(authorize('vendor'), updateOffer)
    .delete(authorize('vendor'), deleteOffer);

router.post('/:id/negotiate', authorize('buyer'), initiateNegotiation);
router.patch('/:id/negotiate/:negotiationId', authorize('buyer', 'vendor'), updateNegotiation);
router.post('/:id/accept', authorize('buyer'), acceptOffer);
router.post('/:id/reject', authorize('buyer', 'vendor'), rejectOffer);


module.exports = router;
