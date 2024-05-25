export interface Car {
    id: number;
    year: number;
    color: string;
    mileage: number;
    price: number;
    owners: number;
    horsepower: number;
    carModel: CarModel;
    fuelType: FuelType;
    engine: Engine
    transmission: Transmission;
    active: boolean;
}

export interface CarModel {
    id: number;
    name: string;
    makeId: number;
    makeName: string;
}

export interface FuelType {
    id: number;
    name: string;
}

export interface Engine {
    id: number;
    name: string;
}

export interface Transmission {
    id: number;
    name: string;
}