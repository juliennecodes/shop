import {rest} from 'msw';

const menuItems = [
    {
        name: 'Juice',
        price: 5
    },
    {
        name: "Tea",
        price: 2
    }
];

export const handlers = [
    rest.get('/menu', (req, res, ctx)=>{
        return res(
            ctx.status(200),
            ctx.json(menuItems)
        )
    })
]
