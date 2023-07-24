/** ***************** package Import ******************************************************** */

const express = require("express");



/** ***************** auth from middleware Import ******************************************************** */
const auth=require("../../middleware/auth")


/** ***************** userController from controller Import ******************************************************** */
const userController= require("../../controllers/user.controller");

const validate = require("../../middleware/validate")

const { authValidation } = require("../../validations/index")


const router = express.Router();

router.route("/").get(auth.auth,userController.getUsers)
  
router.route("/:userId").get(validate(authValidation.getUser),userController.getUserById)
                        .put(validate(authValidation.updateUser),userController.updateUser)
                        .delete(validate(authValidation.deleteUser),userController.deleteUser)

  module.exports = router;


/**
 * @swagger
 * /users:
 *    get:
 *      summary: Get all users
 *      description: Only admins can retrieve all users.
 *      tags: [Users]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: Name
 *          schema:
 *            type: string
 *          description: Full Name
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
 *                      $ref: '#/components/schemas/User'
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
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a single user by ID
 *     tags: [User]
 *     description: Retrieves a single user by their ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *               
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 * 
 *   put:
 *     summary: Update a user
 *     tags: [User]
 *     description: Updates a user with the specified ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 * 
 *   delete:
 *     summary: Delete a user
 *     tags: [User]
 *     description: Deletes a user with the specified ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: No Content
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 * 
 */





/**
 * @swagger
 * /profile:
 *     get:
 *       summary: User profile
 *       tags: [Profile]
 *       description: User profile details showing
 *       security:
 *         - bearerAuth: []
 *       responses:
 *        200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *        401:
 *         $ref: '#/components/responses/Unauthorized'
 *        403:
 *         $ref: '#/components/responses/Forbidden'
 *        404:
 *         $ref: '#/components/responses/NotFound'
 *    
 */
