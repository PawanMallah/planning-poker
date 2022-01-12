import { TestBed } from '@angular/core/testing';

import { ActiveRoomGuard } from './active-room.guard';

describe('ActiveRoomGuard', () => {
  let guard: ActiveRoomGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ActiveRoomGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
