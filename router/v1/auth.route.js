/** ***************** package Import ******************************************************** */

const express = require("express");

const { authController, userController } = require("../../controllers/index");


const auth = require("../../middleware/auth")
const validate = require("../../middleware/validate")

const { authValidation } = require("../../validations/index")
const router = express.Router();


router.route("/register").post(validate(authValidation.register), userController.createUsers)

router.route("/login").post(validate(authValidation.login), authController.login)

router.route("/profile").get(auth.auth, authController.profile)

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Register and login
 */

/**
 * @swagger
 * path:
 * /register:
 *    post:
 *      summary: Create a user
 *      description: Only admins can create other users.
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *                - password
 *                - firstName
 *                - lastName                
 *              properties:
 *                firstName:
 *                  type: string
 *                lastName:
 *                  type:string
 *                email:
 *                  type: string
 *                  format: email
 *                  description: must be unique
 *                password:
 *                  type: string
 *                  format: password
 *                  minLength: 8
 *                  description: At least one number and one letter
 *              example:
 *                firstName: naveen
 *                lastName: kumar
 *                email: naveen@example.com
 *                password: password1
 *
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  user:
 *                    $ref: '#/components/schemas/User'
 *        "400":
 *          $ref: '#/components/responses/DuplicateEmail'
 *   
 */
 
 

/**
 * @swagger
 * path:
 * /login:
 *    post:
 *      summary: Login
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *                - password
 *              properties:
 *                email:
 *                  type: string
 *                  format: email
 *                password:
 *                  type: string
 *                  format: password
 *              example:
 *                email: naveen@gmail.com
 *                password: App@123
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  user:
 *                    $ref: '#/components/schemas/User'
 *                  tokens:
 *                    $ref: '#/components/schemas/AuthTokens'
 *        "401":
 *          description: Invalid email or password
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *              example:
 *                code: 401
 *                message: Invalid email or password
 */




