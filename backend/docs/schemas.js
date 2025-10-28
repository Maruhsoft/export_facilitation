/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the user.
 *           example: 60d0fe4f5311236168a109ca
 *         fullName:
 *           type: string
 *           description: The full name of the user.
 *           example: John Doe
 *         email:
 *           type: string
 *           description: The email of the user.
 *           example: johndoe@example.com
 *         role:
 *           type: string
 *           enum: [buyer, vendor, superadmin, freight_agency, payment_admin]
 *           description: The role of the user.
 *           example: buyer
 *         isVerified:
 *           type: boolean
 *           description: Whether the user's account has been verified.
 *           example: false
 *         company:
 *           type: string
 *           description: ID of the associated company profile.
 *         wallet:
 *           type: string
 *           description: ID of the user's wallet.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the user was created.
 * 
 *     UserInput:
 *       type: object
 *       properties:
 *         fullName:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum: [buyer, vendor, superadmin, freight_agency, payment_admin]
 * 
 *     AuthResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         token:
 *           type: string
 *           description: JWT token for authentication
 *         user:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             fullName:
 *               type: string
 *             email:
 *               type: string
 *             role:
 *               type: string
 * 
 *     Trade:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         buyer:
 *           $ref: '#/components/schemas/User'
 *         seller:
 *           $ref: '#/components/schemas/User'
 *         productName:
 *           type: string
 *         quantity:
 *           type: string
 *         targetPrice:
 *           type: number
 *         destination:
 *           type: string
 *         status:
 *           type: string
 *           enum: [request_pending, negotiating, agreement_reached, payment_pending, shipment_in_progress, completed, cancelled, disputed]
 *         createdAt:
 *           type: string
 *           format: date-time
 * 
 *     TradeInput:
 *       type: object
 *       properties:
 *         productName:
 *           type: string
 *           example: "Grade A Cocoa Beans"
 *         quantity:
 *           type: string
 *           example: "10 metric tons"
 *         targetPrice:
 *           type: number
 *           example: 2500
 *         destination:
 *           type: string
 *           example: "Port of Hamburg, Germany"
 *         additionalDetails:
 *           type: string
 *           example: "Needs organic certification."
 * 
 *     Dispute:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         tradeId:
 *           type: string
 *         raisedBy:
 *           $ref: '#/components/schemas/User'
 *         parties:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *         reason:
 *           type: string
 *         description:
 *           type: string
 *         status:
 *           type: string
 *           enum: [Open, 'Under Review', Resolved]
 *         resolution:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 * 
 *     DisputeInput:
 *       type: object
 *       properties:
 *         tradeId:
 *           type: string
 *           description: The ID of the trade being disputed.
 *         reason:
 *           type: string
 *           description: The reason for the dispute.
 *         description:
 *           type: string
 *           description: A detailed description of the issue.
 *         counterpartyId:
 *           type: string
 *           description: The user ID of the other party in the trade.
 */
