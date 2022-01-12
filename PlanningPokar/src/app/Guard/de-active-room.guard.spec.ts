import { TestBed } from '@angular/core/testing';

import { DeActiveRoomGuard } from './de-active-room.guard';

describe('DeActiveRoomGuard', () => {
  let guard: DeActiveRoomGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DeActiveRoomGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
