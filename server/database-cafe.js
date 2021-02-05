class MenuItem{
    constructor(name, price, category, imageLocation){
        this.name = name;
        this.price = price;
        this.category = category;
        this.imageLocation = imageLocation;
    }
}

const orangeCranberryJuice = new MenuItem('Orange-Cranberry Juice', 8, 'cold beverage', 'images/orange-cranberry-juice.jpg');
const peachJuice = new MenuItem('Peach Juice', 7, 'cold beverage', 'images/peach-juice.jpg');
const orangeFizzy = new MenuItem('Orange Fizzy', 7, 'cold beverage', 'images/orange-fizzy.jpg');
const raspberryade = new MenuItem('Raspberryade', 7, 'cold beverage', 'images/raspberryade.jpg');
const hibiscusJuice = new MenuItem('Hibiscus Juice', 8, 'cold beverage', 'images/hibiscus-juice.jpg');

const coldBeverages = [orangeCranberryJuice, peachJuice, orangeFizzy, raspberryade, hibiscusJuice];

const strawberries = new MenuItem('Bowl of Strawberries', 5, 'fruit', 'images/strawberries.jpg');
const blueberries = new MenuItem('Bowl of Blueberries', 5, 'fruit', 'images/blueberries.jpg');
const blackberries = new MenuItem('Bowl of Blackberries', 5, 'fruit', 'images/blackberries.jpg');
const pomegranate = new MenuItem('Bowl of Pomegranates', 5, 'fruit', 'images/pomegranate.jpg');
const cherries = new MenuItem('Bowl of Cherries', 5, 'fruit', 'images/cherries.jpg');

const fruits = [blueberries, strawberries, cherries, blackberries, pomegranate];
const menuItems = [...coldBeverages, ...fruits];

exports.menuItems = menuItems;


