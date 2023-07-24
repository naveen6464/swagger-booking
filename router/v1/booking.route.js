/** ***************** package Import ******************************************************** */

const express = require("express");

const { bookingController } = require("../../controllers/index");


//const auth = require("../../middleware/auth")
const validate = require("../../middleware/validate")

const { bookValidation } = require("../../validations/index")
const router = express.Router();


router.route("/").post(validate(bookValidation.register),bookingController.createBooking)

router.route("/").get(bookingController.getIdAll)

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: booking the user details
 */

/**
 * @swagger
 * /booking:
 *    get:
 *      summary: Get all users
 *      description: Only admins can retrieve all users.
 *      tags: [Booking]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: sortBy
 *          schema:
 *            type: string
 *          description: sort by query in the form of field:desc/asc (ex. name:asc)
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *            minimum: 1
 *          default: 10
 *          description: Maximum number of users
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *            minimum: 1
 *            default: 1
 *          description: Page number
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  results:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Booking'
 *                  page:
 *                    type: integer
 *                    example: 1
 *                  limit:
 *                    type: integer
 *                    example: 10
 *                  totalPages:
 *                    type: integer
 *                    example: 1
 *                  totalResults:
 *                    type: integer
 *                    example: 1
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *   
 *    post: 
 *      summary: booking details
 *      tags: [Booking]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - userId
 *                - BookingDate              
 *              properties:
 *                userId:
 *                  type: string               
 *                BookingDate:
 *                  type: date
 *              example:
 *                userId: 3
 *                BookingDate: 12/12/2023
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                     Booking:
 *                      $ref: '#/components/schemas/Booking'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *   
 */