import { Tank } from '@neptun/data-model';

export function TankStateDescription(properties: { tank: Tank }) {
  const tank = properties.tank;
  return <div className="flex flex-col">
    <div className="text-sm">Capacity: {tank.maxCapacity} m³</div>
    <div className="text-sm">Filled: {tank.filledCapacity} m³</div>
    { tank.isRefilled && <div className="badge badge-info mt-2">Filling in progress</div> }
  </div>
}
