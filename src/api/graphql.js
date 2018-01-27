import gql from 'graphql-tag';

export const getPizzaSizes = gql`
    query pizzaSizes {
        pizzaSizes {
            name
            maxToppings
            basePrice
        }
    }
`;

export const getPizzaByName = gql`
    query pizzaSizeByName($name: PizzaSizes) {
        pizzaSizeByName(name: $name) {
            name
            maxToppings
            basePrice
        }
    }
`;