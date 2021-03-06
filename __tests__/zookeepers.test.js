const fs = require("fs");
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require('../lib/zookeepers.js');
const {zookeepers} = require('../data/zookeepers');

jest.mock('fs');

test('creates a zookeeper object', () => {
    const zookeeper = createNewZookeeper(
        {name: 'Kim', id: '0'},
        zookeepers
    );

    expect(zookeeper.name).toBe('Kim');
    expect(zookeeper.id).toBe('0');
});

test('filters by query', () => {
    const startingZookeepers = [
        {
            id: "1",
            name: "Raksha",
            age: 31,
            favoriteAnimal: "penguin"
          },
          {
            id: "2",
            name: "Isabella",
            age: 67,
            favoriteAnimal: "bear"
          },
    ];
    const updatedZookeepers = filterByQuery({age: '31'}, startingZookeepers);
    expect(updatedZookeepers.length).toEqual(1);
});

test('finds by id', () => {
    const startingZookeepers = [
        {
            id: "3",
            name: "Linda",
            age: 48,
            favoriteAnimal: "otter"
          },
          {
            id: "4",
            name: "Ryan",
            age: 20,
            favoriteAnimal: "dog"
          },
    ];

    const result = findById('3', startingZookeepers);
    expect(result.name).toBe('Linda');
});

test('validates favorite animal', () => {
    const zookeeper = {
        id: "5",
        name: "Alex",
        age: 32,
        favoriteAnimal: "Sloths"
    };

    const invalidZookeeper = {
        id: "5",
        name: "Alex",
        age: 32,
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});