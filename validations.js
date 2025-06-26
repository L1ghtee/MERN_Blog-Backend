import {body} from "express-validator"

export const loginValidation = [
    body('email', 'Incorrect Email ').isEmail(),
    body('password', 'Lenghth of the passwort should be more than 5 symbols').isLength({min: 5}),
   
];
export const registerValidation = [
    body('email', 'Incorrect Email ').isEmail(),
    body('password', 'Lenghth of the passwort should be more than 5 symbols').isLength({min: 5}),
    body('fullName', 'Please enter corect name').isLength({min: 3}),
    body('avatarUrl', 'Incorrect Url for picture').optional().isURL(),
];
export const postCreateValidation = [
    body('title', 'Please enter the title of the post ').isLength({min: 3}).isString(),
    body('text', 'Please enter the text of the post').isLength({min: 10}).isString(),
    body('tags', 'Incorrect format of tags').optional().isArray(),
    body('imageUrl', 'Incorrect Url for picture').optional().isString(),
];