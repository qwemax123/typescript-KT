import { Request, Response } from 'express'
import { users } from '../data/storage'
import { CheckRequest, ColorsRequest, CreateRequest, PetRequest, SignRequest } from '../types/requests';

export const sign = (
    req: Request<{}, {}, SignRequest>,
    res: Response
): void => {
    const { name } = req.body

    if (!name) {
        res.status(400).json({
            error: "имя обязательно",
        });
        return;
    }

    const exists = users.some(
        (user) => user.firstName === name
    );

    if (exists) {
        res.status(400).json({
            error: "имя уже существует",
        });
        return;
    }

    users.push({
        firstName: name,
        pets: [],
        colors: [],
    });

    res.status(200).json({
        message: "пользователь добавлен",
        index: users.length - 1,
    });
};

export const check = (
    req: Request<{}, {}, CheckRequest>, 
    res: Response
): void => {
    const { name } = req.body

    if (!name) {
        res.status(400).json({
            error: "Имя обязательно",
        });
        return;
    }

    const index = users.findIndex(
        (user) => user.firstName === name
    );

    if (index === -1) {
        res.status(404).json({
            error: "пользователь не найден",
        });
        return;
    }

    res.status(200).json({
        message: "паользователь найден",
        index,
    });
};

export const create = (
    req: Request<{}, {}, CreateRequest>, 
    res: Response
): void => {
    const { firstName, lastName } = req.body

    if (!firstName || !lastName) {
        res.status(400).json({
            error: "имя и фамилия обязательны!",
        });
        return;
    }

    const user = users.find(
        (item) => item.firstName === firstName
    );

    if (user) {
        user.lastName = lastName;

        res.status(200).json({
            message: "фамилия добавлена",
            user,
        });

        return;
    }

    const newUser = {
        firstName,
        lastName,
        pets: [],
        colors: [],
    };

    users.push(newUser);

    res.status(201).json({
        message: "создан новый пользователь",
        user: newUser,
        index: users.length - 1,
    });
};

export const pet = (
    req: Request<{}, {}, PetRequest>,  
    res: Response
): void => {
    const { index, pet } = req.body

    const user = users[index];

    if (!user) {
        res.status(404).json({
            error: "ппользователь не найден",
        });
        return;
    }

    user.pets.push(pet);

    res.status(200).json({
        message: "аитомец добавлен",
        user,
    });
};

export const colors = (
    req: Request<{}, {}, ColorsRequest>, 
    res: Response
): void => {
    const { index, colors } = req.body

    const user = users[index];

    if (!user) {
        res.status(404).json({
            error: "пользователь не найден",
        });
        return;
    }

    if (!Array.isArray(colors)) {
        res.status(400).json({
            error: "цвета должны приходить массивом",
        });
        return;
    }

    user.colors.push(...colors);

    res.status(200).json({
        message: "цвета добавлены",
        user,
    });
};