import { TestBed } from '@angular/core/testing';

import { LoadRoomGuard } from './load-room.guard';

describe('LoadRoomGuard', () => {
  let guard: LoadRoomGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoadRoomGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
