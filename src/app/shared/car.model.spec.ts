import { Car } from './car.model';

describe('CarClass', () => {
  it('should create an instance', () => {
    expect(new Car()).toBeTruthy();
  });
});
