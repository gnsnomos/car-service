import { Vehicle as DBVehicle } from '@app/models/backend/vehicle';

export interface Vehicle extends DBVehicle {
    id: string;
    brand: string;
    model: string;
    year: number;
}

export interface VehicleCreateData {
  type?: string;
  vehicle: Vehicle;
  userId: string;
}

export type VehicleCreateRequest = DBVehicle;
