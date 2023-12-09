import {body} from "express-validator"

export const registerValidation = [
    body('email', 'Incorrect Email ').isEmail(),
    body('password', 'Lenghth of the passwort should be more than 5 symbols').isLength({min: 5}),
    body('fullName', 'Please enter corect name').isLength({min: 3}),
    body('avatarUrl', 'Incorrect Url for picture').optional().isURL(),
];