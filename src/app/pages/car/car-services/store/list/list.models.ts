import {Service as DBService} from '@app/models/backend/vehicle';

export interface Service extends DBService {
  id: string;
  vehicleLabel?: string;
}

export interface ServiceCreateData {
  type?: string;
  service: Service;
  userId: string;
}

export type ServiceCreateRequest = DBService;
